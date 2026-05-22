import { createFileRoute } from "@tanstack/react-router";
import { StockLayout } from "@/components/layout/StockLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAcademicSession } from "@/lib/academic-session";
import { Plus, Search, Package, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/stock/products")({ component: StockProducts });

function StockProducts() {
  const { selectedYear, selectedTerm } = useAcademicSession();
  const [searchQuery, setSearchQuery] = useState("");

  const products = [
    { id: 1, name: "Exercise Books", category: "Stationery", quantity: 450, unit: "pcs", price: 2.50, minStock: 100, status: "in_stock" },
    { id: 2, name: "Pens (Blue)", category: "Stationery", quantity: 320, unit: "pcs", price: 0.50, minStock: 200, status: "in_stock" },
    { id: 3, name: "Whiteboard Markers", category: "Classroom Supplies", quantity: 5, unit: "pcs", price: 3.00, minStock: 20, status: "low_stock" },
    { id: 4, name: "A4 Paper Reams", category: "Paper Products", quantity: 8, unit: "reams", price: 25.00, minStock: 15, status: "low_stock" },
    { id: 5, name: "Notebooks", category: "Stationery", quantity: 280, unit: "pcs", price: 4.00, minStock: 100, status: "in_stock" },
    { id: 6, name: "Staplers", category: "Office Supplies", quantity: 3, unit: "pcs", price: 8.00, minStock: 10, status: "critical" },
    { id: 7, name: "Scissors", category: "Classroom Supplies", quantity: 45, unit: "pcs", price: 5.00, minStock: 20, status: "in_stock" },
    { id: 8, name: "Glue Sticks", category: "Stationery", quantity: 150, unit: "pcs", price: 1.50, minStock: 50, status: "in_stock" },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    if (status === "critical") return <Badge variant="destructive">Critical</Badge>;
    if (status === "low_stock") return <Badge variant="outline" className="border-orange-500 text-orange-700">Low Stock</Badge>;
    return <Badge variant="default">In Stock</Badge>;
  };

  return (
    <StockLayout title="Products Management">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <CardTitle>Stock Products - {selectedYear.label} {selectedTerm.name}</CardTitle>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Product
            </Button>
          </div>
          <div className="relative pt-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by product name or category..."
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
                  <th className="p-3 text-left">Product Name</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-center">Quantity</th>
                  <th className="p-3 text-center">Unit</th>
                  <th className="p-3 text-right">Price</th>
                  <th className="p-3 text-center">Min Stock</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b transition hover:bg-muted/50">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10">
                          <Package className="h-5 w-5 text-primary" />
                        </div>
                        <div className="font-medium">{product.name}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">{product.category}</Badge>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`font-semibold ${
                        product.status === "critical" ? "text-red-600" :
                        product.status === "low_stock" ? "text-orange-600" : ""
                      }`}>
                        {product.quantity}
                      </span>
                    </td>
                    <td className="p-3 text-center text-sm text-muted-foreground">{product.unit}</td>
                    <td className="p-3 text-right font-medium">${product.price.toFixed(2)}</td>
                    <td className="p-3 text-center text-sm text-muted-foreground">{product.minStock}</td>
                    <td className="p-3 text-center">
                      {getStatusBadge(product.status)}
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
    </StockLayout>
  );
}
