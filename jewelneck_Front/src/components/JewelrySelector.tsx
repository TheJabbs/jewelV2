
import React from 'react';
import { JewelryItem } from '@/lib/jewelry-data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check } from 'lucide-react';

interface JewelrySelectorProps {
  jewelryItems: JewelryItem[];
  selectedJewelry: JewelryItem | null;
  onSelectJewelry: (jewelry: JewelryItem) => void;
}

const JewelrySelector: React.FC<JewelrySelectorProps> = ({ 
  jewelryItems, 
  selectedJewelry,
  onSelectJewelry 
}) => {
  // Filter to only show necklaces for the try-on experience
  const necklaces = jewelryItems.filter(item => 
    !item.id.includes('bracelet') && 
    !item.id.includes('ring') &&
    !item.id.includes('earring') &&
    !item.id.includes('stud')
  );

  return (
    <ScrollArea className="h-[60vh]">
      <div className="space-y-4 pr-4">
        {necklaces.map((jewelry) => (
          <div 
            key={jewelry.id}
            className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors ${
              selectedJewelry?.id === jewelry.id 
                ? 'bg-primary/10 border border-primary/20' 
                : 'bg-gray-50 hover:bg-gray-100 border border-transparent'
            }`}
            onClick={() => onSelectJewelry(jewelry)}
          >
            <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
              <img 
                src={jewelry.image} 
                alt={jewelry.name} 
                className="w-4/5 h-4/5 object-contain mix-blend-multiply"
              />
              {selectedJewelry?.id === jewelry.id && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <span className="flex items-center justify-center bg-primary text-white rounded-full h-6 w-6">
                    <Check className="h-4 w-4" />
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm mb-1 truncate">{jewelry.name}</h4>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{jewelry.price}</span>
                <span>{jewelry.material.split(',')[0]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default JewelrySelector;
