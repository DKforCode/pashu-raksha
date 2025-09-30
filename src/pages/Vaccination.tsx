import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Syringe, Search, Plus } from "lucide-react";
import { toast } from "sonner";

const Vaccination = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Vaccination Management</h1>
            <p className="text-muted-foreground mt-2">Track vaccination schedules and records</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Vaccination
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Due Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-4">
                <div className="text-center">
                  <Syringe className="h-10 w-10 text-accent mx-auto mb-2" />
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Vaccinations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Upcoming</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">This month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {showForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>New Vaccination Record</CardTitle>
              <CardDescription>Record a completed or scheduled vaccination</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Animal Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pig">Pig</SelectItem>
                        <SelectItem value="poultry">Poultry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Breed</Label>
                    <Input placeholder="Enter breed" />
                  </div>

                  <div className="space-y-2">
                    <Label>Animal Barcode</Label>
                    <Input placeholder="Scan or enter barcode" />
                  </div>

                  <div className="space-y-2">
                    <Label>Vaccination Date</Label>
                    <Input type="date" />
                  </div>

                  <div className="space-y-2">
                    <Label>Vaccine Name</Label>
                    <Input placeholder="Enter vaccine name" />
                  </div>

                  <div className="space-y-2">
                    <Label>Doctor Name</Label>
                    <Input placeholder="Enter doctor name" />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button type="submit">Save Record</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Vaccination Schedule</CardTitle>
            <CardDescription>Upcoming and past vaccinations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <Syringe className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>No vaccination records found</p>
              <p className="text-sm mt-2">Add your first vaccination record to get started</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Vaccination;
