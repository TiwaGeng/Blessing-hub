import { getSessionKey } from "@/lib/academic-session";

export type RowData = Record<string, string | number>;
export type StatusTone = "default" | "success" | "warning" | "destructive";

export const ADMIN_SNAPSHOT = {
  "2024-2025:term-1": {
    students: "1,118",
    teachers: "79",
    attendance: "92%",
    feesCollected: "71%",
    payrollDue: "Dec 18",
    pendingNotices: "7",
  },
  "2024-2025:term-2": {
    students: "1,142",
    teachers: "81",
    attendance: "93%",
    feesCollected: "76%",
    payrollDue: "Mar 29",
    pendingNotices: "5",
  },
  "2024-2025:term-3": {
    students: "1,165",
    teachers: "82",
    attendance: "94%",
    feesCollected: "82%",
    payrollDue: "Jul 26",
    pendingNotices: "4",
  },
  "2025-2026:term-1": {
    students: "1,224",
    teachers: "84",
    attendance: "93%",
    feesCollected: "74%",
    payrollDue: "Dec 19",
    pendingNotices: "6",
  },
  "2025-2026:term-2": {
    students: "1,267",
    teachers: "85",
    attendance: "94%",
    feesCollected: "79%",
    payrollDue: "Mar 30",
    pendingNotices: "5",
  },
  "2025-2026:term-3": {
    students: "1,284",
    teachers: "86",
    attendance: "95%",
    feesCollected: "83%",
    payrollDue: "May 30",
    pendingNotices: "3",
  },
  "2026-2027:term-1": {
    students: "1,310",
    teachers: "88",
    attendance: "96%",
    feesCollected: "11%",
    payrollDue: "Sep 28",
    pendingNotices: "9",
  },
  "2026-2027:term-2": {
    students: "1,328",
    teachers: "89",
    attendance: "0%",
    feesCollected: "0%",
    payrollDue: "Jan 29",
    pendingNotices: "0",
  },
  "2026-2027:term-3": {
    students: "1,339",
    teachers: "90",
    attendance: "0%",
    feesCollected: "0%",
    payrollDue: "Apr 30",
    pendingNotices: "0",
  },
} as const;

export const TERM_ACTIVITY = {
  "2025-2026:term-3": [
    { title: "Mr. Habimana approved S3 Mathematics marks", when: "12 min ago" },
    {
      title: "Finance posted fee reminder letters for P4 and P5",
      when: "1 hour ago",
    },
    { title: "Library issued 14 exam revision books", when: "3 hours ago" },
    { title: "Store received 60 science practical kits", when: "Yesterday" },
  ],
  default: [
    { title: "Term archive remains available for review", when: "Saved" },
    { title: "Historical reports can still be exported", when: "Saved" },
    {
      title: "Attendance and marks stay linked to the selected term",
      when: "Always",
    },
  ],
};

export const TEACHER_COURSES = [
  {
    course: "Mathematics",
    className: "S3 A",
    students: 42,
    workload: "4 lessons / week",
  },
  {
    course: "Mathematics",
    className: "S3 B",
    students: 40,
    workload: "4 lessons / week",
  },
  {
    course: "Algebra",
    className: "S4 PCM",
    students: 31,
    workload: "3 lessons / week",
  },
  {
    course: "Statistics",
    className: "S5 MCB",
    students: 28,
    workload: "2 lessons / week",
  },
];

export const TEACHER_ATTENDANCE = [
  { week: "Week 1", rate: "97%", missing: "1 lesson" },
  { week: "Week 2", rate: "94%", missing: "2 lessons" },
  { week: "Week 3", rate: "96%", missing: "1 lesson" },
  { week: "Week 4", rate: "98%", missing: "0 lessons" },
];

export const TEACHER_TASKS = [
  {
    task: "Upload continuous assessment marks",
    due: "Friday",
    status: "In progress",
  },
  {
    task: "Prepare end-of-unit assignment",
    due: "Monday",
    status: "Ready for review",
  },
  {
    task: "Submit exam paper for approval",
    due: "May 29",
    status: "Pending approval",
  },
  { task: "Complete report comments", due: "May 31", status: "Not started" },
];

