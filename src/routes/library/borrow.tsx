import { createFileRoute } from "@tanstack/react-router";
import { LibraryLayout } from "@/components/layout/LibraryLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAcademicSession } from "@/lib/academic-session";
import { useState } from "react";
import { toast } from "sonner";
import { BookOpen, User, Calendar, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/library/borrow")({ component: LibraryBorrow });

function LibraryBorrow() {
  const { selectedYear, selectedTerm } = useAcademicSession();
  const [studentId, setStudentId] = useState("");
  const [bookId, setBookId] = useState("");
  const [dueDate, setDueDate] = useState("");

  const recentBorrows = [
    { id: 1, student: "John Doe", rollNo: "10A-001", book: "Advanced Mathematics", borrowDate: "2026-05-10", dueDate: "2026-05-24" },
    { id: 2, student: "Jane Smith", rollNo: "10A-002", book: "Physics Fundamentals", borrowDate: "2026-05-10", dueDate: "2026-05-24" },
    { id: 3, student: "Mike Johnson", rollNo: "10A-003", book: "Chemistry Lab Manual", borrowDate: "2026-05-09", dueDate: "2026-05-23" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Book borrowed successfully");
    setStudentId("");
    setBookId("");
    setDueDate("");
  };

  return (
    <LibraryLayout title="Borrow Books">
      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Issue Book - {selectedTerm.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="student">Student ID / Roll No</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="student"
                    placeholder="Enter student ID"
                    className="pl-9"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="book">Book</Label>
                <Select value={bookId} onValueChange={setBookId} required>
                  <SelectTrigger id="book">
                    <SelectValue placeholder="Select book" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Advanced Mathematics</SelectItem>
                    <SelectItem value="2">Physics Fundamentals</SelectItem>
                    <SelectItem value="3">Chemistry Lab Manual</SelectItem>
                    <SelectItem value="4">World History</SelectItem>
                    <SelectItem value="6">English Literature</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="dueDate"
                    type="date"
                    className="pl-9"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                <BookOpen className="mr-2 h-4 w-4" />
                Issue Book
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Borrows - {selectedYear.label} {selectedTerm.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentBorrows.map((borrow) => (
                <div key={borrow.id} className="flex items-start justify-between rounded-lg border p-4">
                  <div className="flex gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{borrow.book}</div>
                      <div className="text-sm text-muted-foreground">
                        {borrow.student} ({borrow.rollNo})
                      </div>
                      <div className="mt-1 flex gap-3 text-xs text-muted-foreground">
                        <span>Borrowed: {borrow.borrowDate}</span>
                        <span>Due: {borrow.dueDate}</span>
                      </div>
                    </div>
                  </div>
                  <Badge>Active</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </LibraryLayout>
  );
}
