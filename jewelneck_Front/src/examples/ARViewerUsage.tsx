
import React, { useState } from 'react';
import ARViewer from '../components/ARViewer';
import { JewelryItem, jewelryCollection } from '../lib/jewelry-data';
import '../styles/ar-viewer.css'; // Import the styles

const ARViewerExample = () => {
  const [selectedJewelry, setSelectedJewelry] = useState<JewelryItem | null>(null);

  // Function to handle selecting a jewelry item
  const handleSelectJewelry = (item: JewelryItem) => {
    setSelectedJewelry(item);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Jewelry Collection</h1>
      
      {/* Display jewelry items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jewelryCollection.map((item) => (
          <div 
            key={item.id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleSelectJewelry(item)}
          >
            <div className="h-60 overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="text-gray-600 mb-2">{item.material}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold">{item.price}</span>
                <button 
                  className="px-4 py-2 bg-gradient-to-r from-[#b4942d] to-[#d4af37] text-white rounded-full"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the parent div's onClick
                    handleSelectJewelry(item);
                  }}
                >
                  View in 3D
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* AR Viewer modal component */}
      <ARViewer selectedJewelry={selectedJewelry} />
    </div>
  );
};

export default ARViewerExample;
