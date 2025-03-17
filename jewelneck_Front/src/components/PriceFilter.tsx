
import React from 'react';
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  currentMin: number;
  currentMax: number;
  onPriceChange: (min: number, max: number) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  minPrice,
  maxPrice,
  currentMin,
  currentMax,
  onPriceChange
}) => {
  const handleMinChange = (values: number[]) => {
    const newMin = values[0];
    if (newMin <= currentMax) {
      onPriceChange(newMin, currentMax);
    }
  };

  const handleMaxChange = (values: number[]) => {
    const newMax = values[0];
    if (newMax >= currentMin) {
      onPriceChange(currentMin, newMax);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h3 className="text-lg font-medium mb-4">Price Filter</h3>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="min-price">Min Price: ${currentMin}</Label>
          </div>
          <Slider
            id="min-price"
            min={minPrice}
            max={maxPrice}
            step={50}
            defaultValue={[currentMin]}
            value={[currentMin]}
            onValueChange={handleMinChange}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="max-price">Max Price: ${currentMax}</Label>
          </div>
          <Slider
            id="max-price"
            min={minPrice}
            max={maxPrice}
            step={50}
            defaultValue={[currentMax]}
            value={[currentMax]}
            onValueChange={handleMaxChange}
          />
        </div>
        
        <div className="flex justify-between items-center pt-2 text-sm">
          <span className="text-muted-foreground">${currentMin}</span>
          <span className="text-muted-foreground">${currentMax}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
