import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { getAnimalByBarcode, getVaccinations, getHealthCheckups, getOutbreaks } from "@/lib/storage";
import { toast } from "sonner";

const AnimalRecords = () => {
  const [searchBarcode, setSearchBarcode] = useState("");
  const [selectedAnimal, setSelectedAnimal] = useState<any>(null);
  const [animalVaccinations, setAnimalVaccinations] = useState<any[]>([]);
  const [animalCheckups, setAnimalCheckups] = useState<any[]>([]);
  const [animalDiseases, setAnimalDiseases] = useState<any[]>([]);

  const handleSearch = () => {
    if (!searchBarcode.trim()) {
      toast.error("Please enter a barcode");
      return;
    }

    const animal = getAnimalByBarcode(searchBarcode);
    if (!animal) {
      toast.error("Animal not found");
      setSelectedAnimal(null);
      return;
    }

    setSelectedAnimal(animal);
    
    // Get related records
    const vaccinations = getVaccinations().filter(v => v.animalBarcode === searchBarcode);
    const checkups = getHealthCheckups().filter(c => c.animalBarcode === searchBarcode);
    const diseases = getOutbreaks().filter(d => d.animalBarcode === searchBarcode);
    
    setAnimalVaccinations(vaccinations);
    setAnimalCheckups(checkups);
    setAnimalDiseases(diseases);
    
    toast.success("Animal records found");
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Animal Records</h1>
          <p className="text-muted-foreground mt-2">View complete records of registered animals</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search Animal</CardTitle>
            <CardDescription>Enter barcode to view detailed records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="barcode">Animal Barcode</Label>
                <Input
                  id="barcode"
                  placeholder="Scan or enter barcode"
                  value={searchBarcode}
                  onChange={(e) => setSearchBarcode(e.target.value)}
                />
              </div>
              <Button className="self-end" onClick={handleSearch}>
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {selectedAnimal ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Animal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Barcode</p>
                    <p className="font-semibold">{selectedAnimal.barcode}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-semibold">{selectedAnimal.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Breed</p>
                    <p className="font-semibold">{selectedAnimal.breed}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date of Birth</p>
                    <p className="font-semibold">{selectedAnimal.dob}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Weight</p>
                    <p className="font-semibold">{selectedAnimal.weight} kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">District</p>
                    <p className="font-semibold">{selectedAnimal.district}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">State</p>
                    <p className="font-semibold">{selectedAnimal.state}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Registration Date</p>
                    <p className="font-semibold">{selectedAnimal.registrationDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="health">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="health">Health Records</TabsTrigger>
                <TabsTrigger value="vaccination">Vaccination Records</TabsTrigger>
                <TabsTrigger value="diseases">Previous Diseases</TabsTrigger>
              </TabsList>

              <TabsContent value="health">
                <Card>
                  <CardHeader>
                    <CardTitle>Health Checkup History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {animalCheckups.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Weight</TableHead>
                            <TableHead>Condition</TableHead>
                            <TableHead>Disease</TableHead>
                            <TableHead>Prevention</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {animalCheckups.map((checkup) => (
                            <TableRow key={checkup.id}>
                              <TableCell>{checkup.date}</TableCell>
                              <TableCell>{checkup.weight} kg</TableCell>
                              <TableCell>
                                <Badge variant={checkup.condition === 'healthy' ? 'default' : 'destructive'}>
                                  {checkup.condition}
                                </Badge>
                              </TableCell>
                              <TableCell>{checkup.diseaseName || 'None'}</TableCell>
                              <TableCell>{checkup.prevention || '-'}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <p className="text-center py-8 text-muted-foreground">No health records found</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vaccination">
                <Card>
                  <CardHeader>
                    <CardTitle>Vaccination History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {animalVaccinations.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Vaccine Name</TableHead>
                            <TableHead>Doctor Name</TableHead>
                            <TableHead>Next Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {animalVaccinations.map((vaccination) => (
                            <TableRow key={vaccination.id}>
                              <TableCell>{vaccination.date}</TableCell>
                              <TableCell>{vaccination.vaccineName}</TableCell>
                              <TableCell>{vaccination.doctorName}</TableCell>
                              <TableCell>{vaccination.nextDate}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <p className="text-center py-8 text-muted-foreground">No vaccination records found</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="diseases">
                <Card>
                  <CardHeader>
                    <CardTitle>Disease History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {animalDiseases.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Disease Name</TableHead>
                            <TableHead>Prevention Method</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {animalDiseases.map((disease) => (
                            <TableRow key={disease.id}>
                              <TableCell>{disease.date}</TableCell>
                              <TableCell>{disease.diseaseName}</TableCell>
                              <TableCell>{disease.preventionMethod}</TableCell>
                              <TableCell>
                                <Badge variant={disease.status === 'Resolved' ? 'default' : 'destructive'}>
                                  {disease.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <p className="text-center py-8 text-muted-foreground">No disease records found</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Animal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <p>Enter a barcode to view animal records</p>
                <p className="text-sm mt-2">Health records, vaccination history, and disease information will appear here</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AnimalRecords;
