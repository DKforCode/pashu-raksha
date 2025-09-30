import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle, FileText } from "lucide-react";

const TrainingSession = () => {
  const trainingModules = [
    {
      title: "Medication Administration",
      description: "Learn proper techniques for administering medication to pigs and poultry",
      type: "video",
      duration: "15 min"
    },
    {
      title: "Feeding & Nutrition",
      description: "Best practices for feeding schedules and nutritional requirements",
      type: "video",
      duration: "20 min"
    },
    {
      title: "Animal Upbringing",
      description: "Essential care practices from birth to maturity",
      type: "video",
      duration: "25 min"
    },
    {
      title: "Waste Management",
      description: "Proper animal waste disposal and biosecurity protocols",
      type: "video",
      duration: "18 min"
    },
    {
      title: "Biosecurity Guidelines",
      description: "Complete biosecurity protocols and best practices",
      type: "document",
      duration: "PDF Guide"
    },
    {
      title: "Disease Prevention",
      description: "Identifying early signs of disease and prevention methods",
      type: "video",
      duration: "22 min"
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Training Sessions</h1>
          <p className="text-muted-foreground mt-2">Educational resources for farm biosecurity and animal care</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainingModules.map((module, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="h-40 bg-gradient-primary rounded-lg mb-4 flex items-center justify-center">
                  {module.type === "video" ? (
                    <PlayCircle className="h-16 w-16 text-primary-foreground" />
                  ) : (
                    <FileText className="h-16 w-16 text-primary-foreground" />
                  )}
                </div>
                <CardTitle className="text-lg">{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{module.duration}</span>
                  <span className="text-sm font-medium text-primary">
                    {module.type === "video" ? "Watch Now" : "Download"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainingSession;