export const TEACHER_TIMETABLE = [
  {
    day: "Monday",
    time: "08:00 - 09:20",
    subject: "S3 A Mathematics",
    room: "Block A - 04",
  },
  {
    day: "Monday",
    time: "10:00 - 11:20",
    subject: "S4 PCM Algebra",
    room: "Block B - 02",
  },
  {
    day: "Tuesday",
    time: "09:30 - 10:50",
    subject: "S3 B Mathematics",
    room: "Block A - 05",
  },
  {
    day: "Wednesday",
    time: "11:30 - 12:50",
    subject: "S5 MCB Statistics",
    room: "Lab 2",
  },
  {
    day: "Thursday",
    time: "08:00 - 09:20",
    subject: "S3 A Mathematics",
    room: "Block A - 04",
  },
];

export const CLASS_MARK_REPORTS: RowData[] = [
  {
    class: "S3 A",
    course: "Mathematics",
    average: "71%",
    approved: "Yes",
    updated: "May 20",
  },
  {
    class: "S3 B",
    course: "Mathematics",
    average: "69%",
    approved: "Yes",
    updated: "May 20",
  },
  {
    class: "S4 PCM",
    course: "Algebra",
    average: "75%",
    approved: "Awaiting HoD",
    updated: "May 21",
  },
  {
    class: "S5 MCB",
    course: "Statistics",
    average: "78%",
    approved: "Draft",
    updated: "May 22",
  },
];

export const LIBRARY_BOOKS: RowData[] = [
  {
    title: "Advanced Biology",
    author: "R. Mukasa",
    copies: 24,
    shelf: "B-14",
    status: "Available",
  },
  {
    title: "Mathematics Today",
    author: "L. Uwimana",
    copies: 11,
    shelf: "M-08",
    status: "Low stock",
  },
  {
    title: "African Literature",
    author: "D. Karekezi",
    copies: 19,
    shelf: "L-03",
    status: "Available",
  },
  {
    title: "Past Exam Papers Vol. 2",
    author: "Exam Board",
    copies: 7,
    shelf: "R-01",
    status: "High demand",
  },
];

export const LIBRARY_BORROWED: RowData[] = [
  {
    borrower: "Eric Habimana",
    class: "S2 B",
    book: "Mathematics Today",
    borrowed: "May 18",
    due: "May 25",
  },
  {
    borrower: "Sarah Ingabire",
    class: "S1 A",
    book: "African Literature",
    borrowed: "May 19",
    due: "May 26",
  },
  {
    borrower: "P. Mukankusi",
    class: "Teacher",
    book: "Past Exam Papers Vol. 2",
    borrowed: "May 20",
    due: "May 27",
  },
];

export const LIBRARY_RETURNS: RowData[] = [
  {
    borrower: "Mary Uwase",
    book: "Advanced Biology",
    returned: "May 21",
    fine: "$0",
  },
  {
    borrower: "Kevin Tuyishime",
    book: "English Grammar",
    returned: "May 21",
    fine: "$2",
  },
  {
    borrower: "Aline Mukamana",
    book: "Physics Revision",
    returned: "May 22",
    fine: "$0",
  },
];

export const STOCK_PRODUCTS: RowData[] = [
  {
    product: "A4 Paper Reams",
    category: "Office",
    balance: 120,
    reorderLevel: 40,
    status: "Healthy",
  },
  {
    product: "Science Gloves",
    category: "Lab",
    balance: 18,
    reorderLevel: 30,
    status: "Reorder",
  },
  {
    product: "Whiteboard Markers",
    category: "Teaching",
    balance: 44,
    reorderLevel: 25,
    status: "Healthy",
  },
  {
    product: "Sports Bibs",
    category: "Sports",
    balance: 12,
    reorderLevel: 15,
    status: "Low stock",
  },
];

export const STOCK_IN: RowData[] = [
  {
    date: "May 20",
    product: "Science Gloves",
    quantity: 50,
    supplier: "LabCare Ltd",
    receivedBy: "Store keeper",
  },
  {
    date: "May 21",
    product: "A4 Paper Reams",
    quantity: 80,
    supplier: "Office Point",
    receivedBy: "Admin",
  },
];

