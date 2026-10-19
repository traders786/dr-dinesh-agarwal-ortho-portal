import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Image,
  Video,
  Eye,
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Play
} from "lucide-react";
import { GalleryItem } from "../types";
import defaultGallery from "../../data/gallery.json";

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>(defaultGallery as GalleryItem[]);
  const [selectedCategory, setSelectedCategory] = useState<"All" | "clinic" | "surgery" | "success">("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => {
        if (!res.ok) throw new Error("Status " + res.status);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setItems(data);
      })
      .catch(() => {
        // Keeps default gallery loaded
      });
  }, []);

  const categories = [
    { value: "All", label: "All Photos" },
    { value: "clinic", label: "Consultation & Clinic" },
    { value: "surgery", label: "Operation Theatre (Anonymized)" },
    { value: "success", label: "Patient Success Stories" }
  ];

  const filteredItems = items.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : (prev ?? 0) - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : (prev ?? 0) + 1));
  };

  // Video testimonials
  const videoTestimonials = [
    {
      title: "Patient Walk-On-Day-1 Post Disc Decompression Surgery",
      duration: "2:15 mins",
      videoId: "dQw4w9WgXcQ", // standard placeholder
      summary: "Anonymized video of a 45-year old backpain patient walking comfortably just 18 hours after microdiscectomy.",
      thumbnail: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "6-Months Review: Total Bilateral Knee Replacement Care",
      duration: "3:40 mins",
      videoId: "dQw4w9WgXcQ",
      summary: "Patient Anita Sengupta (64) demonstrating full squats and easy stair climbing after double knee replacement.",
      thumbnail: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <div className="pt-24 bg-[#F0F7FB] min-h-screen pb-20">
      {/* HEADER HERO */}
      <section className="bg-[#0A2F5A] text-white py-16 px-4 mb-16 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold">Clinical Gallery & Success</h1>
          <p className="text-gray-300 font-accent tracking-wider text-sm uppercase max-w-xl mx-auto">
            Glimpses of Momentum Speciality Clinic facilities, surgical setups, and active patient achievements
          </p>
          <div className="w-16 h-1 bg-[#E8A838] mx-auto rounded-full mt-4" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* INTERACTIVE PHOTO GALLERY */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-serif font-bold text-[#0A2F5A]">Clinical Photo Archives</h2>
            <div className="w-12 h-1 bg-[#E8A838] mx-auto rounded-full mt-2" />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2.5 justify-center max-w-xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value as any)}
                className={`text-xs px-4 py-2.5 rounded-xl font-accent transition-all ${
                  selectedCategory === cat.value
                    ? "bg-[#1A7A7A] text-white font-semibold shadow-sm"
                    : "bg-white text-gray-600 border border-gray-100 hover:bg-gray-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layoutId={`gallery-card-${item.id}`}
                whileHover={{ scale: 1.02 }}
                onClick={() => setLightboxIndex(index)}
                className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm cursor-pointer group relative h-72"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white" />

                {/* Overlaid details visible on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[9px] bg-[#1A7A7A] text-white font-accent uppercase tracking-widest font-bold px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <h4 className="font-serif font-bold text-base mt-1.5 leading-snug">{item.title}</h4>
                  <p className="text-[11px] text-gray-300 line-clamp-2 mt-1">{item.description}</p>
                </div>

                <div className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PATIENT VIDEO STORIES */}
        <section className="space-y-10 pt-10 border-t border-gray-100">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-serif font-bold text-[#0A2F5A]">Clinical Recovery Videos</h2>
            <p className="text-gray-500 text-xs sm:text-sm max-w-xl mx-auto">
              Real functional progression showing knee flexibility and spinal mobility after expert correction.
            </p>
            <div className="w-12 h-1 bg-[#E8A838] mx-auto rounded-full mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {videoTestimonials.map((vid, idx) => (
              <div key={idx} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between">
                {/* Simulated YouTube video frame with cover */}
                <div className="relative h-60 bg-black flex items-center justify-center group cursor-pointer"
                  onClick={() => alert("Launching premium diagnostic rehabilitation review video in active media frame.")}
                >
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute w-14 h-14 rounded-full bg-[#1A7A7A] text-white flex items-center justify-center shadow-lg group-hover:bg-[#E8A838] group-hover:text-black transition-all">
                    <Play className="w-6 h-6 fill-current" />
                  </div>
                  <span className="absolute bottom-4 right-4 bg-black/75 px-2.5 py-1 rounded text-[10px] font-mono text-white">
                    {vid.duration}
                  </span>
                </div>

                <div className="p-6 space-y-2">
                  <h4 className="font-serif font-bold text-base text-[#0A2F5A]">{vid.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{vid.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* LIGHTBOX SLIDER */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 bg-[#1A1A2E]/95 backdrop-blur-sm flex items-center justify-center p-4"
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 text-white hover:bg-black transition-colors focus:outline-none z-50"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Previous controls */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors focus:outline-none z-10"
              aria-label="Previous gallery image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Slider view image */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full flex flex-col items-center bg-black/50 p-4 rounded-3xl"
            >
              <div className="h-[55vh] w-full flex items-center justify-center">
                <img
                  src={filteredItems[lightboxIndex].image}
                  alt={filteredItems[lightboxIndex].title}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full rounded-2xl object-contain shadow-2xl"
                />
              </div>

              {/* Title descriptions */}
              <div className="w-full text-center mt-4 text-white space-y-1.5 max-w-xl">
                <span className="text-[10px] uppercase font-accent font-bold tracking-widest text-[#E8A838]">
                  {filteredItems[lightboxIndex].category}
                </span>
                <h3 className="font-serif text-lg font-bold">
                  {filteredItems[lightboxIndex].title}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {filteredItems[lightboxIndex].description}
                </p>
              </div>
            </motion.div>

            {/* Next controls */}
            <button
              onClick={handleNextImage}
              className="absolute right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors focus:outline-none z-10"
              aria-label="Next gallery image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
