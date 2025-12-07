'use client';

import { useState } from 'react';
import { Instagram, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InstagramCarousel() {
    // Mock images
    const images = [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80',
        'https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?w=500&q=80',
        'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=500&q=80',
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500&q=80',
        'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=500&q=80',
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500&q=80',
    ];

    const INSTAGRAM_URL = "https://www.instagram.com/entea_yathrakal?igsh=MWoybnN2aGJyMzEzcg==";

    const [activeIndex, setActiveIndex] = useState(Math.floor(images.length / 2));

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const getImageStyles = (index: number) => {
        // Calculate diff with circular wrapping considered visually? 
        // No, simple list logic is better for Coverflow unless infinite loop is strictly needed.
        // Let's stick to simple "Distance from Active" logic for 3D effect.

        const offset = index - activeIndex;

        // Active Card
        if (offset === 0) {
            return {
                x: 0,
                scale: 1.2,
                zIndex: 10,
                opacity: 1,
            };
        }
        // Immediate Neighbors
        else if (Math.abs(offset) === 1) {
            return {
                x: offset * 140, // Distance from center
                scale: 0.9,
                zIndex: 5,
                opacity: 0.7,
            };
        }
        // Far Neighbors
        else if (Math.abs(offset) === 2) {
            return {
                x: offset * 100, // Tighter overlap
                scale: 0.7,
                zIndex: 2,
                opacity: 0.4,
            };
        }
        // Hidden
        else {
            return {
                x: offset * 50,
                scale: 0,
                zIndex: 0,
                opacity: 0,
            };
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto mt-8 relative">
            <div className="flex items-center gap-2 mb-12 text-white/90 justify-center">
                <Instagram size={20} />
                <span className="font-bold tracking-wide text-sm uppercase">Follow Our Adventures</span>
            </div>

            <div className="relative h-[300px] flex items-center justify-center perspective-container">
                <AnimatePresence>
                    {images.map((src, index) => {
                        const styles = getImageStyles(index);

                        // Optimization: don't render if completely hidden
                        if (styles.opacity === 0) return null;

                        return (
                            <motion.a
                                key={index}
                                href={INSTAGRAM_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute rounded-xl shadow-2xl overflow-hidden origin-center"
                                style={{
                                    width: '220px',
                                    height: '280px',
                                    backgroundColor: '#000',
                                }}
                                initial={false}
                                animate={styles} // Animate to new styles
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                whileHover={{ borderColor: "#f97316", scale: styles.scale * 1.05 }}
                            >
                                <img
                                    src={src}
                                    alt={`Moment ${index}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                            </motion.a>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 md:px-20 pointer-events-none z-20">
                <button
                    onClick={handlePrev}
                    disabled={activeIndex === 0}
                    className={`p-3 rounded-full backdrop-blur-sm transition-colors pointer-events-auto shadow-lg border border-white/10 ${activeIndex === 0 ? 'bg-gray-500/30 opacity-50 cursor-not-allowed' : 'bg-black/40 hover:bg-orange-500 text-white'}`}
                >
                    <ChevronLeft size={32} />
                </button>
                <button
                    onClick={handleNext}
                    disabled={activeIndex === images.length - 1}
                    className={`p-3 rounded-full backdrop-blur-sm transition-colors pointer-events-auto shadow-lg border border-white/10 ${activeIndex === images.length - 1 ? 'bg-gray-500/30 opacity-50 cursor-not-allowed' : 'bg-black/40 hover:bg-orange-500 text-white'}`}
                >
                    <ChevronRight size={32} />
                </button>
            </div>

            <style jsx>{`
                .perspective-container {
                    perspective: 1000px;
                }
            `}</style>
        </div>
    );
}
