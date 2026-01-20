import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import imageDescriptions from '../data/imageDescriptions.json';

interface ImageRevealProps {
  imageName: string;
  onClose: () => void;
}

export default function ImageReveal({ imageName, onClose }: ImageRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const imageData = imageDescriptions[imageName as keyof typeof imageDescriptions];

  useEffect(() => {
    // Trigger animation after mount
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  if (!imageData) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn p-4 overflow-y-auto">
      <div
        className={`relative max-w-xl w-full my-8 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
      >
        {/* Close button */}
        {/* <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 p-2 bg-red-600 hover:bg-red-700 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <X className="w-5 h-5 text-white" />
        </button> */}

        {/* Main content card */}
        <div className="bg-gradient-to-br from-amber-950/95 via-orange-950/95 to-red-950/95 rounded-3xl border-2 border-amber-500/50 shadow-2xl overflow-hidden backdrop-blur-sm">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>

          <div className="relative p-4">
            {/* Header with sparkles */}
            <div className="flex items-center justify-center gap-2 mb-3 pr-8">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-200 to-orange-200 text-center">
                Chúc mừng! Bạn đã hoàn thành!
              </h2>
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
            </div>

            {/* Image container */}
            <div className="relative mb-3 rounded-lg overflow-hidden border-2 border-amber-500/50 shadow-lg">
              <img
                src={`/image/${imageName}`}
                alt={imageData.title}
                className="w-full h-auto object-cover animate-fadeIn"
                onError={(e) => {
                  console.error('Image failed to load:', `/image/${imageName}`);
                  e.currentTarget.src = '/placeholder.jpg'; // fallback
                }}
              />
              {/* Gradient overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="space-y-2">
              {/* Title */}
              <div className="bg-gradient-to-r from-amber-900/60 to-orange-900/60 p-3 rounded-lg border-l-4 border-amber-400">
                <h3 className="text-lg md:text-xl font-bold text-amber-100 leading-relaxed">
                  {imageData.title}
                </h3>
              </div>

              {/* Description */}
              <div className="bg-gradient-to-br from-orange-900/40 to-red-900/40 p-3 rounded-lg border border-orange-500/30">
                <p className="text-sm text-amber-50 leading-relaxed">
                  {imageData.description}
                </p>
              </div>

              {/* Continue button */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-500 hover:via-orange-500 hover:to-red-500 text-white font-bold text-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Tiếp tục
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
