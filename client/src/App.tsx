import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Tours from "@/pages/Tours";
import TourDetail from "@/pages/TourDetail";
import DestinationPage from "@/pages/Destination";
import ComingSoon from "@/pages/ComingSoon";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/tours" component={Tours} />
      <Route path="/tours/:slug" component={TourDetail} />
      <Route path="/destinations/:slug" component={DestinationPage} />
      <Route path="/sale">
        <ComingSoon title="Special Offers Coming Soon" description="Stay tuned for amazing deals and exclusive travel packages." />
      </Route>
      <Route path="/blog">
        <ComingSoon title="Travel Blog Coming Soon" description="Discover travel tips, destination guides, and inspiring stories from around the world." />
      </Route>
      <Route path="/about">
        <ComingSoon title="About Us" description="Learn more about Tramondoo and our mission to make travel accessible and unforgettable." />
      </Route>
      <Route path="/contact">
        <ComingSoon title="Get In Touch" description="We'd love to hear from you! Our contact form is coming soon." />
      </Route>
      <Route path="/login">
        <ComingSoon title="Login" description="Member login coming soon. Stay tuned for exclusive member benefits!" />
      </Route>
      <Route path="/signup">
        <ComingSoon title="Join Us" description="Sign up for exclusive deals and travel updates. Coming soon!" />
      </Route>
      <Route path="/cart">
        <ComingSoon title="Shopping Cart" description="Your booking cart is coming soon. You can still book tours directly from tour pages!" />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
