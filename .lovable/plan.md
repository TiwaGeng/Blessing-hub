
# Blessing School — Management & Advertisement Website

A full school platform combining a public marketing site with role-based portals (Admin, Teacher, Staff, Employee, Finance, Stock, Library, Parent, Student) and a unified Admin Dashboard. Built in TypeScript + React with Lovable Cloud for auth, database, storage, and serverless logic.

## 1. Design System

Light + Dark mode, semantic tokens in `index.css` and `tailwind.config.ts`.

Light theme
- Primary (Navy): `#0F172A`
- Accent (Gold): `#D4A017`
- Background: `#FFFFFF`
- Card / Muted Surface: `#F8FAFC`
- Sidebar (dashboard): `#111827`
- Active menu: `#2563EB`
- Success `#22C55E`, Warning `#F59E0B`, Error `#EF4444`

Dark theme
- Background: `#0B1220`
- Surface: `#111827`
- Primary: Gold `#D4A017` on Navy
- Text: `#F8FAFC`

Typography: Inter (body), Plus Jakarta Sans (headings). Rounded-xl cards, soft shadows, gold CTA buttons.

## 2. Folder Structure

```text
src/
  assets/                 (logo, hero, gallery images)
  components/
    ui/                   (shadcn)
    layout/               (PublicNav, PublicFooter, DashboardShell, Sidebar, Topbar, ThemeToggle)
    shared/               (DataTable, StatCard, PageHeader, EmptyState, ConfirmDialog)
  features/
    public/               (Home, About, Admissions, News, Events, Gallery, FAQ, Contact)
    auth/                 (Login, ParentLookup, ProtectedRoute, useAuth)
    admin/                (Overview, Users, Roles, Settings, Backup)
    students/
    teachers/
    academics/            (subjects, classes, timetable, exams, calendar, assignments)
    attendance/
    finance/              (fees, payments, expenses, receipts, payroll, reports)
    stock/                (items, suppliers, purchases, alerts)
    library/              (books, borrow, returns, fines)
    hr/                   (employees, leave, payroll)
    communication/        (announcements, notifications)
    marks/                (entry, approval workflow, report cards)
    reports/              (generators + exports)
    parent/               (child overview, results, attendance, fees)
    student/              (profile, marks, timetable, assignments)
  hooks/
  lib/                    (supabase client, utils, formatters, rbac)
  pages/                  (route entries that compose features)
  routes.tsx
  App.tsx
  index.css
```

Each module folder is self-contained: `components/`, `hooks/`, `api.ts`, `types.ts`, `pages/`.

## 3. Public Website (Visitors)

Routes: `/`, `/about`, `/history`, `/mission`, `/departments`, `/programs`, `/admissions`, `/news`, `/events`, `/gallery`, `/achievements`, `/testimonials`, `/faq`, `/contact`, `/portal/parent`, `/portal/student`, `/portal/staff`.

- Public nav with logo, primary links, gold "Apply Now" CTA, theme toggle.
- Hero with school photo, mission strip, programs grid, news/events, testimonials, CTA, footer with contact + map.
- Fully responsive (mobile drawer nav).
- SEO: per-page title/description, JSON-LD for EducationalOrganization.

## 4. Authentication & Roles

Lovable Cloud (Supabase) email + password auth.

Tables
- `profiles` (id → auth.users, full_name, phone, avatar_url)
- `app_role` enum: `admin, teacher, staff, employee, finance, stock, library, parent, student`
- `user_roles` (user_id, role) — separate table, RLS-safe
- `has_role(_user_id, _role)` SECURITY DEFINER function
- All domain tables protected by RLS using `has_role`

Default seeded accounts (created via migration)
- Admin: `admin@blessingschool.com` / `Admin@12345`
- Teacher demo: `teacher@blessingschool.com` / `Teacher@12345`
- Parent lookup: by Student Name + Student ID + Class (no password) — read-only portal session

`ProtectedRoute` wraps dashboard routes and checks role(s).

## 5. Admin Dashboard Shell

- Collapsible dark sidebar (`#111827`), active item in blue, gold highlights.
- Topbar: search, notifications, theme toggle, user menu.
- Overview cards: total students, teachers, employees, fees collected, unpaid balances, books available, stock items, recent activities.
- Charts: enrollment trend, fee collection, attendance %.

## 6. Modules (each as a feature folder)

1. Students — CRUD, class assignment, ID generator, promotion, discipline, achievements, transfers.
2. Teachers — CRUD, subject/class assignment, schedules, attendance, performance.
3. Academics — subjects, departments, classes, timetable, exam scheduling, grades, calendar, assignments.
4. Attendance — students, teachers, employees; daily stats + reports.
5. Finance — fees per term (e.g., 56,000 RWF), payments, receipts, expenses, scholarships, discounts, penalties, salaries, reports by class/department/student.
6. Stock — items, suppliers, purchases, low-stock alerts, damaged tracking.
7. Library — books, search, borrow/return, reservations, late fines.
8. HR — employee records, leave, payroll, salary reports.
9. Communication — announcements, email/SMS hooks (edge function placeholders), reminders.
10. Marks Workflow — teacher entry → submit → admin/head approve → published to parents/students → auto report cards.
11. Reports — student, class, subject, teacher, attendance, finance, stock, library, department, school summary. PDF/CSV export.
12. Parent Portal — lookup child by name + ID + class; view performance, results, attendance, fees, announcements; download report card.
13. Student Portal — profile, attendance, marks, timetable, assignments, announcements.

## 7. Build Phases

Phase 1 — Foundation
- Theme tokens, dark mode toggle, layouts, routing, folder scaffold.
- Enable Lovable Cloud, auth, profiles + user_roles + has_role.
- Seed admin + teacher accounts.

Phase 2 — Public Website
- All marketing pages with real content placeholders and generated hero/gallery images.

Phase 3 — Admin Shell + Students + Teachers + Academics
- Dashboard overview, CRUD modules with RLS.

Phase 4 — Attendance + Marks Workflow + Reports + Report Cards.

Phase 5 — Finance + Stock + Library + HR.

Phase 6 — Parent + Student portals + Communication + polish.

## 8. Technical Notes

- TypeScript strict, React Router, TanStack Query, shadcn/ui, lucide-react, Recharts, react-hook-form + zod.
- All colors via CSS variables — never hardcoded in components.
- Responsive: mobile-first, sidebar becomes drawer < md.
- File storage bucket `school-assets` for images, report cards, receipts.
- Edge functions reserved for: SMS/email send, PDF report card generation, backup export.

## 9. Deliverables for First Iteration

Because this is a very large scope, the first implementation pass will deliver Phase 1 + Phase 2 (foundation, theme, auth with seeded admin/teacher, full public website, admin shell with empty module pages). Subsequent iterations build each module group. This keeps each step reviewable instead of one giant unverifiable build.

Confirm and I'll start with Phase 1 + 2.
