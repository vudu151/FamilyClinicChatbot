import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Splash from "@/pages/Splash";
import AuthPage from "@/pages/Auth";
import Home from "@/pages/Home";
import Consultation from "@/pages/Consultation";
import Doctors from "@/pages/Doctors";
import Medicine from "@/pages/Medicine";
import Emergency from "@/pages/Emergency";
import Health from "@/pages/Health";
import Profile from "@/pages/Profile";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { useEffect } from "react";

function ProtectedRoute({ component: Component }: { component: any }) {
  const { user, isLoading } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!isLoading && !user) navigate("/login", { replace: true });
  }, [user, isLoading, navigate]);

  if (isLoading || !user) return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;

  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Splash} />
      <Route path={"/login"} component={AuthPage} />
      <Route path={"/home"}> <ProtectedRoute component={Home} /> </Route>
      <Route path={"/consultation"}> <ProtectedRoute component={Consultation} /> </Route>
      <Route path={"/doctors"}> <ProtectedRoute component={Doctors} /> </Route>
      <Route path={"/medicine"}> <ProtectedRoute component={Medicine} /> </Route>
      <Route path={"/emergency"}> <ProtectedRoute component={Emergency} /> </Route>
      <Route path={"/health"}> <ProtectedRoute component={Health} /> </Route>
      <Route path={"/profile"}> <ProtectedRoute component={Profile} /> </Route>
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
