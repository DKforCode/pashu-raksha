import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, Plus } from "lucide-react";
import { toast } from "sonner";
import { getHealthCheckups, addHealthCheckup, addOutbreak } from "@/lib/storage";

const HealthCheckup = () => {
  const [showForm, setShowForm] = useState(false);
  const [checkups, setCheckups] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    category: "",
    breed: "",
    barcode: "",
    date: "",
    weight: "",
    condition: "",
    diseaseName: "",
    prevention: "",
    notes: "",
  });

  useEffect(() => {
    loadCheckups();
  }, []);

  const loadCheckups = () => {
    setCheckups(getHealthCheckups());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.breed || !formData.barcode || 
        !formData.date || !formData.weight || !formData.condition) {
      toast.error("Please fill all required fields");
      return;
    }

    const newCheckup = {
      id: Date.now().toString(),
      date: formData.date,
      animalBarcode: formData.barcode,
      animalCategory: formData.category,
      breed: formData.breed,
      weight: parseFloat(formData.weight),
      condition: formData.condition,
      diseaseName: formData.diseaseName || undefined,
      prevention: formData.prevention || undefined,
      notes: formData.notes || undefined,
    };

    addHealthCheckup(newCheckup);

    // If condition is severe or moderate and has disease, create outbreak
    if ((formData.condition === 'severe' || formData.condition === 'moderate') && formData.diseaseName) {
      const outbreak = {
        id: Date.now().toString(),
        date: formData.date,
        diseaseName: formData.diseaseName,
        animalBarcode: formData.barcode,
        preventionMethod: formData.prevention || "Treatment in progress",
        status: "Active"
      };
      addOutbreak(outbreak);
      toast.warning("Disease outbreak registered");
    }

    loadCheckups();
    toast.success("Health checkup recorded successfully");
    setShowForm(false);
    setFormData({
      category: "",
      breed: "",
      barcode: "",
      date: "",
      weight: "",
      condition: "",
      diseaseName: "",
      prevention: "",
      notes: "",
    });
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Health Checkup</h1>
            <p className="text-muted-foreground mt-2">Monitor animal health and track checkup schedules</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Checkup
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Due Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-2">
                <div className="text-center">
                  <p className="text-2xl font-bold">{checkups.filter(c => c.date === new Date().toISOString().split('T')[0]).length}</p>
                  <p className="text-sm text-muted-foreground">Checkups</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-2">
                <div className="text-center">
                  <p className="text-2xl font-bold">{checkups.length}</p>
                  <p className="text-sm text-muted-foreground">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Health Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-2">
                <div className="text-center">
                  <p className="text-2xl font-bold text-warning">{checkups.filter(c => c.condition !== 'healthy').length}</p>
                  <p className="text-sm text-muted-foreground">Issues</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Healthy Animals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-2">
                <div className="text-center">
                  <p className="text-2xl font-bold">{checkups.filter(c => c.condition === 'healthy').length}</p>
                  <p className="text-sm text-muted-foreground">Animals</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {showForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>New Health Checkup</CardTitle>
              <CardDescription>Record a health inspection</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Animal Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pig">Pig</SelectItem>
                        <SelectItem value="Poultry">Poultry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Breed</Label>
                    <Input placeholder="Enter breed" value={formData.breed} onChange={(e) => setFormData({...formData, breed: e.target.value})} />
                  </div>

                  <div className="space-y-2">
                    <Label>Animal Barcode</Label>
                    <Input placeholder="Scan or enter barcode" value={formData.barcode} onChange={(e) => setFormData({...formData, barcode: e.target.value})} />
                  </div>

                  <div className="space-y-2">
                    <Label>Checkup Date</Label>
                    <Input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                  </div>

                  <div className="space-y-2">
                    <Label>Weight (kg)</Label>
                    <Input type="number" step="0.1" placeholder="Current weight" value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} />
                  </div>

                  <div className="space-y-2">
                    <Label>Health Condition</Label>
                    <Select value={formData.condition} onValueChange={(value) => setFormData({...formData, condition: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="healthy">Healthy</SelectItem>
                        <SelectItem value="mild">Mild Concern</SelectItem>
                        <SelectItem value="moderate">Moderate Issue</SelectItem>
                        <SelectItem value="severe">Severe Issue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>Disease Name (if any)</Label>
                    <Input placeholder="Enter disease name or leave blank" value={formData.diseaseName} onChange={(e) => setFormData({...formData, diseaseName: e.target.value})} />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>Prevention / Treatment</Label>
                    <Textarea placeholder="Enter prevention methods or treatment details" rows={3} value={formData.prevention} onChange={(e) => setFormData({...formData, prevention: e.target.value})} />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>Additional Notes</Label>
                    <Textarea placeholder="Any other observations" rows={3} value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button type="submit">Save Checkup</Button>
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
            <CardTitle>Health Records</CardTitle>
            <CardDescription>Complete health history of animals</CardDescription>
          </CardHeader>
          <CardContent>
            {checkups.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Barcode</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Disease</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {checkups.map((checkup) => (
                    <TableRow key={checkup.id}>
                      <TableCell>{checkup.date}</TableCell>
                      <TableCell>{checkup.animalBarcode}</TableCell>
                      <TableCell>{checkup.animalCategory}</TableCell>
                      <TableCell>{checkup.weight} kg</TableCell>
                      <TableCell>
                        <Badge variant={checkup.condition === 'healthy' ? 'default' : 'destructive'}>
                          {checkup.condition}
                        </Badge>
                      </TableCell>
                      <TableCell>{checkup.diseaseName || 'None'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Activity className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>No health checkup records found</p>
                <p className="text-sm mt-2">Add your first health checkup to start tracking</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthCheckup;
