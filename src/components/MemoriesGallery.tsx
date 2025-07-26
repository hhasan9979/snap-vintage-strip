import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { PhotoStrip } from '@/components/PhotoStrip';
import { memoriesData } from '@/data/memories';
import { Memory } from '@/types/memory';

export const MemoriesGallery = () => {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  if (selectedMemory) {
    return (
      <div className="min-h-screen p-4">
        <button
          onClick={() => setSelectedMemory(null)}
          className="mb-6 text-vintage-brown hover:text-vintage-gold transition-colors flex items-center gap-2"
        >
          ← Back to Memories
        </button>
        <div className="flex justify-center">
          <PhotoStrip
            photos={selectedMemory.photos}
            date={selectedMemory.date}
            title={selectedMemory.title}
            quote={selectedMemory.quote}
            onDownload={() => {}}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-vintage-brown font-serif mb-4">
            Vintage Photo Memories
          </h1>
          <p className="text-vintage-brown/70 text-lg">
            Classic photo booth strips from days gone by
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {memoriesData.map((memory) => (
            <Card
              key={memory.id}
              className="p-6 bg-card/80 backdrop-blur border-vintage-brown/20 shadow-vintage cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-vintage-strong"
              onClick={() => setSelectedMemory(memory)}
            >
              <div className="aspect-square bg-vintage-cream border-2 border-vintage-brown/30 mb-4 overflow-hidden relative">
                <img
                  src={memory.photos[0]}
                  alt={memory.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-vintage-sepia/20 mix-blend-multiply" />
                <div className="absolute top-2 right-2">
                  <div className="w-8 h-8 bg-vintage-brown/80 rounded-full flex items-center justify-center">
                    <span className="text-vintage-cream text-sm">📷</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-bold text-vintage-brown font-serif mb-2">
                  {memory.title}
                </h3>
                <p className="text-vintage-brown/70 text-sm mb-3">
                  {memory.description}
                </p>
                <p className="font-dancing text-vintage-gold text-lg font-semibold">
                  {memory.date}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};