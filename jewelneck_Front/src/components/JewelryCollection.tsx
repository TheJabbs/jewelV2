
import React from 'react';
import { jewelryCollection, JewelryItem } from '@/lib/jewelry-data';

interface JewelryCollectionProps {
  onSelectJewelry: (item: JewelryItem) => void;
  selectedJewelryId: string | null;
}

const JewelryCollection: React.FC<JewelryCollectionProps> = ({ onSelectJewelry, selectedJewelryId }) => {
  return (
    <section id="collection" className="py-24 bg-pearl-light/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">Our Collection</h2>
          <p className="text-muted-foreground">
            Explore our exquisite range of necklaces and pendants. Click on any design to experience it in our AR viewer.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jewelryCollection.map((item) => (
            <div 
              key={item.id}
              className={`group relative card-hover rounded-xl overflow-hidden cursor-pointer transition-all duration-500 ${
                selectedJewelryId === item.id ? 'ring-2 ring-gold ring-offset-2' : ''
              }`}
              onClick={() => onSelectJewelry(item)}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-display text-xl mb-2">{item.name}</h3>
                <p className="text-white/80 text-sm mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{item.material}</p>
                <p className="font-medium">{item.price}</p>
              </div>
              
              <div className="absolute top-4 right-4">
                <div className={`h-3 w-3 rounded-full ${
                  selectedJewelryId === item.id ? 'bg-gold animate-pulse' : 'bg-white/80'
                }`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JewelryCollection;
