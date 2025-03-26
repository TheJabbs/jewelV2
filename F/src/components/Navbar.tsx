
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, User, LogOut, Search, ShoppingBag } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSearchDialog, setShowSearchDialog] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const user = localStorage.getItem('user');
      setIsAuthenticated(!!user);
    };

    checkAuth();
    // Listen for storage events to update auth state across tabs
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      // Navigate to a search results page with the query as a parameter
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowSearchDialog(false);
    }
  };

  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300",
          scrolled 
            ? "bg-white/90 backdrop-blur-md shadow-sm" 
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-display font-semibold">JewelNeck</Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Collections</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[200px]">
                      <li>
                        <NavigationMenuLink 
                          className="block p-3 hover:bg-accent rounded-md transition-colors"
                          asChild
                        >
                          <Link to="/bracelets">Bracelets</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink 
                          className="block p-3 hover:bg-accent rounded-md transition-colors"
                          asChild
                        >
                          <Link to="/rings">Rings</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink 
                          className="block p-3 hover:bg-accent rounded-md transition-colors"
                          asChild
                        >
                          <Link to="/earrings">Earrings</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink 
                          className="block p-3 hover:bg-accent rounded-md transition-colors"
                          asChild
                        >
                          <Link to="/">Necklaces</Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <Link 
              to="/try-on" 
              className="text-sm font-medium transition-colors hover:text-gold-dark relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:origin-left after:scale-x-0 after:bg-gold-dark after:transition-transform hover:after:scale-x-100"
            >
              Try On
            </Link>
            <Link 
              to="/" 
              className="text-sm font-medium transition-colors hover:text-gold-dark relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:origin-left after:scale-x-0 after:bg-gold-dark after:transition-transform hover:after:scale-x-100"
            >
              About
            </Link>
            <Link 
              to="/" 
              className="text-sm font-medium transition-colors hover:text-gold-dark relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:origin-left after:scale-x-0 after:bg-gold-dark after:transition-transform hover:after:scale-x-100"
            >
              Contact
            </Link>
            {isAuthenticated && (
              <Link 
                to="/dashboard" 
                className="text-sm font-medium transition-colors hover:text-gold-dark relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:origin-left after:scale-x-0 after:bg-gold-dark after:transition-transform hover:after:scale-x-100"
              >
                Dashboard
              </Link>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              className="rounded-full w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors"
              onClick={() => setShowSearchDialog(true)}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button className="rounded-full w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors">
              <ShoppingBag className="h-5 w-5" />
            </button>
            
            {/* Auth buttons for desktop */}
            <div className="hidden md:flex space-x-2">
              {isAuthenticated ? (
                <>
                  <Button 
                    size="sm"
                    onClick={() => navigate('/dashboard')}
                    className="bg-gradient-to-r from-gold-dark to-gold hover:opacity-90"
                  >
                    <User className="h-4 w-4 mr-1" />
                    Dashboard
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={handleSignOut}
                    className="border-gold-dark/40 text-gold-dark hover:bg-gold-light/10 hover:text-gold-dark hover:border-gold-dark"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/sign-in')}
                    className="border-gold-dark/40 text-gold-dark hover:bg-gold-light/10 hover:text-gold-dark hover:border-gold-dark"
                  >
                    <LogIn className="h-4 w-4 mr-1" />
                    Sign In
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => navigate('/sign-up')}
                    className="bg-gradient-to-r from-gold-dark to-gold hover:opacity-90"
                  >
                    <UserPlus className="h-4 w-4 mr-1" />
                    Sign Up
                  </Button>
                </>
              )}
            </div>
            
            <button className="md:hidden rounded-full w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Search Dialog */}
      <Dialog open={showSearchDialog} onOpenChange={setShowSearchDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Search Products</DialogTitle>
          </DialogHeader>
          <Command>
            <CommandInput 
              placeholder="Search for jewelry..." 
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const input = e.currentTarget.value;
                  handleSearch(input);
                }
              }}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem 
                  onSelect={() => {
                    navigate('/bracelets');
                    setShowSearchDialog(false);
                  }}
                >
                  <Search className="mr-2 h-4 w-4" />
                  <span>Bracelets</span>
                </CommandItem>
                <CommandItem 
                  onSelect={() => {
                    navigate('/rings');
                    setShowSearchDialog(false);
                  }}
                >
                  <Search className="mr-2 h-4 w-4" />
                  <span>Rings</span>
                </CommandItem>
                <CommandItem 
                  onSelect={() => {
                    navigate('/earrings');
                    setShowSearchDialog(false);
                  }}
                >
                  <Search className="mr-2 h-4 w-4" />
                  <span>Earrings</span>
                </CommandItem>
                <CommandItem 
                  onSelect={() => {
                    navigate('/');
                    setShowSearchDialog(false);
                  }}
                >
                  <Search className="mr-2 h-4 w-4" />
                  <span>Necklaces</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
