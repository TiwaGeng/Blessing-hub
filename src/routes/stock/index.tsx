import { createFileRoute } from "@tanstack/react-router";
import { StockLayout } from "@/components/layout/StockLayout";
import { StatCard } from "@/components/shared/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, TrendingUp, TrendingDown, AlertTriangle, Bell } from "lucide-react";
import { useAcademicSession } from "@/lib/academic-session";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/stock/")({ component: StockDashboard });

function StockDashboard() {
  const { selectedYear, selectedTerm } = useAcademicSession();

  const recentActivity = [
    { action: "Stock In", product: "Exercise Books (100 pcs)", quantity: 100, date: "Today, 11:30 AM" },
    { action: "Stock Out", product: "Pens (50 pcs)", quantity: 50, date: "Today, 09:45 AM" },
    { action: "Stock In", product: "Notebooks (200 pcs)", quantity: 200, date: "Yesterday, 15:20 PM" },
    { action: "Stock Out", product: "Markers (30 pcs)", quantity: 30, date: "Yesterday, 10:15 AM" },
  ];

  const lowStockItems = [
    { product: "Whiteboard Markers", current: 5, minimum: 20, status: "critical" },
    { product: "A4 Paper Reams", current: 8, minimum: 15, status: "low" },
    { product: "Staplers", current: 3, minimum: 10, status: "critical" },
  ];

  return (
    <StockLayout title="Stock Dashboard">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Products" value="156" icon={Package} tone="default" trend={`${selectedTerm.name}`} />
        <StatCard label="Stock In (This Month)" value="2,450" icon={TrendingUp} tone="success" trend="Items received" />
        <StatCard label="Stock Out (This Month)" value="1,820" icon={TrendingDown} tone="gold" trend="Items issued" />
        <StatCard label="Low Stock Items" value="12" icon={AlertTriangle} tone="warning" trend="Need reorder" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Activity - {selectedTerm.name}</CardTitle>
              <Package className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border p-4 transition hover:bg-muted/50">
                  <div className={`mt-1 h-2 w-2 rounded-full ${activity.action === "Stock In" ? "bg-green-500" : "bg-orange-500"}`} />
                  <div className="flex-1">
                    <div className="font-medium">{activity.action}: {activity.product}</div>
                    <div className="text-sm text-muted-foreground">Quantity: {activity.quantity} • {activity.date}</div>
                  </div>
                  <Badge variant={activity.action === "Stock In" ? "default" : "outline"}>
                    {activity.action}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Button asChild className="flex-1">
                <Link to="/stock/in">Stock In</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link to="/stock/out">Stock Out</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Low Stock Alert</CardTitle>
              <Bell className="h-5 w-5 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStockItems.map((item, i) => (
                <div key={i} className={`rounded-lg border p-3 ${
                  item.status === "critical" ? "border-red-200 bg-red-50/50" : "border-orange-200 bg-orange-50/50"
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">{item.product}</div>
                    <Badge variant={item.status === "critical" ? "destructive" : "outline"}>
                      {item.status}
                    </Badge>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Current: {item.current} | Min: {item.minimum}
                  </div>
                </div>
              ))}
            </div>
            <Button asChild variant="outline" className="mt-4 w-full" size="sm">
              <Link to="/stock/notifications">View All Alerts</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Stats - {selectedYear.label} {selectedTerm.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-lg border p-4">
              <div className="text-sm text-muted-foreground">Total Stock Value</div>
              <div className="mt-1 text-2xl font-bold">$45,230</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-sm text-muted-foreground">Products Added</div>
              <div className="mt-1 text-2xl font-bold">23</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-sm text-muted-foreground">Stock Movements</div>
              <div className="mt-1 text-2xl font-bold">4,270</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-sm text-muted-foreground">Pending Orders</div>
              <div className="mt-1 text-2xl font-bold">8</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </StockLayout>
  );
}
