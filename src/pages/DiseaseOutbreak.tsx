import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, Shield } from "lucide-react";
import { getOutbreaks } from "@/lib/storage";

const DiseaseOutbreak = () => {
  const [outbreaks, setOutbreaks] = useState<any[]>([]);

  useEffect(() => {
    setOutbreaks(getOutbreaks());
  }, []);

  const activeOutbreaks = outbreaks.filter(o => o.status === 'Active').length;
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Disease Outbreak Management</h1>
          <p className="text-muted-foreground mt-2">Monitor and manage disease outbreaks and biosecurity breaches</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Outbreaks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-4">
                <div className="text-center">
                  <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-2" />
                  <p className="text-3xl font-bold">{activeOutbreaks}</p>
                  <p className="text-sm text-muted-foreground">Current cases</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Biosecurity Breaches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-4">
                <div className="text-center">
                  <Shield className="h-12 w-12 text-warning mx-auto mb-2" />
                  <p className="text-3xl font-bold">{outbreaks.length}</p>
                  <p className="text-sm text-muted-foreground">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recovery Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-success">{outbreaks.filter(o => o.status === 'Resolved').length}</p>
                  <p className="text-sm text-muted-foreground">Resolved</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Active Disease Alerts
            </CardTitle>
            <CardDescription>Real-time monitoring of disease outbreaks</CardDescription>
          </CardHeader>
          <CardContent>
            {activeOutbreaks > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Disease Name</TableHead>
                    <TableHead>Animal Barcode</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Prevention Method</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {outbreaks.filter(o => o.status === 'Active').map((outbreak) => (
                    <TableRow key={outbreak.id}>
                      <TableCell>{outbreak.date}</TableCell>
                      <TableCell>{outbreak.diseaseName}</TableCell>
                      <TableCell>{outbreak.animalBarcode}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">{outbreak.status}</Badge>
                      </TableCell>
                      <TableCell>{outbreak.preventionMethod}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Shield className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No active disease outbreaks</p>
                <p className="text-sm mt-2">Disease outbreaks will automatically appear here when detected</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Outbreak History</CardTitle>
            <CardDescription>Past disease outbreaks and prevention records</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Disease Name</TableHead>
                  <TableHead>Animal Barcode</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Prevention Method</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {outbreaks.length > 0 ? (
                  outbreaks.map((outbreak) => (
                    <TableRow key={outbreak.id}>
                      <TableCell>{outbreak.date}</TableCell>
                      <TableCell>{outbreak.diseaseName}</TableCell>
                      <TableCell>{outbreak.animalBarcode}</TableCell>
                      <TableCell>
                        <Badge variant={outbreak.status === 'Resolved' ? 'default' : 'destructive'}>
                          {outbreak.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{outbreak.preventionMethod}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No outbreak history available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DiseaseOutbreak;
