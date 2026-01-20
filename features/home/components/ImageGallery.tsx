"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// Register GSAP ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ImageGallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Generate array of image paths
  const images = Array.from({ length: 16 }, (_, i) => ({
    src: `/image/anh${i + 1}.jpg`,
    alt: `Hình ảnh lịch sử ${i + 1}`,
  }));

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Animate featured image
      if (featuredRef.current) {
        gsap.fromTo(
          featuredRef.current,
          { opacity: 0, scale: 0.9, rotationY: -15 },
          {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: featuredRef.current,
              start: "top 75%",
            },
          }
        );
      }

      // Animate carousel
      if (carouselRef.current) {
        gsap.fromTo(
          carouselRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.3,
            scrollTrigger: {
              trigger: carouselRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Animate thumbnails
      const validThumbnails = thumbnailRefs.current.filter(Boolean);
      validThumbnails.forEach((thumb, index) => {
        gsap.fromTo(
          thumb,
          { opacity: 0, y: 20, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            delay: index * 0.05,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: carouselRef.current,
              start: "top 70%",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title Section */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-block">
            <h2 className="text-6xl sm:text-7xl md:text-8xl font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent mb-4 pb-2">
              Hình Ảnh
            </h2>
            <div className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full" />
          </div>
          <p className="text-amber-200/70 text-lg mt-6 max-w-2xl mx-auto">
            Những khoảnh khắc lịch sử qua ống kính thời gian
          </p>
        </div>

        {/* Featured Image with Carousel */}
        <div className="mb-12">
          <div
            ref={featuredRef}
            className="relative aspect-[21/9] rounded-3xl overflow-hidden bg-gradient-to-br from-amber-900/30 to-amber-950/30 backdrop-blur-sm border-2 border-amber-600/40 shadow-2xl shadow-amber-900/50 group"
          >
            {/* Main carousel image */}
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="100vw"
              priority
            />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-950/40 via-transparent to-amber-950/40" />

            {/* Navigation buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-amber-600/90 hover:bg-amber-500 backdrop-blur-md rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-xl z-10"
            >
              <ChevronLeft className="w-7 h-7 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-amber-600/90 hover:bg-amber-500 backdrop-blur-md rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-xl z-10"
            >
              <ChevronRight className="w-7 h-7 text-white" />
            </button>

            {/* Image info */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-2xl font-bold text-white mb-2">
                {images[currentIndex].alt}
              </h3>
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-amber-500 to-transparent" />
                <span className="text-amber-300 text-sm">
                  {currentIndex + 1} / {images.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Carousel */}
        <div ref={carouselRef} className="relative">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 pb-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    thumbnailRefs.current[index] = el;
                  }}
                  onClick={() => {
                    setCurrentIndex(index);
                    setSelectedImage(index);
                  }}
                  className={`
                    relative flex-shrink-0 w-48 h-32 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300
                    ${
                      currentIndex === index
                        ? "ring-4 ring-amber-500 scale-105 shadow-2xl shadow-amber-500/50"
                        : "ring-2 ring-amber-700/30 hover:ring-amber-600/50 hover:scale-105 opacity-70 hover:opacity-100"
                    }
                  `}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                  {currentIndex === index && (
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-600/40 to-transparent" />
                  )}
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="text-white text-xs font-semibold bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                      #{index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicators */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {Array.from({ length: Math.ceil(images.length / 4) }).map(
              (_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all ${
                    Math.floor(currentIndex / 4) === i
                      ? "w-8 bg-amber-500"
                      : "w-1 bg-amber-700/30"
                  }`}
                />
              )
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl w-full h-full flex items-center justify-center">
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
            <button
              className="absolute top-6 right-6 w-14 h-14 bg-amber-600 hover:bg-amber-700 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 shadow-2xl"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation in lightbox */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(
                  (prev) => (prev! - 1 + images.length) % images.length
                );
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-amber-600/90 hover:bg-amber-500 backdrop-blur-md rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-xl"
            >
              <ChevronLeft className="w-7 h-7 text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) => (prev! + 1) % images.length);
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-amber-600/90 hover:bg-amber-500 backdrop-blur-md rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-xl"
            >
              <ChevronRight className="w-7 h-7 text-white" />
            </button>

            {/* Image counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-6 py-3 rounded-full">
              <span className="text-white font-semibold">
                {selectedImage + 1} / {images.length}
              </span>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default ImageGallery;
