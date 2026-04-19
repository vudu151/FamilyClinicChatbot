import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Splash from "@/pages/Splash";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Doctors from "@/pages/Doctors";
import Medicine from "@/pages/Medicine";
import Emergency from "@/pages/Emergency";
import Health from "@/pages/Health";
import Profile from "@/pages/Profile";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Splash} />
      <Route path={"/login"} component={Login} />
      <Route path={"/home"} component={Home} />
      <Route path={"/consultation"} component={Consultation} />
      <Route path={"/doctors"} component={Doctors} />
      <Route path={"/medicine"} component={Medicine} />
      <Route path={"/emergency"} component={Emergency} />
      <Route path={"/health"} component={Health} />
      <Route path={"/profile"} component={Profile} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
