import { createFileRoute } from "@tanstack/react-router";
import { StockLayout } from "@/components/layout/StockLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAcademicSession } from "@/lib/academic-session";
import { useState } from "react";
import { toast } from "sonner";
import { TrendingDown, Package, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/stock/out")({ component: StockOut });

function StockOut() {
  const { selectedYear, selectedTerm } = useAcademicSession();
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [issuedTo, setIssuedTo] = useState("");
  const [department, setDepartment] = useState("");
  const [notes, setNotes] = useState("");

  const recentStockOut = [
    { id: 1, product: "Pens (Blue)", quantity: 50, issuedTo: "Mathematics Dept", date: "2026-05-10", issuedBy: "Stock Manager" },
    { id: 2, product: "Markers", quantity: 30, issuedTo: "Science Lab", date: "2026-05-09", issuedBy: "Admin" },
    { id: 3, product: "Exercise Books", quantity: 100, issuedTo: "Grade 10 Students", date: "2026-05-08", issuedBy: "Stock Manager" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Stock issued successfully");
    setProductId("");
    setQuantity("");
    setIssuedTo("");
    setDepartment("");
    setNotes("");
  };

  return (
    <StockLayout title="Stock Out">
      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Issue Stock - {selectedTerm.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="product">Product</Label>
                <Select value={productId} onValueChange={setProductId} required>
                  <SelectTrigger id="product">
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Exercise Books</SelectItem>
                    <SelectItem value="2">Pens (Blue)</SelectItem>
                    <SelectItem value="3">Whiteboard Markers</SelectItem>
                    <SelectItem value="4">A4 Paper Reams</SelectItem>
                    <SelectItem value="5">Notebooks</SelectItem>
                    <SelectItem value="6">Staplers</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  min="1"
                />
              </div>

              <div>
                <Label htmlFor="issuedTo">Issued To</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="issuedTo"
                    placeholder="Person or department"
                    className="pl-9"
                    value={issuedTo}
                    onChange={(e) => setIssuedTo(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="department">Department</Label>
                <Select value={department} onValueChange={setDepartment} required>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administration</SelectItem>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="lab">Laboratory</SelectItem>
                    <SelectItem value="library">Library</SelectItem>
                    <SelectItem value="students">Students</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full">
                <TrendingDown className="mr-2 h-4 w-4" />
                Issue Stock
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Stock Out - {selectedYear.label} {selectedTerm.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentStockOut.map((item) => (
                <div key={item.id} className="flex items-start justify-between rounded-lg border p-4">
                  <div className="flex gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-orange-100">
                      <Package className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="font-medium">{item.product}</div>
                      <div className="text-sm text-muted-foreground">
                        Issued to: {item.issuedTo}
                      </div>
                      <div className="mt-1 flex gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {item.date}
                        </span>
                        <span>By: {item.issuedBy}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="border-orange-500 text-orange-700">-{item.quantity}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </StockLayout>
  );
}
