import { createFileRoute } from "@tanstack/react-router";
import { LibraryLayout } from "@/components/layout/LibraryLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAcademicSession } from "@/lib/academic-session";
import { useState } from "react";
import { toast } from "sonner";
import { BookOpen, Search, CheckCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/library/return")({ component: LibraryReturn });

function LibraryReturn() {
  const { selectedYear, selectedTerm } = useAcademicSession();
  const [searchQuery, setSearchQuery] = useState("");

  const borrowedBooks = [
    { id: 1, student: "John Doe", rollNo: "10A-001", book: "Advanced Mathematics", borrowDate: "2026-05-10", dueDate: "2026-05-24", status: "on_time" },
    { id: 2, student: "Jane Smith", rollNo: "10A-002", book: "Physics Fundamentals", borrowDate: "2026-05-10", dueDate: "2026-05-24", status: "on_time" },
    { id: 3, student: "Mike Johnson", rollNo: "10A-003", book: "Chemistry Lab Manual", borrowDate: "2026-04-20", dueDate: "2026-05-04", status: "overdue" },
    { id: 4, student: "Sarah Williams", rollNo: "10A-004", book: "World History", borrowDate: "2026-05-08", dueDate: "2026-05-22", status: "on_time" },
    { id: 5, student: "David Brown", rollNo: "10A-005", book: "English Literature", borrowDate: "2026-04-15", dueDate: "2026-04-29", status: "overdue" },
  ];

  const filteredBooks = borrowedBooks.filter(item =>
    item.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.book.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReturn = (id: number, studentName: string) => {
    toast.success(`Book returned by ${studentName}`);
  };

  return (
    <LibraryLayout title="Return Books">
      <Card>
        <CardHeader>
          <CardTitle>Return Books - {selectedYear.label} {selectedTerm.name}</CardTitle>
          <div className="relative pt-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by student name, roll no, or book title..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredBooks.map((item) => {
              const isOverdue = item.status === "overdue";
              
              return (
                <div 
                  key={item.id} 
                  className={`flex items-start justify-between rounded-lg border p-4 transition ${
                    isOverdue ? 'border-red-200 bg-red-50/50' : 'hover:bg-muted/50'
                  }`}
                >
                  <div className="flex gap-3 flex-1">
                    <div className={`grid h-12 w-12 place-items-center rounded-lg ${
                      isOverdue ? 'bg-red-100' : 'bg-primary/10'
                    }`}>
                      <BookOpen className={`h-6 w-6 ${isOverdue ? 'text-red-600' : 'text-primary'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{item.book}</div>
                        {isOverdue && (
                          <Badge variant="destructive" className="gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Overdue
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.student} ({item.rollNo})
                      </div>
                      <div className="mt-2 flex flex-wrap gap-3 text-xs">
                        <span className="text-muted-foreground">
                          Borrowed: {item.borrowDate}
                        </span>
                        <span className={isOverdue ? 'text-red-600 font-medium' : 'text-muted-foreground'}>
                          Due: {item.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleReturn(item.id, item.student)}
                    variant={isOverdue ? "destructive" : "default"}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Return Book
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </LibraryLayout>
  );
}
