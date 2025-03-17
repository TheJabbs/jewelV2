
import React, { useRef, useEffect, useState } from 'react';
import { JewelryItem } from '@/lib/jewelry-data';
import { Camera, RefreshCw, StopCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface CameraViewProps {
  selectedJewelry: JewelryItem | null;
  onCameraReady: (isReady: boolean) => void;
}

const CameraView: React.FC<CameraViewProps> = ({ selectedJewelry, onCameraReady }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const jewelryImageRef = useRef<HTMLImageElement | null>(null);
  const animationRef = useRef<number | null>(null);

  // Function to start the camera
  const startCamera = async () => {
    try {
      setCameraError(null);
      
      // Check if browser supports getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError("Your browser doesn't support camera access");
        onCameraReady(false);
        return;
      }
      
      // Request camera permissions with lower resolution first to increase compatibility
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 }
        },
        audio: false
      });
      
      // Set stream to video element
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current.play().then(() => {
              setStream(mediaStream);
              setIsActive(true);
              onCameraReady(true);
              toast.success("Camera activated successfully");
            }).catch(err => {
              console.error("Error playing video:", err);
              setCameraError("Could not start video stream");
              onCameraReady(false);
            });
          }
        };
      } else {
        setCameraError("Video element not found");
        onCameraReady(false);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setIsActive(false);
      
      // More specific error messages based on the error
      if (error instanceof DOMException) {
        if (error.name === 'NotAllowedError') {
          setCameraError("Camera access denied. Please allow camera access in your browser settings");
        } else if (error.name === 'NotFoundError') {
          setCameraError("No camera found on your device");
        } else if (error.name === 'NotReadableError') {
          setCameraError("Camera is already in use by another application");
        } else {
          setCameraError(`Camera error: ${error.message}`);
        }
      } else {
        setCameraError("Could not access camera");
      }
      
      onCameraReady(false);
      toast.error("Could not access camera", {
        description: "Please check your camera permissions and try again"
      });
    }
  };

  // Function to stop the camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setStream(null);
      setIsActive(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      toast.info("Camera has been turned off");
      onCameraReady(false);
    }
  };

  // Preload jewelry image when a jewelry item is selected
  useEffect(() => {
    if (selectedJewelry?.image) {
      const img = new Image();
      img.src = selectedJewelry.image;
      img.onload = () => {
        jewelryImageRef.current = img;
        setImageLoaded(true);
      };
    } else {
      setImageLoaded(false);
      jewelryImageRef.current = null;
    }
  }, [selectedJewelry]);

  // Start camera when component mounts, stop when it unmounts
  useEffect(() => {
    // Don't auto-start camera to avoid permission issues
    // User will click the Enable Camera button instead
    
    return () => {
      stopCamera();
    };
  }, []);

  // Drawing function for AR overlay
  const drawVideoAndJewelry = () => {
    if (!videoRef.current || !canvasRef.current || !videoRef.current.readyState || videoRef.current.readyState < 2) {
      // If video is not ready yet, try again on next frame
      animationRef.current = requestAnimationFrame(drawVideoAndJewelry);
      return;
    }
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // If a jewelry item is selected and the image is loaded, draw it on the canvas
    if (selectedJewelry && imageLoaded && jewelryImageRef.current) {
      // Use face detection heuristics - place jewelry at approximate neck position
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      
      // Estimate face area (typically in the upper middle portion of the webcam)
      const faceWidth = canvasWidth * 0.25; // Face width estimation
      const faceHeight = faceWidth * 1.3; // Face is typically taller than wide
      const faceX = (canvasWidth - faceWidth) / 2; // Center face horizontally
      const faceY = canvasHeight * 0.15; // Face is typically in the upper portion
      
      // Calculate neck position based on estimated face position
      const neckY = faceY + faceHeight * 0.9; // Neck is below the face
      
      // Scale jewelry image to an appropriate size relative to estimated face
      const jewelryWidth = faceWidth * 1.5; // Jewelry should be wider than face for necklaces
      const aspectRatio = jewelryImageRef.current.height / jewelryImageRef.current.width;
      const jewelryHeight = jewelryWidth * aspectRatio;
      
      // Center jewelry horizontally and position it at the neck area
      const jewelryX = (canvasWidth - jewelryWidth) / 2;
      const jewelryY = neckY - (jewelryHeight * 0.2); // Adjust vertical position

      // Apply mix-blend-mode effect with globalCompositeOperation to help remove white backgrounds
      ctx.globalCompositeOperation = 'multiply';
      
      // Draw the jewelry image at calculated position
      ctx.drawImage(
        jewelryImageRef.current,
        jewelryX,
        jewelryY,
        jewelryWidth,
        jewelryHeight
      );
      
      // Reset composite operation for future drawings
      ctx.globalCompositeOperation = 'source-over';
    }
    
    // Continue the animation loop
    animationRef.current = requestAnimationFrame(drawVideoAndJewelry);
  };

  // Start or update the drawing loop when video and jewelry status changes
  useEffect(() => {
    if (isActive && videoRef.current) {
      // Start animation when video is playing
      if (videoRef.current.readyState >= 2) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        animationRef.current = requestAnimationFrame(drawVideoAndJewelry);
      } else {
        // Wait for video to be ready
        videoRef.current.onloadeddata = () => {
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
          }
          animationRef.current = requestAnimationFrame(drawVideoAndJewelry);
        };
      }
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isActive, selectedJewelry, imageLoaded]);

  // Handle video element becoming ready
  const handleVideoLoaded = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(drawVideoAndJewelry);
  };

  // Restart camera if needed
  const handleRestartCamera = () => {
    stopCamera();
    setTimeout(() => {
      startCamera();
    }, 500);
  };

  return (
    <div className="relative w-full h-full">
      {/* Video element (hidden, used as source) */}
      <video 
        ref={videoRef} 
        className="hidden" 
        autoPlay 
        playsInline 
        muted 
        onLoadedData={handleVideoLoaded}
      />
      
      {/* Canvas for rendering video + jewelry */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full rounded-xl bg-gray-100"
      />
      
      {/* Camera instructions and controls */}
      {isActive && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <div className="bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
            {selectedJewelry 
              ? `Currently trying on: ${selectedJewelry.name}` 
              : "Select a necklace to try on"}
          </div>
        </div>
      )}
      
      {/* Camera controls */}
      {isActive && (
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
            onClick={handleRestartCamera}
            title="Restart camera"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-red-500/80 backdrop-blur-sm hover:bg-red-600/90 text-white"
            onClick={stopCamera}
            title="Stop camera"
          >
            <StopCircle className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {/* Camera not active state */}
      {!isActive && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 rounded-xl">
          <Camera className="h-12 w-12 text-gray-400 mb-3" />
          <h3 className="text-lg font-medium mb-2">Camera Access Required</h3>
          {cameraError ? (
            <p className="text-sm text-red-500 mb-4 text-center max-w-xs px-4">
              {cameraError}
            </p>
          ) : (
            <p className="text-sm text-gray-500 mb-4 text-center max-w-xs px-4">
              To use virtual try-on, please allow camera access
            </p>
          )}
          <Button onClick={startCamera}>
            Enable Camera
          </Button>
        </div>
      )}
    </div>
  );
};

export default CameraView;
