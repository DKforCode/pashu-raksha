import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Building2, Stethoscope, HelpCircle } from "lucide-react";

const HelpSupport = () => {
  const emergencyContacts = [
    {
      title: "Animal Ambulance",
      icon: Stethoscope,
      number: "+91-1234-567-890",
      description: "24/7 emergency animal ambulance service",
      available: "Available 24/7"
    },
    {
      title: "Nearest Animal Hospital",
      icon: Building2,
      number: "+91-9876-543-210",
      description: "District veterinary hospital",
      available: "24/7 Emergency"
    },
    {
      title: "District Animal Doctors",
      icon: Stethoscope,
      number: "+91-5555-123-456",
      description: "District veterinary officer",
      available: "Mon-Sat, 9 AM - 6 PM"
    },
    {
      title: "National Helpline",
      icon: HelpCircle,
      number: "1800-XXX-XXXX",
      description: "National animal welfare helpline",
      available: "Available 24/7"
    }
  ];

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Help & Support</h1>
          <p className="text-muted-foreground mt-2">Emergency contacts and support services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {emergencyContacts.map((contact, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <contact.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{contact.title}</CardTitle>
                      <CardDescription>{contact.description}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="text-xl font-bold text-foreground">{contact.number}</p>
                      <p className="text-sm text-muted-foreground">{contact.available}</p>
                    </div>
                    <Button onClick={() => handleCall(contact.number)} size="sm">
                      <Phone className="mr-2 h-4 w-4" />
                      Call
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Important Information</CardTitle>
            <CardDescription>Guidelines for emergency situations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">When to Call Emergency Services:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Sudden illness or injury to animals</li>
                  <li>Suspected disease outbreak</li>
                  <li>Unusual behavior or symptoms in multiple animals</li>
                  <li>Emergency biosecurity breach</li>
                  <li>Need for immediate veterinary consultation</li>
                </ul>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Before Calling:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Have your farm details ready</li>
                  <li>Note down specific symptoms or concerns</li>
                  <li>Keep animal records accessible</li>
                  <li>Be ready to describe the situation clearly</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Online Resources</CardTitle>
            <CardDescription>Additional support and information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start h-auto py-4">
                <div className="text-left">
                  <p className="font-semibold">Government Guidelines</p>
                  <p className="text-sm text-muted-foreground">Official biosecurity protocols</p>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto py-4">
                <div className="text-left">
                  <p className="font-semibold">Disease Database</p>
                  <p className="text-sm text-muted-foreground">Information on common diseases</p>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto py-4">
                <div className="text-left">
                  <p className="font-semibold">Training Materials</p>
                  <p className="text-sm text-muted-foreground">Educational videos and guides</p>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto py-4">
                <div className="text-left">
                  <p className="font-semibold">FAQ Section</p>
                  <p className="text-sm text-muted-foreground">Common questions answered</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpSupport;
