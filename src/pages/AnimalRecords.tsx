import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

const AnimalRecords = () => {
  const [searchBarcode, setSearchBarcode] = useState("");

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
              <Button className="self-end">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

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
      </div>
    </div>
  );
};

export default AnimalRecords;
