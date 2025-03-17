
import React, { useState } from 'react';
import { JewelryItem } from '@/lib/jewelry-data';
import { jewelryCollection } from '@/lib/jewelry-data';
import CameraView from '@/components/CameraView';
import JewelrySelector from '@/components/JewelrySelector';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import { toast } from 'sonner';
import { Camera, Shield } from 'lucide-react';

const TryOn = () => {
  const [selectedJewelry, setSelectedJewelry] = useState<JewelryItem | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const handleJewelrySelect = (jewelry: JewelryItem) => {
    setSelectedJewelry(jewelry);
    toast.success(`${jewelry.name} selected for virtual try-on`);
  };

  const handleCameraReady = (isReady: boolean) => {
    setIsCameraReady(isReady);
    if (!isReady) {
      // Don't show error toast here since CameraView already handles this
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto py-8 px-4 pt-24">
        <h1 className="text-3xl font-display font-bold text-center mb-6">Virtual Try-On Experience</h1>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          See how our stunning necklaces look on you in real-time. Select a piece from our collection and allow camera access to begin your virtual try-on experience.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 rounded-xl overflow-hidden bg-white shadow-md h-[500px]">
            <CameraView 
              selectedJewelry={selectedJewelry} 
              onCameraReady={handleCameraReady} 
            />
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-md h-full">
              <h2 className="text-xl font-semibold mb-4">Select a Necklace</h2>
              
              {!isCameraReady && (
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 text-sm">
                  <p>Camera access is required for the virtual try-on experience. Please click "Enable Camera" to begin.</p>
                </div>
              )}
              
              <Separator className="my-4" />
              
              <JewelrySelector 
                jewelryItems={jewelryCollection} 
                selectedJewelry={selectedJewelry} 
                onSelectJewelry={handleJewelrySelect} 
              />
            </div>
          </div>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-semibold">How to Use the Virtual Try-On</h2>
              <Shield className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex items-center gap-2 mb-2 text-sm text-blue-600 bg-blue-50 rounded-lg p-2">
              <Camera className="h-4 w-4" />
              <span>Your camera feed is processed locally and is never sent to our servers.</span>
            </div>
            
            <ol className="list-decimal ml-5 space-y-3 text-muted-foreground">
              <li>Click the <strong>Enable Camera</strong> button when you're ready</li>
              <li>Allow camera access when prompted by your browser</li>
              <li>Choose a necklace from the selection panel</li>
              <li>The necklace will appear overlaid on your neck in the camera view</li>
              <li>Use the refresh button to restart the camera if needed</li>
              <li>Use the stop button to turn off the camera when you're done</li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TryOn;
