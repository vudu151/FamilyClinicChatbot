import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Splash from "@/pages/Splash";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import ChatFamily from "@/pages/ChatFamily";
import ChatAI from "@/pages/ChatAI";
import Calendar from "@/pages/Calendar";
import TaskList from "@/pages/TaskList";
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
      <Route path={"/chat-family"} component={ChatFamily} />
      <Route path={"/chat-ai"} component={ChatAI} />
      <Route path={"/calendar"} component={Calendar} />
      <Route path={"/tasks"} component={TaskList} />
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
