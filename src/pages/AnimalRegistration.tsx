import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import JsBarcode from "jsbarcode";
import { addAnimal, generateBarcode } from "@/lib/storage";

const AnimalRegistration = () => {
  const [formData, setFormData] = useState({
    category: "",
    breed: "",
    dobMonth: "",
    dobYear: "",
    weight: "",
    district: "",
    state: "",
  });
  const [generatedBarcode, setGeneratedBarcode] = useState<string | null>(null);
  const [barcodeId, setBarcodeId] = useState<string | null>(null);

  const generateBarcodeImage = (id: string) => {
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, id, {
      format: "CODE128",
      width: 2,
      height: 80,
      displayValue: true
    });
    setGeneratedBarcode(canvas.toDataURL());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.breed || !formData.dobMonth || !formData.dobYear || 
        !formData.weight || !formData.district || !formData.state) {
      toast.error("Please fill all required fields");
      return;
    }

    const newBarcodeId = generateBarcode(formData.category);
    const newAnimal = {
      id: Date.now().toString(),
      barcode: newBarcodeId,
      category: formData.category,
      breed: formData.breed,
      dob: `${formData.dobYear}-${formData.dobMonth.padStart(2, '0')}`,
      weight: parseFloat(formData.weight),
      district: formData.district,
      state: formData.state,
      registrationDate: new Date().toISOString().split('T')[0]
    };
    
    addAnimal(newAnimal);
    setBarcodeId(newBarcodeId);
    generateBarcodeImage(newBarcodeId);
    toast.success(`Animal registered successfully! Barcode: ${newBarcodeId}`);
    
    // Reset form
    setFormData({
      category: "",
      breed: "",
      dobMonth: "",
      dobYear: "",
      weight: "",
      district: "",
      state: "",
    });
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear - i);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Animal Registration</h1>
          <p className="text-muted-foreground mt-2">Register a new animal and generate a unique barcode</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registration Form</CardTitle>
            <CardDescription>Fill in all the details to register a new animal</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Animal Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
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
                  <Label htmlFor="breed">Breed *</Label>
                  <Input
                    id="breed"
                    placeholder="Enter breed"
                    value={formData.breed}
                    onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dobMonth">Date of Birth - Month *</Label>
                  <Select value={formData.dobMonth} onValueChange={(value) => setFormData({ ...formData, dobMonth: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month, index) => (
                        <SelectItem key={month} value={(index + 1).toString()}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dobYear">Date of Birth - Year *</Label>
                  <Select value={formData.dobYear} onValueChange={(value) => setFormData({ ...formData, dobYear: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg) *</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="Enter weight"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district">District *</Label>
                  <Input
                    id="district"
                    placeholder="Enter district"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    placeholder="Enter state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full md:w-auto">
                Register Animal
              </Button>
            </form>

            {generatedBarcode && (
              <div className="mt-8 p-6 bg-muted rounded-lg text-center">
                <h3 className="text-lg font-semibold mb-4">Generated Barcode</h3>
                <img src={generatedBarcode} alt="Animal Barcode" className="mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">Save or print this barcode for future reference</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnimalRegistration;
