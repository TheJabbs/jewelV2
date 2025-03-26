
import React, { useEffect, useState } from 'react';
import { JewelryItem } from '@/lib/jewelry-data';
import NeckModel from './NeckModel';
import { toast } from 'sonner';

interface ARViewerProps {
  selectedJewelry: JewelryItem | null;
}

const ARViewer: React.FC<ARViewerProps> = ({ selectedJewelry }) => {
  const [isActive, setIsActive] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  
  useEffect(() => {
    if (selectedJewelry) {
      setIsActive(true);
      setLoadingError(false);
      
      // When a new jewelry is selected, reset the error state
      setLoadingError(false);
    }
  }, [selectedJewelry]);

  const handleClose = () => {
    setIsActive(false);
    // Delay unmounting to allow for animation
    setTimeout(() => {
      setLoadingError(false);
    }, 500);
  };

  if (!selectedJewelry) {
    return null;
  }

  return (
    <section id="ar-viewer" className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm flex items-center justify-center transition-opacity duration-500 ${
      isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      <div className="relative bg-white rounded-xl overflow-hidden w-full max-w-5xl max-h-[90vh] flex flex-col md:flex-row shadow-2xl animate-scale-in">
        <button 
          className="absolute top-4 right-4 z-50 h-10 w-10 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors"
          onClick={handleClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        
        <div className="flex-1 bg-gradient-to-br from-pearl-light to-white p-4 md:p-8 flex items-center justify-center">
          <div className="aspect-square w-full max-h-full relative rounded-lg overflow-hidden border border-gray-100 shadow-inner">
            <div className="absolute inset-0 flex items-center justify-center">
              {loadingError ? (
                <div className="text-center p-8">
                  <div className="mb-4 text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Error Loading Model</h3>
                  <p className="text-gray-600">We couldn't load the 3D model for this jewelry piece. Please try another item.</p>
                </div>
              ) : (
                <NeckModel jewelryItem={selectedJewelry} />
              )}
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-96 p-6 md:p-8 flex flex-col">
          <div className="mb-8">
            <div className="text-sm font-medium text-gold-dark mb-2">Virtual Try-On</div>
            <h2 className="text-2xl font-display font-semibold mb-2">{selectedJewelry.name}</h2>
            <p className="text-muted-foreground mb-4">{selectedJewelry.description}</p>
            <div className="flex items-center justify-between">
              <div className="font-medium text-xl">{selectedJewelry.price}</div>
              <div className="text-sm text-muted-foreground">{selectedJewelry.material}</div>
            </div>
          </div>
          
          <div className="space-y-3 mb-8">
            <h3 className="font-medium">Virtual Experience</h3>
            <p className="text-sm text-muted-foreground">
              This is a visualization of how this piece would look when worn. Interact with the 3D model to see it from all angles.
            </p>
          </div>
          
          <div className="mt-auto space-y-4">
            <button 
              className="button-shine w-full rounded-full px-6 py-3 bg-gradient-to-r from-gold-dark to-gold transition-all duration-300 text-white font-medium shadow-md hover:shadow-xl"
              onClick={() => toast.success(`Added ${selectedJewelry.name} to cart`, {
                description: "Your item has been added to your shopping cart"
              })}
            >
              Add to Cart
            </button>
            <button 
              className="w-full rounded-full px-6 py-3 border border-gray-200 hover:border-gray-300 transition-colors duration-300 font-medium"
              onClick={() => toast.success(`Saved ${selectedJewelry.name} to wishlist`, {
                description: "Your item has been saved to your wishlist"
              })}
            >
              Save to Wishlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ARViewer;
