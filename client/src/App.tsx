import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import PrivacyPolicy from "@/pages/privacy-policy";
import AdminPage from "@/pages/admin";
import AdminDebugPage from "@/pages/admin-debug";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ErrorBoundary from "@/components/error-boundary";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/admin">
        <ErrorBoundary>
          <AdminPage />
        </ErrorBoundary>
      </Route>
      <Route path="/admin-debug">
        <ErrorBoundary>
          <AdminDebugPage />
        </ErrorBoundary>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Router />
        <Toaster />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
