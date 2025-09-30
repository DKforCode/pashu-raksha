import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Bell, Search } from "lucide-react";
import { toast } from "sonner";
import { getAnimalByBarcode, getHealthCheckups } from "@/lib/storage";

const FoodChart = () => {
  const [barcode, setBarcode] = useState("");
  const [selectedAnimal, setSelectedAnimal] = useState<any>(null);
  const [foodSchedule, setFoodSchedule] = useState<any[]>([]);

  const generateFoodSchedule = (animal: any, hasDisease: boolean) => {
    const baseSchedule = animal.category === "Pig" ? [
      { time: "06:00 AM", food: "Grower Feed", quantity: "2.5 kg", notes: "High protein concentrate" },
      { time: "12:00 PM", food: "Mixed Grains", quantity: "2.0 kg", notes: "Corn and soybean mix" },
      { time: "06:00 PM", food: "Finisher Feed", quantity: "2.5 kg", notes: "Balanced nutrition" },
    ] : [
      { time: "06:00 AM", food: "Starter Feed", quantity: "100 g", notes: "High energy pellets" },
      { time: "12:00 PM", food: "Grower Feed", quantity: "80 g", notes: "Protein-rich feed" },
      { time: "06:00 PM", food: "Finisher Feed", quantity: "100 g", notes: "Complete nutrition" },
    ];

    if (hasDisease) {
      return baseSchedule.map(item => ({
        ...item,
        food: `${item.food} + Supplements`,
        notes: `${item.notes} + Medical supplements`,
      }));
    }

    return baseSchedule;
  };

  const handleSearch = () => {
    if (!barcode.trim()) {
      toast.error("Please enter a barcode");
      return;
    }

    const animal = getAnimalByBarcode(barcode);
    if (!animal) {
      toast.error("Animal not found");
      setSelectedAnimal(null);
      setFoodSchedule([]);
      return;
    }

    setSelectedAnimal(animal);
    
    // Check if animal has any disease
    const checkups = getHealthCheckups().filter(c => c.animalBarcode === barcode);
    const hasDisease = checkups.some(c => c.diseaseName && c.diseaseName.trim() !== "");

    const schedule = generateFoodSchedule(animal, hasDisease);
    setFoodSchedule(schedule);
    toast.success("Food chart generated");
  };
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
                <Input 
                  id="barcode" 
                  placeholder="Scan or enter barcode"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                />
              </div>
              <Button className="self-end" onClick={handleSearch}>
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>

            {selectedAnimal && foodSchedule.length > 0 ? (
              <div className="space-y-6">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Animal Details</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Barcode: </span>
                      <span className="font-medium">{selectedAnimal.barcode}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Category: </span>
                      <span className="font-medium">{selectedAnimal.category}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Breed: </span>
                      <span className="font-medium">{selectedAnimal.breed}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Weight: </span>
                      <span className="font-medium">{selectedAnimal.weight} kg</span>
                    </div>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Food Type</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {foodSchedule.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.time}</TableCell>
                        <TableCell>{item.food}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{item.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Bell className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Automatic Alerts Enabled</h4>
                      <p className="text-sm text-muted-foreground">
                        You will receive notifications at scheduled feeding times. Food chart automatically adjusts based on health conditions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>Enter a barcode to view automated food chart</p>
                <p className="text-sm mt-2">Feeding schedules are automatically generated based on breed and health status</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FoodChart;
