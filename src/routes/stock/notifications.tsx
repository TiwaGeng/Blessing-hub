import { createFileRoute } from "@tanstack/react-router";
import { StockLayout } from "@/components/layout/StockLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAcademicSession } from "@/lib/academic-session";
import { AlertTriangle, Bell, CheckCircle, Package } from "lucide-react";

export const Route = createFileRoute("/stock/notifications")({ component: StockNotifications });

function StockNotifications() {
  const { selectedYear, selectedTerm } = useAcademicSession();

  const notifications = [
    { id: 1, type: "critical", product: "Staplers", current: 3, minimum: 10, message: "Critical stock level - Immediate reorder required", date: "Today" },
    { id: 2, type: "critical", product: "Whiteboard Markers", current: 5, minimum: 20, message: "Critical stock level - Immediate reorder required", date: "Today" },
    { id: 3, type: "low", product: "A4 Paper Reams", current: 8, minimum: 15, message: "Low stock level - Reorder recommended", date: "Today" },
    { id: 4, type: "low", product: "Glue Sticks", current: 12, minimum: 20, message: "Low stock level - Reorder recommended", date: "Yesterday" },
    { id: 5, type: "info", product: "Exercise Books", current: 450, minimum: 100, message: "Stock level healthy", date: "2 days ago" },
    { id: 6, type: "critical", product: "Erasers", current: 2, minimum: 15, message: "Critical stock level - Immediate reorder required", date: "3 days ago" },
  ];

  const criticalCount = notifications.filter(n => n.type === "critical").length;
  const lowCount = notifications.filter(n => n.type === "low").length;

  return (
    <StockLayout title="Stock Notifications">
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Critical Alerts</div>
                <div className="mt-1 text-3xl font-bold text-red-600">{criticalCount}</div>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-full bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Low Stock Alerts</div>
                <div className="mt-1 text-3xl font-bold text-orange-600">{lowCount}</div>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-full bg-orange-100">
                <Bell className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Total Notifications</div>
                <div className="mt-1 text-3xl font-bold">{notifications.length}</div>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/10">
                <Package className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Notifications - {selectedYear.label} {selectedTerm.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`flex items-start justify-between rounded-lg border p-4 ${
                  notification.type === "critical" ? "border-red-200 bg-red-50/50" :
                  notification.type === "low" ? "border-orange-200 bg-orange-50/50" :
                  "border-green-200 bg-green-50/50"
                }`}
              >
                <div className="flex gap-3 flex-1">
                  <div className={`grid h-10 w-10 place-items-center rounded-full ${
                    notification.type === "critical" ? "bg-red-100" :
                    notification.type === "low" ? "bg-orange-100" :
                    "bg-green-100"
                  }`}>
                    {notification.type === "critical" ? (
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    ) : notification.type === "low" ? (
                      <Bell className="h-5 w-5 text-orange-600" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">{notification.product}</div>
                      <Badge variant={
                        notification.type === "critical" ? "destructive" :
                        notification.type === "low" ? "outline" :
                        "default"
                      }>
                        {notification.type}
                      </Badge>
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {notification.message}
                    </div>
                    <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
                      <span>Current: {notification.current}</span>
                      <span>Minimum: {notification.minimum}</span>
                      <span>{notification.date}</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant={notification.type === "critical" ? "destructive" : "outline"}>
                  Reorder
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </StockLayout>
  );
}
