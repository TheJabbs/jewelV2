
import React, { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, PresentationControls } from '@react-three/drei';
import { JewelryItem } from '@/lib/jewelry-data';

interface NeckModelProps {
  jewelryItem: JewelryItem;
}

// The actual 3D jewelry model component with error handling
const JewelryModel = ({ url }: { url: string }) => {
  const [hasError, setHasError] = useState(false);
  
  // Use try-catch to handle model loading errors
  try {
    const { scene } = useGLTF(url);
    
    // If we made it here, the model loaded successfully
    return (
      <primitive 
        object={scene} 
        scale={1.5} 
        position={[0, 0.5, 0]} 
        rotation={[0, 0, 0]}
      />
    );
  } catch (error) {
    console.error('Error loading model:', error);
    
    // Return a fallback jewelry piece if the model fails to load
    return (
      <mesh position={[0, 0.5, 0]} castShadow>
        <torusGeometry args={[0.5, 0.2, 16, 32]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
      </mesh>
    );
  }
};

// Simple neck mannequin model
const NeckMannequin = () => {
  return (
    <group position={[0, -1, 0]}>
      {/* Simple cylindrical neck representation */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.4, 2, 32]} />
        <meshStandardMaterial color="#f0d6c9" />
      </mesh>
      
      {/* Shoulders representation */}
      <mesh position={[0, -1.2, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[1.5, 1.5, 0.4, 32]} />
        <meshStandardMaterial color="#f0d6c9" />
      </mesh>
    </group>
  );
};

// Fallback jewelry component when no model is available
const FallbackJewelry = () => {
  return (
    <mesh position={[0, 0.5, 0]} castShadow>
      <torusGeometry args={[0.5, 0.2, 16, 32]} />
      <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
    </mesh>
  );
};

const NeckModel: React.FC<NeckModelProps> = ({ jewelryItem }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  
  useEffect(() => {
    // Reset loading state when jewelry item changes
    setIsLoading(true);
    setLoadError(false);
    
    // Simulate loading time for better UX
    const timer = setTimeout(() => setIsLoading(false), 1500);
    
    return () => clearTimeout(timer);
  }, [jewelryItem]);
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      {isLoading && (
        <div className="absolute flex flex-col items-center justify-center z-10">
          <div className="h-12 w-12 rounded-full border-4 border-gold-light border-t-gold-dark animate-spin mb-4"></div>
          <p className="text-sm font-medium text-gray-600">Loading 3D model...</p>
        </div>
      )}
      
      {loadError && !isLoading && (
        <div className="absolute flex flex-col items-center justify-center z-10 bg-white/80 p-6 rounded-lg">
          <div className="text-red-500 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
          <h3 className="text-lg font-medium mb-2">Error Loading Model</h3>
          <p className="text-sm text-gray-600 text-center">We couldn't load the 3D model for this jewelry piece.</p>
        </div>
      )}
      
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
        shadows
        onCreated={() => setTimeout(() => setIsLoading(false), 1000)}
      >
        <color attach="background" args={["#f8f8f8"]} />
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <PresentationControls
          global
          zoom={0.8}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <group position={[0, 0, 0]}>
            <NeckMannequin />
            
            {/* Load the jewelry model with error handling */}
            <Suspense fallback={<FallbackJewelry />}>
              {jewelryItem.modelUrl ? (
                <JewelryModel url={jewelryItem.modelUrl} />
              ) : (
                <FallbackJewelry />
              )}
            </Suspense>
          </group>
        </PresentationControls>
        
        <Environment preset="city" />
        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
      
      <div className="absolute bottom-4 left-4 right-4 flex justify-center">
        <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium shadow-sm">
          Drag to rotate • Pinch to zoom
        </div>
      </div>
    </div>
  );
};

export default NeckModel;
