"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Camera, CameraOff, RotateCw, Download, Eye } from 'lucide-react';
import { Product } from '@/lib/types';
import Image from 'next/image';

interface VirtualTryOnProps {
  product: Product;
  children?: React.ReactNode;
}

export default function VirtualTryOn({ product, children }: VirtualTryOnProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [glassesPosition, setGlassesPosition] = useState({ x: 50, y: 40 });
  const [glassesScale, setGlassesScale] = useState(1.0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraOn(true);
      }
    } catch (err) {
      setError('Unable to access camera. Please ensure camera permissions are granted.');
      console.error('Camera access error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
  };

  const takeSnapshot = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame
    ctx.drawImage(video, 0, 0);

    // Draw glasses overlay
    const glassesImg = new window.Image();
    glassesImg.onload = () => {
      const glassesWidth = canvas.width * 0.3 * glassesScale;
      const glassesHeight = (glassesImg.height / glassesImg.width) * glassesWidth;
      const x = (canvas.width * glassesPosition.x / 100) - (glassesWidth / 2);
      const y = (canvas.height * glassesPosition.y / 100) - (glassesHeight / 2);

      ctx.drawImage(glassesImg, x, y, glassesWidth, glassesHeight);

      // Download the image
      const link = document.createElement('a');
      link.download = `lenskart-tryon-${product.name}.png`;
      link.href = canvas.toDataURL();
      link.click();
    };
    glassesImg.src = product.images[0];
  };

  const adjustGlassesPosition = (direction: 'up' | 'down' | 'left' | 'right') => {
    setGlassesPosition(prev => {
      const step = 2;
      switch (direction) {
        case 'up':
          return { ...prev, y: Math.max(0, prev.y - step) };
        case 'down':
          return { ...prev, y: Math.min(100, prev.y + step) };
        case 'left':
          return { ...prev, x: Math.max(0, prev.x - step) };
        case 'right':
          return { ...prev, x: Math.min(100, prev.x + step) };
        default:
          return prev;
      }
    });
  };

  const adjustGlassesSize = (bigger: boolean) => {
    setGlassesScale(prev => {
      const step = 0.1;
      const newScale = bigger ? prev + step : prev - step;
      return Math.max(0.5, Math.min(2.0, newScale));
    });
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      stopCamera();
      setError(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" className="flex items-center">
            <Eye className="h-4 w-4 mr-2" />
            Virtual Try-On
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-4xl w-full h-[80vh]">
        <DialogHeader>
          <DialogTitle>Virtual Try-On - {product.name}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col lg:flex-row gap-6 h-full">
          {/* Camera Section */}
          <div className="flex-1">
            <div className="relative bg-gray-900 rounded-lg overflow-hidden h-full min-h-[400px]">
              {!isCameraOn ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <Camera className="h-16 w-16 mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">Start Virtual Try-On</h3>
                  <p className="text-gray-300 text-center mb-6 max-w-sm">
                    Click the button below to start your camera and try on glasses virtually
                  </p>
                  <Button
                    onClick={startCamera}
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? 'Starting Camera...' : 'Start Camera'}
                  </Button>
                  {error && (
                    <p className="text-red-400 text-sm mt-4 text-center">{error}</p>
                  )}
                </div>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />

                  {/* Glasses Overlay */}
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      left: `${glassesPosition.x}%`,
                      top: `${glassesPosition.y}%`,
                      transform: `translate(-50%, -50%) scale(${glassesScale})`,
                      width: '30%',
                      maxWidth: '200px',
                    }}
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={200}
                      height={100}
                      className="w-full h-auto opacity-80 mix-blend-multiply"
                    />
                  </div>

                  {/* Camera Controls */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    <Button size="sm" onClick={takeSnapshot} className="bg-green-600 hover:bg-green-700">
                      <Download className="h-4 w-4 mr-2" />
                      Save Photo
                    </Button>
                    <Button size="sm" onClick={stopCamera} variant="destructive">
                      <CameraOff className="h-4 w-4 mr-2" />
                      Stop Camera
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Controls Section */}
          <div className="lg:w-80 space-y-6">
            {/* Product Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={60}
                  height={40}
                  className="rounded-md"
                />
                <div>
                  <h4 className="font-semibold">{product.name}</h4>
                  <p className="text-sm text-gray-600">{product.brand}</p>
                  <p className="text-lg font-bold text-blue-600">₹{product.price}</p>
                </div>
              </div>
            </div>

            {/* Adjustment Controls */}
            {isCameraOn && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">Adjust Position</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div></div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => adjustGlassesPosition('up')}
                    >
                      ↑
                    </Button>
                    <div></div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => adjustGlassesPosition('left')}
                    >
                      ←
                    </Button>
                    <Button size="sm" variant="outline" disabled>
                      <RotateCw className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => adjustGlassesPosition('right')}
                    >
                      →
                    </Button>
                    <div></div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => adjustGlassesPosition('down')}
                    >
                      ↓
                    </Button>
                    <div></div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Adjust Size</h4>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => adjustGlassesSize(false)}
                      className="flex-1"
                    >
                      Smaller
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => adjustGlassesSize(true)}
                      className="flex-1"
                    >
                      Bigger
                    </Button>
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  <p>• Position the glasses over your eyes</p>
                  <p>• Adjust size to fit your face</p>
                  <p>• Take a snapshot to save your try-on</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hidden canvas for snapshots */}
        <canvas ref={canvasRef} className="hidden" />
      </DialogContent>
    </Dialog>
  );
}
