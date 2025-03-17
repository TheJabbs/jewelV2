
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-pearl-light/30">
      <div className="text-center max-w-md mx-auto px-4 py-12">
        <div className="inline-block mb-3 rounded-full px-3 py-1 text-xs font-medium border border-gold-light/30 text-gold-dark bg-gold-light/10">
          404 Error
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          We couldn't find the page you were looking for. Perhaps you'd like to explore our jewelry collection instead?
        </p>
        <a 
          href="/" 
          className="button-shine inline-block rounded-full px-8 py-4 bg-gradient-to-r from-gold-dark to-gold transition-all duration-300 text-white font-medium shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
