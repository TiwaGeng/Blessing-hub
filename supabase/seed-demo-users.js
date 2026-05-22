import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

function loadEnvFile() {
  const env = {};
  try {
    const file = fs.readFileSync(new URL('../.env', import.meta.url), 'utf-8');
    for (const line of file.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const [key, ...vals] = trimmed.split('=');
      env[key.trim()] = vals.join('=').trim().replace(/^"|"$/g, '');
    }
  } catch {
    // ignore missing .env file
  }
  return env;
}

const env = loadEnvFile();
const SUPABASE_URL = process.env.SUPABASE_URL || env.SUPABASE_URL || env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY || env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Add them to `.env` before running this script.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

const accounts = [
  { email: 'admin@blessingschool.com', password: 'Admin@12345', full_name: 'School Admin', role: 'admin' },
  { email: 'teacher@blessingschool.com', password: 'Teacher@12345', full_name: 'Demo Teacher', role: 'teacher' },
  { email: 'finance@blessingschool.com', password: 'Finance@12345', full_name: 'Finance Manager', role: 'finance' },
  { email: 'library@blessingschool.com', password: 'Library@12345', full_name: 'Library Manager', role: 'library' },
  { email: 'stock@blessingschool.com', password: 'Stock@12345', full_name: 'Stock Manager', role: 'stock' },
];

async function ensureUser(email, password, full_name) {
  console.log(`Checking user ${email}...`);
  let userId = null;

  const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers({ email });
  if (listError) {
    console.error('Failed to list users:', listError.message);
    process.exit(1);
  }

  if (existingUsers?.users?.length > 0) {
    userId = existingUsers.users[0].id;
    console.log(`  user exists: ${email} (${userId})`);
  } else {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name },
    });
    if (error) {
      console.error(`Failed to create user ${email}:`, error.message);
      process.exit(1);
    }
    userId = data.user.id;
    console.log(`  created user: ${email} (${userId})`);
  }

  return userId;
}

async function ensureRole(userId, role) {
  const { error } = await supabase.from('user_roles').upsert(
    { user_id: userId, role, created_at: new Date().toISOString() },
    { onConflict: 'user_id', returning: 'minimal' },
  );
  if (error) {
    console.error(`Failed to upsert role for ${userId}:`, error.message);
    process.exit(1);
  }
}

async function ensureProfile(userId, full_name) {
  const { error } = await supabase.from('profiles').upsert(
    { id: userId, full_name, updated_at: new Date().toISOString(), created_at: new Date().toISOString() },
    { onConflict: 'id', returning: 'minimal' },
  );
  if (error) {
    console.error(`Failed to upsert profile for ${userId}:`, error.message);
    process.exit(1);
  }
}

(async () => {
  console.log('Seeding Supabase demo users...');
  for (const account of accounts) {
    const userId = await ensureUser(account.email, account.password, account.full_name);
    await ensureRole(userId, account.role);
    await ensureProfile(userId, account.full_name);
  }
  console.log('Done. Now restart your dev server and try logging in again.');
})();
