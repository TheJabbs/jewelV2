
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import JewelryCollection from '@/components/JewelryCollection';
import ARViewer from '@/components/ARViewer';
import Footer from '@/components/Footer';
import { JewelryItem } from '@/lib/jewelry-data';
import { toast } from 'sonner';

const Index = () => {
  const [selectedJewelry, setSelectedJewelry] = useState<JewelryItem | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      setScrollProgress(scrollTop / scrollHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectJewelry = (item: JewelryItem) => {
    setSelectedJewelry(item);
    toast.success(`Now viewing: ${item.name}`, {
      description: "Experience this piece in our AR viewer",
      duration: 3000,
    });
  };

  return (
    <div className="relative">
      {/* Progress bar */}
      <div 
        className="fixed top-0 left-0 h-1 z-50 bg-gradient-to-r from-gold-light to-gold-dark transition-all duration-150"
        style={{ width: `${scrollProgress * 100}%` }}
      ></div>
      
      <Navbar />
      
      <main>
        <Hero />
        <JewelryCollection 
          onSelectJewelry={handleSelectJewelry} 
          selectedJewelryId={selectedJewelry?.id || null} 
        />
        
        {/* Additional content sections could be added here */}
        
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block mb-2 rounded-full px-3 py-1 text-xs font-medium border border-gold-light/30 text-gold-dark bg-gold-light/10">
                  Virtual Experience
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-semibold">Experience Luxury From Home</h2>
                <p className="text-muted-foreground">
                  Our innovative AR technology lets you try on our exquisite jewelry pieces virtually. 
                  See how each design complements your style before making a purchase.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold-dark mr-2 mt-0.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Select any jewelry piece to view it in AR</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold-dark mr-2 mt-0.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Interact with the 3D model to view from all angles</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold-dark mr-2 mt-0.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>See details and craftsmanship in high resolution</span>
                  </li>
                </ul>
                <button className="rounded-full px-6 py-3 border border-gray-200 hover:border-gray-300 transition-colors duration-300 font-medium mt-4">
                  Learn More About AR
                </button>
              </div>
              
              <div className="relative">
                <div className="aspect-square max-w-md mx-auto rounded-2xl overflow-hidden shadow-glossy">
                  <img 
                    src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2069&auto=format&fit=crop" 
                    alt="AR Jewelry Experience" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-6">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                      </div>
                      <h3 className="text-white font-display text-xl mb-1">AR Tutorial</h3>
                      <p className="text-white/80 text-sm">Watch how to use our virtual try-on feature</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-gold-light/10 rounded-full blur-2xl -z-10"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-pearl-light/20 rounded-full blur-2xl -z-10"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <ARViewer selectedJewelry={selectedJewelry} />
      
      <Footer />
    </div>
  );
};

export default Index;
