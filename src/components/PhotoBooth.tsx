import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera, Download, RotateCcw } from 'lucide-react';
import { PhotoStrip } from './PhotoStrip';
import { toast } from 'sonner';

export const PhotoBooth = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      toast("Camera ready! Strike a pose!");
    } catch (error) {
      toast("Failed to access camera. Please allow camera permissions.");
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || photos.length >= 3) return;
    
    setIsCapturing(true);
    
    // Add countdown effect
    setTimeout(() => {
      const video = videoRef.current!;
      const canvas = canvasRef.current!;
      const context = canvas.getContext('2d')!;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      
      const photoData = canvas.toDataURL('image/jpeg', 0.8);
      setPhotos(prev => [...prev, photoData]);
      
      setIsCapturing(false);
      
      if (photos.length === 2) {
        toast("Final photo captured! Your strip is ready!");
        stopCamera();
      } else {
        toast(`Photo ${photos.length + 1} captured! ${2 - photos.length} more to go!`);
      }
    }, 1000);
  }, [photos.length, stopCamera]);

  const resetPhotos = useCallback(() => {
    setPhotos([]);
    stopCamera();
    toast("Starting fresh! Get ready for new photos!");
  }, [stopCamera]);

  const downloadPhotoStrip = useCallback(() => {
    if (photos.length === 3) {
      // This would trigger the download in PhotoStrip component
      toast("Downloading your vintage photo strip!");
    }
  }, [photos.length]);

  return (
    <div className="min-h-screen bg-gradient-vintage p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-vintage-brown mb-2 font-serif">
            Vintage PhotoBooth
          </h1>
          <p className="text-vintage-brown/70 text-lg">
            Capture memories in classic style
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Camera Section */}
          <Card className="p-6 bg-card/80 backdrop-blur border-vintage-brown/20 shadow-vintage">
            <div className="aspect-[4/3] bg-vintage-shadow/10 rounded-lg mb-4 overflow-hidden relative">
              {stream ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  {isCapturing && (
                    <div className="absolute inset-0 bg-vintage-cream/80 flex items-center justify-center">
                      <div className="text-6xl font-bold text-vintage-brown animate-pulse">
                        3
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-vintage-brown/60">
                    <Camera size={64} className="mx-auto mb-4" />
                    <p>Click "Start Camera" to begin</p>
                  </div>
                </div>
              )}
            </div>

            <canvas ref={canvasRef} className="hidden" />

            <div className="flex gap-3 justify-center">
              {!stream ? (
                <Button variant="booth" size="lg" onClick={startCamera} className="px-8">
                  <Camera className="mr-2" />
                  Start Camera
                </Button>
              ) : (
                <>
                  <Button 
                    variant="booth" 
                    size="lg" 
                    onClick={capturePhoto}
                    disabled={photos.length >= 3 || isCapturing}
                    className="px-8"
                  >
                    <Camera className="mr-2" />
                    {isCapturing ? 'Capturing...' : `Take Photo ${photos.length + 1}/3`}
                  </Button>
                  <Button variant="outline" onClick={resetPhotos}>
                    <RotateCcw className="mr-2" />
                    Reset
                  </Button>
                </>
              )}
            </div>

            {photos.length > 0 && (
              <div className="mt-4 text-center">
                <div className="flex justify-center gap-2 mb-2">
                  {[1, 2, 3].map((num) => (
                    <div
                      key={num}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        photos.length >= num ? 'bg-vintage-gold' : 'bg-vintage-brown/20'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-vintage-brown/70">
                  {photos.length}/3 photos captured
                </p>
              </div>
            )}
          </Card>

          {/* Photo Strip Section */}
          <div className="space-y-6">
            <PhotoStrip photos={photos} onDownload={downloadPhotoStrip} />
            
            {photos.length === 3 && (
              <div className="text-center">
                <Button variant="vintage" size="lg" onClick={downloadPhotoStrip} className="px-8">
                  <Download className="mr-2" />
                  Download Your Strip
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};