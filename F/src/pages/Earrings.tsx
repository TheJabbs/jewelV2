
import React, { useState, useEffect } from 'react';
import { earringCollection } from '@/lib/earring-data';
import { parsePriceToNumber, filterByPriceRange } from '@/lib/price-utils';
import PriceFilter from '@/components/PriceFilter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import ARViewer from '@/components/ARViewer';
import { JewelryItem } from '@/lib/jewelry-data';

const Earrings = () => {
  const navigate = useNavigate();
  const [filteredItems, setFilteredItems] = useState(earringCollection);
  const [selectedJewelry, setSelectedJewelry] = useState<JewelryItem | null>(null);
  
  // Find min and max prices
  const prices = earringCollection.map(item => parsePriceToNumber(item.price));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  
  const [currentMinPrice, setCurrentMinPrice] = useState(minPrice);
  const [currentMaxPrice, setCurrentMaxPrice] = useState(maxPrice);
  
  useEffect(() => {
    const filtered = filterByPriceRange(earringCollection, currentMinPrice, currentMaxPrice);
    setFilteredItems(filtered);
  }, [currentMinPrice, currentMaxPrice]);
  
  const handlePriceChange = (min: number, max: number) => {
    setCurrentMinPrice(min);
    setCurrentMaxPrice(max);
  };

  const handleViewDetails = (item: JewelryItem) => {
    setSelectedJewelry(item);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-display font-semibold text-center mb-8">Earrings Collection</h1>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar with filters */}
            <aside className="w-full md:w-1/4">
              <PriceFilter
                minPrice={minPrice}
                maxPrice={maxPrice}
                currentMin={currentMinPrice}
                currentMax={currentMaxPrice}
                onPriceChange={handlePriceChange}
              />
            </aside>
            
            {/* Product grid */}
            <div className="w-full md:w-3/4">
              {filteredItems.length === 0 ? (
                <div className="text-center p-8">
                  <p>No earrings found in the selected price range.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-square overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="object-cover w-full h-full transition-transform hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-display text-lg font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{item.material}</p>
                        <p className="font-medium mt-2">{item.price}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button 
                          className="w-full bg-gradient-to-r from-gold-dark to-gold hover:opacity-90"
                          onClick={() => handleViewDetails(item)}
                        >
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />

      {/* AR Viewer for showing the 3D model */}
      <ARViewer selectedJewelry={selectedJewelry} />
    </div>
  );
};

export default Earrings;
