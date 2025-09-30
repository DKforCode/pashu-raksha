import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Syringe, Search, Plus } from "lucide-react";
import { toast } from "sonner";
import { getVaccinations, addVaccination } from "@/lib/storage";

const Vaccination = () => {
  const [showForm, setShowForm] = useState(false);
  const [vaccinations, setVaccinations] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    category: "",
    breed: "",
    barcode: "",
    date: "",
    vaccineName: "",
    doctorName: "",
  });

  useEffect(() => {
    loadVaccinations();
  }, []);

  const loadVaccinations = () => {
    setVaccinations(getVaccinations());
  };

  const calculateNextDate = (date: string): string => {
    const d = new Date(date);
    d.setMonth(d.getMonth() + 3); // 3 months later
    return d.toISOString().split('T')[0];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.breed || !formData.barcode || 
        !formData.date || !formData.vaccineName || !formData.doctorName) {
      toast.error("Please fill all required fields");
      return;
    }

    const newVaccination = {
      id: Date.now().toString(),
      date: formData.date,
      animalBarcode: formData.barcode,
      animalCategory: formData.category,
      breed: formData.breed,
      vaccineName: formData.vaccineName,
      doctorName: formData.doctorName,
      nextDate: calculateNextDate(formData.date),
    };

    addVaccination(newVaccination);
    loadVaccinations();
    toast.success("Vaccination record added successfully");
    setShowForm(false);
    setFormData({
      category: "",
      breed: "",
      barcode: "",
      date: "",
      vaccineName: "",
      doctorName: "",
    });
  };

  const getDueCount = () => {
    const today = new Date();
    return vaccinations.filter(v => {
      const nextDate = new Date(v.nextDate);
      return nextDate.toDateString() === today.toDateString();
    }).length;
  };

  const getWeekCount = () => {
    const today = new Date();
    const weekLater = new Date(today);
    weekLater.setDate(weekLater.getDate() + 7);
    return vaccinations.filter(v => {
      const nextDate = new Date(v.nextDate);
      return nextDate >= today && nextDate <= weekLater;
    }).length;
  };

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
                  <p className="text-2xl font-bold">{getDueCount()}</p>
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
                  <p className="text-2xl font-bold">{getWeekCount()}</p>
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
                  <p className="text-2xl font-bold">{vaccinations.length}</p>
                  <p className="text-sm text-muted-foreground">Total records</p>
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
                    <Label>Vaccination Date</Label>
                    <Input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                  </div>

                  <div className="space-y-2">
                    <Label>Vaccine Name</Label>
                    <Input placeholder="Enter vaccine name" value={formData.vaccineName} onChange={(e) => setFormData({...formData, vaccineName: e.target.value})} />
                  </div>

                  <div className="space-y-2">
                    <Label>Doctor Name</Label>
                    <Input placeholder="Enter doctor name" value={formData.doctorName} onChange={(e) => setFormData({...formData, doctorName: e.target.value})} />
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
            {vaccinations.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Barcode</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Breed</TableHead>
                    <TableHead>Vaccine</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Next Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vaccinations.map((vaccination) => (
                    <TableRow key={vaccination.id}>
                      <TableCell>{vaccination.date}</TableCell>
                      <TableCell>{vaccination.animalBarcode}</TableCell>
                      <TableCell>{vaccination.animalCategory}</TableCell>
                      <TableCell>{vaccination.breed}</TableCell>
                      <TableCell>{vaccination.vaccineName}</TableCell>
                      <TableCell>{vaccination.doctorName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{vaccination.nextDate}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Syringe className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>No vaccination records found</p>
                <p className="text-sm mt-2">Add your first vaccination record to get started</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Vaccination;
