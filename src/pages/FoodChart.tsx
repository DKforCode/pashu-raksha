import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Bell, Search } from "lucide-react";

const FoodChart = () => {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Food Chart Management</h1>
          <p className="text-muted-foreground mt-2">Automated feeding schedules with alerts per breed</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-6">
                <div className="text-center">
                  <Bell className="h-12 w-12 text-accent mx-auto mb-2" />
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Feeding reminders</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">No animals registered yet</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Special Diets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Modified feeding charts for diseased animals will appear here</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Search Animal Food Chart</CardTitle>
            <CardDescription>Enter barcode to view feeding schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <Label htmlFor="barcode">Animal Barcode</Label>
                <Input id="barcode" placeholder="Scan or enter barcode" />
              </div>
              <Button className="self-end">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>

            <div className="text-center py-12 text-muted-foreground">
              <p>Enter a barcode to view automated food chart</p>
              <p className="text-sm mt-2">Feeding schedules are automatically generated based on breed and health status</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FoodChart;
