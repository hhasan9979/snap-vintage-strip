import { useRef, useState } from 'react';
import { Card } from '@/components/ui/card';

interface PhotoStripProps {
  photos: string[];
  date?: string;
  title?: string;
  onDownload: () => void;
}

export const PhotoStrip = ({ photos, date, title, onDownload }: PhotoStripProps) => {
  const stripRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleDownload = () => {
    if (!stripRef.current || photos.length !== 3) return;
    
    // Create a temporary canvas to render the photo strip
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    
    // Set canvas dimensions for a classic photo strip (2:8 ratio)
    const stripWidth = 400;
    const stripHeight = 1600;
    canvas.width = stripWidth;
    canvas.height = stripHeight;
    
    // Fill background with vintage cream
    ctx.fillStyle = 'hsl(45, 25%, 96%)';
    ctx.fillRect(0, 0, stripWidth, stripHeight);
    
    // Add vintage border
    ctx.strokeStyle = 'hsl(25, 60%, 25%)';
    ctx.lineWidth = 8;
    ctx.strokeRect(0, 0, stripWidth, stripHeight);
    
    // Draw header text
    ctx.fillStyle = 'hsl(25, 60%, 25%)';
    ctx.font = 'bold 24px serif';
    ctx.textAlign = 'center';
    ctx.fillText('VINTAGE PHOTOBOOTH', stripWidth / 2, 50);
    
    // Draw photos with vintage frames
    const photoHeight = 450;
    const photoWidth = 350;
    const startX = (stripWidth - photoWidth) / 2;
    let currentY = 100;
    
    const loadPromises = photos.map((photoSrc, index) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          // Add photo background/frame
          ctx.fillStyle = 'hsl(35, 15%, 85%)';
          ctx.fillRect(startX - 10, currentY - 10, photoWidth + 20, photoHeight + 20);
          
          // Add inner shadow effect
          ctx.strokeStyle = 'hsl(25, 30%, 15%)';
          ctx.lineWidth = 2;
          ctx.strokeRect(startX - 5, currentY - 5, photoWidth + 10, photoHeight + 10);
          
          // Draw the photo
          ctx.drawImage(img, startX, currentY, photoWidth, photoHeight);
          
          // Add vintage overlay effect
          ctx.fillStyle = 'rgba(139, 109, 75, 0.1)';
          ctx.fillRect(startX, currentY, photoWidth, photoHeight);
          
          currentY += photoHeight + 30;
          resolve();
        };
        img.src = photoSrc;
      });
    });
    
    Promise.all(loadPromises).then(() => {
      // Add footer text (handwritten date)
      ctx.font = '20px Dancing Script, cursive';
      ctx.fillStyle = 'hsl(45, 90%, 45%)';
      ctx.fillText(date || 'Summer \'85', stripWidth / 2, stripHeight - 30);
      
      // Download the image
      const link = document.createElement('a');
      link.download = `vintage-photobooth-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
      
      onDownload();
    });
  };

  return (
    <div className="flex justify-center">
      <div 
        className="relative cursor-pointer"
        style={{ perspective: '1000px' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={`relative transition-transform duration-700 transform-style-preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{ 
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* Front of strip */}
          <div 
            ref={stripRef}
            className="bg-vintage-cream border border-vintage-brown mx-auto relative overflow-hidden backface-hidden"
            style={{ 
              width: '224px', 
              height: '624px',
              backfaceVisibility: 'hidden'
            }}
          >
            {/* Photos */}
            <div className="flex flex-col p-3 gap-4">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className="w-full h-36 bg-vintage-brown/10 relative overflow-hidden"
                >
                  {photos[index] ? (
                    <img
                      src={photos[index]}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-vintage-brown/40">
                      <div className="text-center">
                        <div className="w-8 h-8 rounded-full bg-vintage-brown/20 mx-auto mb-1 flex items-center justify-center">
                          <span className="text-xs font-bold">{index + 1}</span>
                        </div>
                        <p className="text-xs">Waiting...</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Title overlapping last photo */}
            <div className="absolute bottom-20 left-0 right-0 text-center bg-vintage-cream/90 py-1">
              <h3 className="text-lg font-bold text-vintage-brown font-playfair">
                {title}
              </h3>
            </div>

            {/* Footer with handwritten date */}
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <p className="text-sm text-vintage-brown font-dancing font-semibold">
                {date || 'Summer \'85'}
              </p>
            </div>
          </div>

          {/* Back of strip */}
          <div 
            className="absolute inset-0 bg-white border border-black mx-auto backface-hidden relative overflow-hidden"
            style={{ 
              width: '224px', 
              height: '624px',
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <div className="flex items-center justify-center h-full p-4">
              <div className="text-center">
                <p className="text-sm text-black font-dancing leading-relaxed">
                  These moments will<br/>
                  live forever in<br/>
                  our hearts ♡<br/><br/>
                  Click to flip back
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};