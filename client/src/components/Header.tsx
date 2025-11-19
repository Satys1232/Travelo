import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Header() {
  const [location] = useLocation();
  const [cartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "What We Offer", path: "/tours" },
    { label: "Sale", path: "/sale" },
    { label: "Blog", path: "/blog" },
    { label: "About Us", path: "/about" },
    { label: "Get In Touch", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-2 py-1" data-testid="link-home">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <Globe className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-none text-foreground">tramondoo</span>
              <span className="text-xs text-muted-foreground">NETWORK</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium hover-elevate active-elevate-2 rounded-md px-3 py-2 transition-colors ${
                  location === item.path
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
                data-testid={`link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Language & Currency */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden md:flex gap-1" data-testid="button-language">
                  EN
                  <span className="text-muted-foreground">USD $</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>EN - USD $</DropdownMenuItem>
                <DropdownMenuItem>ES - EUR €</DropdownMenuItem>
                <DropdownMenuItem>FR - EUR €</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth Buttons */}
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hidden md:inline-flex" data-testid="button-login">
                LOG IN
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="ghost" size="sm" className="hidden md:inline-flex" data-testid="button-signup">
                JOIN US
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative" data-testid="button-cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    data-testid="badge-cart-count"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-mobile-menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className="text-base font-medium hover-elevate active-elevate-2 rounded-md px-4 py-2 block"
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`mobile-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="border-t pt-4 mt-4">
                    <Link href="/login">
                      <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-button-login">
                        <User className="h-4 w-4 mr-2" />
                        Log In
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-button-signup">
                        <User className="h-4 w-4 mr-2" />
                        Join Us
                      </Button>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
