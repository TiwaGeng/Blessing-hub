# Supabase Integration

This project connects to Supabase using client-side environment variables and server-side service role settings.

## Existing setup

- `src/integrations/supabase/client.ts` uses:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_KEY`

- `src/integrations/supabase/client.server.ts` uses:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`

## Fixing invalid login credentials

If login returns "invalid login credentials", it usually means the auth user does not exist in Supabase yet.

### Step 1: Add your service role key

Add this to your local `.env` file:

```env
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### Step 2: Create demo users and roles

Run the seed helper:

```bash
npm run supabase:seed-demo-users
```

This script will:
- create admin, teacher, finance, library, and stock users if they are missing
- assign the proper role in `user_roles`
- create simple profile rows in `profiles`

### Default login accounts

- Admin: `admin@blessingschool.com` / `Admin@12345`
- Teacher: `teacher@blessingschool.com` / `Teacher@12345`
- Finance: `finance@blessingschool.com` / `Finance@12345`
- Library: `library@blessingschool.com` / `Library@12345`
- Stock: `stock@blessingschool.com` / `Stock@12345`

### Notes

- If the seed script fails because the `user_roles` or `profiles` table is missing, run the SQL from `ADD_DEMO_USERS.sql` first.
- Restart the dev server after updating `.env`.
