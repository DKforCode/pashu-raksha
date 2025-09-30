import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, Syringe, AlertTriangle, ClipboardCheck, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { getAnimals, getVaccinations, getOutbreaks, getAssessments } from "@/lib/storage";

const Home = () => {
  const [stats, setStats] = useState({
    totalAnimals: 0,
    vaccinationsDue: 0,
    activeAlerts: 0,
    riskScore: 0,
  });

  useEffect(() => {
    const animals = getAnimals();
    const vaccinations = getVaccinations();
    const outbreaks = getOutbreaks();
    const assessments = getAssessments();

    // Calculate vaccinations due today
    const today = new Date();
    const dueToday = vaccinations.filter(v => {
      const nextDate = new Date(v.nextDate);
      return nextDate.toDateString() === today.toDateString();
    }).length;

    // Active outbreaks count
    const activeAlerts = outbreaks.filter(o => o.status === 'Active').length;

    // Latest risk score
    const latestScore = assessments.length > 0 ? assessments[assessments.length - 1].score : 0;

    setStats({
      totalAnimals: animals.length,
      vaccinationsDue: dueToday,
      activeAlerts: activeAlerts,
      riskScore: latestScore,
    });
  }, []);

  const statsDisplay = [
    { label: "Total Animals", value: stats.totalAnimals.toString(), icon: Users, color: "text-primary" },
    { label: "Vaccinations Due", value: stats.vaccinationsDue.toString(), icon: Syringe, color: "text-accent" },
    { label: "Active Alerts", value: stats.activeAlerts.toString(), icon: AlertTriangle, color: "text-warning" },
    { label: "Risk Score", value: `${stats.riskScore}%`, icon: Shield, color: "text-success" },
  ];

  const quickActions = [
    { title: "Register Animal", description: "Add a new animal to your farm", link: "/animal-registration", icon: Users },
    { title: "Food Chart", description: "Manage feeding schedules", link: "/food-chart", icon: Leaf },
    { title: "Health Checkup", description: "Record health inspections", link: "/health-checkup", icon: ClipboardCheck },
    { title: "Risk Assessment", description: "Evaluate farm safety", link: "/risk-assessment", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Farm Biosecurity Management System
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Comprehensive biosecurity solution for pig and poultry farms. Monitor health, manage records, and ensure farm safety with advanced tracking and alerts.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsDisplay.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-12 w-12 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link}>
                <Card className="h-full hover:shadow-lg transition-all hover:border-primary cursor-pointer">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-3">
                      <action.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest farm activities and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">No activities yet</p>
                    <p className="text-xs text-muted-foreground">Start by registering your first animal</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>Scheduled vaccinations and checkups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted">
                  <div className="h-2 w-2 rounded-full bg-accent"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">No upcoming tasks</p>
                    <p className="text-xs text-muted-foreground">Tasks will appear after animal registration</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
