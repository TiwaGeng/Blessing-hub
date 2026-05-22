import { createFileRoute } from "@tanstack/react-router";
import { LibraryLayout } from "@/components/layout/LibraryLayout";
import { StatCard } from "@/components/shared/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Library, BookOpen, BookMarked, AlertCircle, TrendingUp } from "lucide-react";
import { useAcademicSession } from "@/lib/academic-session";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/library/")({ component: LibraryDashboard });

function LibraryDashboard() {
  const { selectedYear, selectedTerm } = useAcademicSession();

  const recentActivity = [
    { action: "Borrowed", book: "Advanced Mathematics", student: "John Doe", date: "Today, 10:30 AM" },
    { action: "Returned", book: "Physics Fundamentals", student: "Jane Smith", date: "Today, 09:15 AM" },
    { action: "Borrowed", book: "Chemistry Lab Manual", student: "Mike Johnson", date: "Yesterday, 14:20 PM" },
    { action: "Returned", book: "Biology Textbook", student: "Sarah Williams", date: "Yesterday, 11:00 AM" },
  ];

  const topBooks = [
    { title: "Advanced Mathematics", borrowed: 45, category: "Mathematics" },
    { title: "Physics Fundamentals", borrowed: 38, category: "Science" },
    { title: "World History", borrowed: 32, category: "History" },
  ];

  return (
    <LibraryLayout title="Library Dashboard">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Books" value="4,213" icon={Library} tone="default" trend={`${selectedTerm.name}`} />
        <StatCard label="Books Borrowed" value="342" icon={BookOpen} tone="gold" trend="Currently out" />
        <StatCard label="Available" value="3,871" icon={BookMarked} tone="success" trend="In stock" />
        <StatCard label="Overdue" value="18" icon={AlertCircle} tone="warning" trend="Need attention" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Activity - {selectedTerm.name}</CardTitle>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border p-4 transition hover:bg-muted/50">
                  <div className={`mt-1 h-2 w-2 rounded-full ${activity.action === "Borrowed" ? "bg-primary" : "bg-green-500"}`} />
                  <div className="flex-1">
                    <div className="font-medium">{activity.action}: {activity.book}</div>
                    <div className="text-sm text-muted-foreground">{activity.student} • {activity.date}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Button asChild className="flex-1">
                <Link to="/library/borrow">Borrow Book</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link to="/library/return">Return Book</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Books added this term</span>
                <span className="font-semibold">127</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Most borrowed category</span>
                <span className="font-semibold">Science</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Active borrowers</span>
                <span className="font-semibold">234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Pending returns</span>
                <span className="font-semibold text-orange-500">18</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Most Borrowed Books - {selectedYear.label} {selectedTerm.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {topBooks.map((book, i) => (
              <div key={i} className="rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <BookOpen className="h-8 w-8 text-primary" />
                  <span className="text-2xl font-bold text-muted-foreground">#{i + 1}</span>
                </div>
                <h3 className="mt-3 font-medium">{book.title}</h3>
                <p className="text-sm text-muted-foreground">{book.category}</p>
                <div className="mt-2 text-sm">
                  <span className="font-semibold">{book.borrowed}</span> times borrowed
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </LibraryLayout>
  );
}
