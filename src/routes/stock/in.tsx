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
import { TrendingUp, Package, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/stock/in")({ component: StockIn });

function StockIn() {
  const { selectedYear, selectedTerm } = useAcademicSession();
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [supplier, setSupplier] = useState("");
  const [notes, setNotes] = useState("");

  const recentStockIn = [
    { id: 1, product: "Exercise Books", quantity: 100, supplier: "ABC Supplies", date: "2026-05-10", addedBy: "Admin" },
    { id: 2, product: "Notebooks", quantity: 200, supplier: "XYZ Stationery", date: "2026-05-09", addedBy: "Admin" },
    { id: 3, product: "Pens (Blue)", quantity: 150, supplier: "ABC Supplies", date: "2026-05-08", addedBy: "Stock Manager" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Stock added successfully");
    setProductId("");
    setQuantity("");
    setSupplier("");
    setNotes("");
  };

  return (
    <StockLayout title="Stock In">
      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Add Stock - {selectedTerm.name}</CardTitle>
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
                <Label htmlFor="supplier">Supplier</Label>
                <Input
                  id="supplier"
                  placeholder="Enter supplier name"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  required
                />
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
                <TrendingUp className="mr-2 h-4 w-4" />
                Add Stock
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Stock In - {selectedYear.label} {selectedTerm.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentStockIn.map((item) => (
                <div key={item.id} className="flex items-start justify-between rounded-lg border p-4">
                  <div className="flex gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-green-100">
                      <Package className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">{item.product}</div>
                      <div className="text-sm text-muted-foreground">
                        Supplier: {item.supplier}
                      </div>
                      <div className="mt-1 flex gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {item.date}
                        </span>
                        <span>By: {item.addedBy}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-600">+{item.quantity}</Badge>
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
