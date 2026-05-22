import { createFileRoute } from "@tanstack/react-router";
import { LibraryLayout } from "@/components/layout/LibraryLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAcademicSession } from "@/lib/academic-session";
import { Plus, Search, BookOpen, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/library/books")({ component: LibraryBooks });

function LibraryBooks() {
  const { selectedYear, selectedTerm } = useAcademicSession();
  const [searchQuery, setSearchQuery] = useState("");

  const books = [
    { id: 1, title: "Advanced Mathematics", author: "John Smith", isbn: "978-0-123456-78-9", category: "Mathematics", quantity: 25, available: 18, status: "available" },
    { id: 2, title: "Physics Fundamentals", author: "Jane Doe", isbn: "978-0-234567-89-0", category: "Science", quantity: 20, available: 12, status: "available" },
    { id: 3, title: "Chemistry Lab Manual", author: "Mike Johnson", isbn: "978-0-345678-90-1", category: "Science", quantity: 15, available: 8, status: "available" },
    { id: 4, title: "World History", author: "Sarah Williams", isbn: "978-0-456789-01-2", category: "History", quantity: 30, available: 22, status: "available" },
    { id: 5, title: "Biology Textbook", author: "David Brown", isbn: "978-0-567890-12-3", category: "Science", quantity: 18, available: 0, status: "out_of_stock" },
    { id: 6, title: "English Literature", author: "Emily Davis", isbn: "978-0-678901-23-4", category: "Literature", quantity: 22, available: 15, status: "available" },
  ];

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.isbn.includes(searchQuery)
  );

  return (
    <LibraryLayout title="Books Management">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <CardTitle>Library Books - {selectedYear.label} {selectedTerm.name}</CardTitle>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Book
            </Button>
          </div>
          <div className="relative pt-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by title, author, or ISBN..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left">Book Details</th>
                  <th className="p-3 text-left">ISBN</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-center">Total</th>
                  <th className="p-3 text-center">Available</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => (
                  <tr key={book.id} className="border-b transition hover:bg-muted/50">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{book.title}</div>
                          <div className="text-sm text-muted-foreground">{book.author}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-sm">{book.isbn}</td>
                    <td className="p-3">
                      <Badge variant="outline">{book.category}</Badge>
                    </td>
                    <td className="p-3 text-center font-semibold">{book.quantity}</td>
                    <td className="p-3 text-center">
                      <span className={book.available === 0 ? 'text-red-600 font-semibold' : 'font-semibold'}>
                        {book.available}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <Badge variant={book.status === "available" ? "default" : "destructive"}>
                        {book.status === "available" ? "Available" : "Out of Stock"}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex justify-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </LibraryLayout>
  );
}
