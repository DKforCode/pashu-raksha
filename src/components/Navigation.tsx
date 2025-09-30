import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">BS</span>
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:inline">BioSecure Farm</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="space-x-1">
              <NavigationMenuItem>
                <Link
                  to="/"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  Home
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  to="/training"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/training") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  Training Session
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium">
                  Animal Registration & Records
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-48 p-2">
                    <Link
                      to="/animal-registration"
                      className="block px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                    >
                      Animal Registration
                    </Link>
                    <Link
                      to="/animal-records"
                      className="block px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                    >
                      Animal Records
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium">
                  Animal & Farm Caring
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-48 p-2">
                    <Link
                      to="/food-chart"
                      className="block px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                    >
                      Food Chart
                    </Link>
                    <Link
                      to="/farm-cleaning"
                      className="block px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                    >
                      Farm Cleaning
                    </Link>
                    <Link
                      to="/vaccination"
                      className="block px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                    >
                      Vaccination
                    </Link>
                    <Link
                      to="/health-checkup"
                      className="block px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                    >
                      Health Checkup
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  to="/disease-outbreak"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/disease-outbreak") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  Disease Outbreak
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  to="/risk-assessment"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/risk-assessment") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  Risk Assessment
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  to="/visitor"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/visitor") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  Visitor
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  to="/help-support"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/help-support") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  Help Support
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  to="/profile"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/profile") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  User Profile
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-2">
            <Link
              to="/"
              className={`block px-4 py-2 rounded-md text-sm font-medium ${
                isActive("/") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/training"
              className={`block px-4 py-2 rounded-md text-sm font-medium ${
                isActive("/training") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Training Session
            </Link>
            <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">
              Animal Registration & Records
            </div>
            <Link
              to="/animal-registration"
              className="block px-8 py-2 text-sm rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Animal Registration
            </Link>
            <Link
              to="/animal-records"
              className="block px-8 py-2 text-sm rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Animal Records
            </Link>
            <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">
              Animal & Farm Caring
            </div>
            <Link
              to="/food-chart"
              className="block px-8 py-2 text-sm rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Food Chart
            </Link>
            <Link
              to="/farm-cleaning"
              className="block px-8 py-2 text-sm rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Farm Cleaning
            </Link>
            <Link
              to="/vaccination"
              className="block px-8 py-2 text-sm rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Vaccination
            </Link>
            <Link
              to="/health-checkup"
              className="block px-8 py-2 text-sm rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Health Checkup
            </Link>
            <Link
              to="/disease-outbreak"
              className={`block px-4 py-2 rounded-md text-sm font-medium ${
                isActive("/disease-outbreak") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Disease Outbreak
            </Link>
            <Link
              to="/risk-assessment"
              className={`block px-4 py-2 rounded-md text-sm font-medium ${
                isActive("/risk-assessment") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Risk Assessment
            </Link>
            <Link
              to="/visitor"
              className={`block px-4 py-2 rounded-md text-sm font-medium ${
                isActive("/visitor") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Visitor
            </Link>
            <Link
              to="/help-support"
              className={`block px-4 py-2 rounded-md text-sm font-medium ${
                isActive("/help-support") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Help Support
            </Link>
            <Link
              to="/profile"
              className={`block px-4 py-2 rounded-md text-sm font-medium ${
                isActive("/profile") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              User Profile
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
