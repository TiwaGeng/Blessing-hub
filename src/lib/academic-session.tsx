import { createContext, useContext, useEffect, useState } from "react";

export type AcademicTerm = {
  id: string;
  name: string;
  start: string;
  end: string;
  status: "completed" | "active" | "upcoming";
};

export type AcademicYear = {
  id: string;
  label: string;
  status: "completed" | "active" | "upcoming";
  terms: AcademicTerm[];
};

const STORAGE_KEY = "blessing-school-academic-session";

export const ACADEMIC_YEARS: AcademicYear[] = [
  {
    id: "2024-2025",
    label: "2024 / 2025",
    status: "completed",
    terms: [
      {
        id: "term-1",
        name: "Term 1",
        start: "Sep 02, 2024",
        end: "Dec 06, 2024",
        status: "completed",
      },
      {
        id: "term-2",
        name: "Term 2",
        start: "Jan 06, 2025",
        end: "Mar 28, 2025",
        status: "completed",
      },
      {
        id: "term-3",
        name: "Term 3",
        start: "Apr 14, 2025",
        end: "Jul 18, 2025",
        status: "completed",
      },
    ],
  },
  {
    id: "2025-2026",
    label: "2025 / 2026",
    status: "active",
    terms: [
      {
        id: "term-1",
        name: "Term 1",
        start: "Sep 08, 2025",
        end: "Dec 05, 2025",
        status: "completed",
      },
      {
        id: "term-2",
        name: "Term 2",
        start: "Jan 05, 2026",
        end: "Mar 27, 2026",
        status: "completed",
      },
      {
        id: "term-3",
        name: "Term 3",
        start: "Apr 13, 2026",
        end: "Jul 17, 2026",
        status: "active",
      },
    ],
  },
  {
    id: "2026-2027",
    label: "2026 / 2027",
    status: "upcoming",
    terms: [
      {
        id: "term-1",
        name: "Term 1",
        start: "Sep 07, 2026",
        end: "Dec 04, 2026",
        status: "upcoming",
      },
      {
        id: "term-2",
        name: "Term 2",
        start: "Jan 11, 2027",
        end: "Apr 01, 2027",
        status: "upcoming",
      },
      {
        id: "term-3",
        name: "Term 3",
        start: "Apr 19, 2027",
        end: "Jul 23, 2027",
        status: "upcoming",
      },
    ],
  },
];

type AcademicSessionValue = {
  years: AcademicYear[];
  selectedYearId: string;
  selectedTermId: string;
  selectedYear: AcademicYear;
  selectedTerm: AcademicTerm;
  isViewingCurrent: boolean;
  setSelectedYearId: (yearId: string) => void;
  setSelectedTermId: (termId: string) => void;
  resetToCurrent: () => void;
};

function getDefaultSession() {
  const activeYear =
    ACADEMIC_YEARS.find((year) => year.status === "active") ??
    ACADEMIC_YEARS[0];
  const activeTerm =
    activeYear.terms.find((term) => term.status === "active") ??
    activeYear.terms[0];

  return { selectedYearId: activeYear.id, selectedTermId: activeTerm.id };
}

const defaultSession = getDefaultSession();

const AcademicSessionContext = createContext<AcademicSessionValue | null>(null);

export function AcademicSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedYearId, setSelectedYearIdState] = useState(
    defaultSession.selectedYearId,
  );
  const [selectedTermId, setSelectedTermIdState] = useState(
    defaultSession.selectedTermId,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const rawValue = window.localStorage.getItem(STORAGE_KEY);
    if (!rawValue) return;

    try {
      const parsed = JSON.parse(rawValue) as {
        selectedYearId?: string;
        selectedTermId?: string;
      };
      const matchedYear = ACADEMIC_YEARS.find(
        (year) => year.id === parsed.selectedYearId,
      );
      const matchedTerm = matchedYear?.terms.find(
        (term) => term.id === parsed.selectedTermId,
      );

      if (matchedYear) {
        setSelectedYearIdState(matchedYear.id);
        setSelectedTermIdState(matchedTerm?.id ?? matchedYear.terms[0].id);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ selectedYearId, selectedTermId }),
    );
  }, [selectedYearId, selectedTermId]);

  const selectedYear =
    ACADEMIC_YEARS.find((year) => year.id === selectedYearId) ??
    ACADEMIC_YEARS[0];
  const selectedTerm =
    selectedYear.terms.find((term) => term.id === selectedTermId) ??
    selectedYear.terms[0];

  const value: AcademicSessionValue = {
    years: ACADEMIC_YEARS,
    selectedYearId,
    selectedTermId,
    selectedYear,
    selectedTerm,
    isViewingCurrent:
      selectedYearId === defaultSession.selectedYearId &&
      selectedTermId === defaultSession.selectedTermId,
    setSelectedYearId: (yearId) => {
      const matchedYear = ACADEMIC_YEARS.find((year) => year.id === yearId);
      if (!matchedYear) return;

      setSelectedYearIdState(matchedYear.id);
      setSelectedTermIdState(matchedYear.terms[0].id);
    },
    setSelectedTermId: (termId) => {
      if (!selectedYear.terms.some((term) => term.id === termId)) return;
      setSelectedTermIdState(termId);
    },
    resetToCurrent: () => {
      setSelectedYearIdState(defaultSession.selectedYearId);
      setSelectedTermIdState(defaultSession.selectedTermId);
    },
  };

  return (
    <AcademicSessionContext.Provider value={value}>
      {children}
    </AcademicSessionContext.Provider>
  );
}

export function useAcademicSession() {
  const context = useContext(AcademicSessionContext);

  if (!context) {
    throw new Error(
      "useAcademicSession must be used inside AcademicSessionProvider",
    );
  }

  return context;
}

export function getSessionKey(yearId: string, termId: string) {
  return `${yearId}:${termId}`;
}
