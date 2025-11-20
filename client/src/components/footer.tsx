import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Instagram, Twitter, Facebook, Mail } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { InstagramPost } from "@shared/schema";

export function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const { data: instagramPosts } = useQuery<InstagramPost[]>({
    queryKey: ["/api/instagram"],
  });

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      return await apiRequest("POST", "/api/subscriptions", { email });
    },
    onSuccess: () => {
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
    },
    onError: (error: any) => {
      toast({
        title: "Subscription failed",
        description: error.message || "This email is already subscribed or invalid.",
        variant: "destructive",
      });
    },
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      subscribeMutation.mutate(email);
    }
  };

  const displayPosts = instagramPosts || [];

  return (
    <footer className="bg-background border-t">
      {/* Instagram Feed Section */}
      <div className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Instagram className="h-6 w-6" />
              <h3 className="text-2xl font-bold">FOLLOW</h3>
            </div>
            <p className="text-muted-foreground">
              Follow us & Share your "Tramondoo" experience with us
            </p>
            <a
              href="https://instagram.com/tramondoo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
              data-testid="link-instagram"
            >
              #tramondoo
            </a>
          </div>

          {/* Instagram Grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {displayPosts.map((post, index) => (
              <a
                key={post.id}
                href={post.postUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square overflow-hidden rounded hover-elevate transition-all"
                data-testid={`link-instagram-photo-${index}`}
              >
                <img
                  src={post.imageUrl || ""}
                  alt={post.caption || `Instagram post ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Subscription Section */}
      <div className="py-12 bg-[hsl(var(--primary))] text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-6">
              SUBSCRIBE TO OUR EMAILS:
            </h3>
            <form onSubmit={handleSubscribe} className="flex gap-2 mb-8">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70" />
                <Input
                  type="email"
                  placeholder="Enter Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-white/70 focus-visible:ring-white/50"
                  required
                  data-testid="input-email-subscribe"
                />
              </div>
              <Button
                type="submit"
                variant="secondary"
                className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white"
                disabled={subscribeMutation.isPending}
                data-testid="button-subscribe"
              >
                {subscribeMutation.isPending ? "SUBSCRIBING..." : "SUBSCRIBE"}
              </Button>
            </form>

            {/* Certification Badges */}
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { label: "100% PURE", sublabel: "NEW ZEALAND", sublabel2: "SPECIALIST" },
                { label: "AUSSIE", sublabel: "SPECIALIST", sublabel2: "APPROVED" },
                { label: "TRAVEL", sublabel: "EXPERTS", sublabel2: "CERTIFIED" },
              ].map((badge, index) => (
                <div
                  key={index}
                  className="text-center border border-white/30 rounded px-4 py-2"
                  data-testid={`badge-cert-${index}`}
                >
                  <div className="text-xs font-bold">{badge.label}</div>
                  <div className="text-xs">{badge.sublabel}</div>
                  <div className="text-xs">{badge.sublabel2}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Navigation */}
            <div>
              <h4 className="font-bold mb-4">NAVIGATION</h4>
              <ul className="space-y-2">
                {["Home", "Sale", "Blog", "About Us", "Get In Touch"].map((item) => (
                  <li key={item}>
                    <Link
                      href={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`footer-link-${item.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Top Destinations */}
            <div>
              <h4 className="font-bold mb-4">TOP DESTINATIONS</h4>
              <ul className="space-y-2">
                {["Australia", "New Zealand", "Fiji", "South East Asia", "USA"].map((dest) => (
                  <li key={dest}>
                    <Link
                      href={`/destinations/${dest.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`footer-link-dest-${dest.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {dest}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Account */}
            <div>
              <h4 className="font-bold mb-4">ACCOUNT</h4>
              <ul className="space-y-2">
                {[
                  { label: "Login", path: "/login" },
                  { label: "Register", path: "/signup" },
                  { label: "My Backpack", path: "/bookings" },
                  { label: "Wishlist", path: "/wishlist" },
                  { label: "Payment Methods", path: "/payment-methods" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.path}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`footer-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Terms */}
            <div>
              <h4 className="font-bold mb-4">TERMS</h4>
              <ul className="space-y-2">
                {["Privacy Policy", "Terms of Use", "SiteMap", "Price Guarantee", "Airline Fees"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        data-testid={`footer-link-${item.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {item}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-6 bg-card border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">International (English)</span>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="text-xs text-muted-foreground mr-2">We Accept:</span>
              {["VISA", "AMEX", "MC", "DISCOVER", "PayPal"].map((method) => (
                <div
                  key={method}
                  className="px-2 py-1 bg-background border rounded text-xs font-medium"
                  data-testid={`payment-${method.toLowerCase()}`}
                >
                  {method}
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-2">
              {[
                { icon: Twitter, href: "https://twitter.com/tramondoo" },
                { icon: Instagram, href: "https://instagram.com/tramondoo" },
                { icon: Facebook, href: "https://facebook.com/tramondoo" },
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-elevate active-elevate-2 rounded-full p-2"
                    data-testid={`link-social-${index}`}
                  >
                    <Icon className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground mt-4">
            © {new Date().getFullYear()} Tramondoo Network. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
