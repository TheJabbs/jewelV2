
import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full hero-gradient overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-light/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pearl-light/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-3xl text-center space-y-8 animate-fade-in">
          <div className="inline-block mb-3 rounded-full px-3 py-1 text-xs font-medium border border-gold-light/30 text-gold-dark bg-gold-light/10">
            The Virtual Collection
          </div>
          
          <h1 className="text-4xl md:text-6xl xl:text-7xl font-display font-semibold tracking-tight leading-tight">
            Exquisite Jewelry,{" "}
            <span className="text-gradient bg-gradient-to-r from-gold-light via-gold-dark to-gold-light bg-300% animate-shimmer">
              Virtual Experience
            </span>
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Experience our premium necklace collection with augmented reality. Try on each piece virtually before making your decision.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <button className="button-shine rounded-full px-8 py-4 bg-gradient-to-r from-gold-dark to-gold transition-all duration-300 text-white font-medium shadow-md hover:shadow-xl transform hover:-translate-y-0.5">
              Explore Collection
            </button>
            <button className="rounded-full px-8 py-4 border border-gray-200 hover:border-gray-300 transition-colors duration-300 font-medium">
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </section>
  );
};

export default Hero;
