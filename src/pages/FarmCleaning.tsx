import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, Calendar, AlertCircle } from "lucide-react";

const FarmCleaning = () => {
  const cleaningSteps = [
    {
      title: "Pre-Cleaning Assessment",
      description: "Inspect farm areas and identify high-risk zones",
      status: "pending"
    },
    {
      title: "Remove Organic Matter",
      description: "Clear all visible dirt, manure, and bedding materials",
      status: "pending"
    },
    {
      title: "Water Washing",
      description: "High-pressure wash all surfaces with appropriate water temperature",
      status: "pending"
    },
    {
      title: "Disinfection",
      description: "Apply approved disinfectants following biosecurity protocols",
      status: "pending"
    },
    {
      title: "Drying Period",
      description: "Allow adequate drying time before restocking",
      status: "pending"
    },
    {
      title: "Final Inspection",
      description: "Verify cleaning effectiveness and document completion",
      status: "pending"
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Farm Cleaning Schedule</h1>
          <p className="text-muted-foreground mt-2">Automated cleaning protocols with biosecurity guidelines</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Next Cleaning</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-4">
                <div className="text-center">
                  <Calendar className="h-10 w-10 text-primary mx-auto mb-2" />
                  <p className="text-xl font-bold">Not Scheduled</p>
                  <p className="text-sm text-muted-foreground">Set up your first cleaning schedule</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-4">
                <div className="text-center">
                  <AlertCircle className="h-10 w-10 text-accent mx-auto mb-2" />
                  <p className="text-xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Cleaning reminders</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Last Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-4">
                <div className="text-center">
                  <CheckCircle className="h-10 w-10 text-success mx-auto mb-2" />
                  <p className="text-xl font-bold">Never</p>
                  <p className="text-sm text-muted-foreground">No cleaning history yet</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Biosecurity Cleaning Protocol</CardTitle>
            <CardDescription>Step-by-step guide with automated scheduling</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cleaningSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-lg border border-border hover:bg-muted transition-colors">
                  <div className="flex-shrink-0 mt-1">
                    {step.status === "completed" ? (
                      <CheckCircle className="h-6 w-6 text-success" />
                    ) : (
                      <Circle className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold">{step.title}</h3>
                      <Badge variant={step.status === "completed" ? "default" : "secondary"}>
                        {step.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cleaning History</CardTitle>
            <CardDescription>Past cleaning records and completion dates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <p>No cleaning history available</p>
              <p className="text-sm mt-2">Completed cleaning records will appear here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FarmCleaning;