export const STOCK_OUT: RowData[] = [
  {
    date: "May 21",
    product: "Whiteboard Markers",
    quantity: 14,
    department: "Academics",
    issuedBy: "Store keeper",
  },
  {
    date: "May 22",
    product: "Sports Bibs",
    quantity: 10,
    department: "Sports",
    issuedBy: "Store keeper",
  },
];

export const STOCK_NOTIFICATIONS: {
  title: string;
  detail: string;
  tone: StatusTone;
}[] = [
  {
    title: "Science Gloves below reorder level",
    detail: "18 left against reorder level 30",
    tone: "destructive",
  },
  {
    title: "Sports Bibs almost depleted",
    detail: "12 left for inter-house practice week",
    tone: "warning",
  },
  {
    title: "Paper stock healthy after recent delivery",
    detail: "120 reams available across campus",
    tone: "success",
  },
];

export const FEE_STRUCTURE: RowData[] = [
  {
    class: "P1 - P3",
    tuition: "$220",
    transport: "$40",
    meals: "$35",
    boarding: "$0",
  },
  {
    class: "P4 - P6",
    tuition: "$250",
    transport: "$40",
    meals: "$35",
    boarding: "$0",
  },
  {
    class: "S1 - S3",
    tuition: "$320",
    transport: "$45",
    meals: "$40",
    boarding: "$90",
  },
  {
    class: "S4 - S6",
    tuition: "$365",
    transport: "$45",
    meals: "$40",
    boarding: "$110",
  },
];

export const EXPENSES: RowData[] = [
  {
    category: "Salaries",
    amount: "$18,400",
    posted: "May 20",
    status: "Scheduled",
  },
  { category: "Utilities", amount: "$2,130", posted: "May 18", status: "Paid" },
  {
    category: "Laboratory supplies",
    amount: "$1,240",
    posted: "May 17",
    status: "Paid",
  },
];

export const INCOME: RowData[] = [
  {
    source: "School fees",
    amount: "$26,500",
    posted: "May 22",
    status: "Received",
  },
  {
    source: "Book sales",
    amount: "$1,120",
    posted: "May 21",
    status: "Received",
  },
  {
    source: "Transport fees",
    amount: "$3,480",
    posted: "May 20",
    status: "Received",
  },
];

export const FINANCE_REPORTS: RowData[] = [
  {
    student: "Mary Uwase",
    class: "S3 A",
    status: "Paid",
    paid: "$320",
    balance: "$0",
  },
  {
    student: "Eric Habimana",
    class: "S2 B",
    status: "Partial",
    paid: "$180",
    balance: "$140",
  },
  {
    student: "Aline Mukamana",
    class: "S5 MCB",
    status: "Paid",
    paid: "$365",
    balance: "$0",
  },
  {
    student: "Jean-Paul Niyonsenga",
    class: "P5",
    status: "Unpaid",
    paid: "$0",
    balance: "$250",
  },
  {
    student: "Kevin Tuyishime",
    class: "P3",
    status: "Partial",
    paid: "$120",
    balance: "$100",
  },
];

export const MARK_APPROVALS: RowData[] = [
  {
    class: "S3 A",
    assessment: "CAT 2",
    subject: "Mathematics",
    submittedBy: "Mr. Habimana",
    status: "Approved",
  },
  {
    class: "S4 PCM",
    assessment: "Mid-term",
    subject: "Algebra",
    submittedBy: "Mr. Habimana",
    status: "Pending HoD",
  },
  {
    class: "S5 MCB",
    assessment: "Assignment 4",
    subject: "Statistics",
    submittedBy: "Mr. Habimana",
    status: "Draft",
  },
];

export function getAdminSnapshot(yearId: string, termId: string) {
  return ADMIN_SNAPSHOT[
    getSessionKey(yearId, termId) as keyof typeof ADMIN_SNAPSHOT
  ];
}

export function getTermActivity(yearId: string, termId: string) {
  return (
    TERM_ACTIVITY[
      getSessionKey(yearId, termId) as keyof typeof TERM_ACTIVITY
    ] ?? TERM_ACTIVITY.default
  );
}
