import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const RiskAssessment = () => {
  const [currentScore, setCurrentScore] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    {
      id: "biosecurity_protocols",
      question: "Are biosecurity protocols being followed daily?",
      options: ["Yes, strictly", "Mostly", "Sometimes", "Rarely", "No"]
    },
    {
      id: "visitor_management",
      question: "Is visitor access properly controlled and logged?",
      options: ["Always", "Usually", "Sometimes", "Rarely", "Never"]
    },
    {
      id: "animal_health",
      question: "Are all animals showing normal health signs?",
      options: ["All healthy", "Mostly healthy", "Some concerns", "Multiple issues", "Serious problems"]
    },
    {
      id: "cleaning_schedule",
      question: "Is the farm cleaning schedule being maintained?",
      options: ["On schedule", "Mostly on time", "Occasionally delayed", "Frequently delayed", "Not followed"]
    },
    {
      id: "feed_quality",
      question: "Is the quality of feed and water consistently good?",
      options: ["Excellent", "Good", "Acceptable", "Poor", "Very poor"]
    }
  ];

  const handleSubmit = () => {
    const totalQuestions = questions.length;
    const answeredQuestions = Object.keys(answers).length;

    if (answeredQuestions < totalQuestions) {
      toast.error("Please answer all questions");
      return;
    }

    // Calculate score (simplified)
    let score = 0;
    Object.values(answers).forEach(answer => {
      const index = questions.find(q => answers[q.id] === answer)?.options.indexOf(answer);
      score += index !== undefined ? (5 - index) * 20 : 0;
    });

    const avgScore = Math.round(score / totalQuestions);
    setCurrentScore(avgScore);
    toast.success("Risk assessment completed");
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Risk Assessment</h1>
          <p className="text-muted-foreground mt-2">Daily farm safety evaluation and risk monitoring</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Current Risk Score</CardTitle>
            <CardDescription>Based on your latest assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Shield className={`h-10 w-10 ${
                  currentScore >= 80 ? 'text-success' :
                  currentScore >= 60 ? 'text-warning' :
                  currentScore > 0 ? 'text-destructive' : 'text-muted-foreground'
                }`} />
                <div>
                  <p className="text-4xl font-bold">{currentScore}%</p>
                  <p className="text-sm text-muted-foreground">
                    {currentScore >= 80 ? 'Low Risk' :
                     currentScore >= 60 ? 'Medium Risk' :
                     currentScore > 0 ? 'High Risk' : 'Not Assessed'}
                  </p>
                </div>
              </div>
              <Badge variant={
                currentScore >= 80 ? 'default' :
                currentScore >= 60 ? 'secondary' :
                currentScore > 0 ? 'destructive' : 'outline'
              }>
                {currentScore >= 80 ? 'Good Standing' :
                 currentScore >= 60 ? 'Needs Attention' :
                 currentScore > 0 ? 'Action Required' : 'Pending'}
              </Badge>
            </div>
            <Progress value={currentScore} className="h-3" />
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Daily Assessment</CardTitle>
            <CardDescription>Answer these questions to evaluate your farm's safety</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {questions.map((q, index) => (
                <div key={q.id} className="space-y-3">
                  <Label className="text-base font-semibold">
                    {index + 1}. {q.question}
                  </Label>
                  <RadioGroup
                    value={answers[q.id]}
                    onValueChange={(value) => setAnswers({ ...answers, [q.id]: value })}
                  >
                    {q.options.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`${q.id}-${option}`} />
                        <Label htmlFor={`${q.id}-${option}`} className="font-normal cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
            </div>

            <Button onClick={handleSubmit} className="w-full mt-6">
              Submit Assessment
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assessment History</CardTitle>
            <CardDescription>Track your farm's risk score over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <TrendingUp className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>No assessment history yet</p>
              <p className="text-sm mt-2">Complete your first assessment to start tracking</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RiskAssessment;
