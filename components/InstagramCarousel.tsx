'use client';

import { useState, useEffect, useRef } from 'react';
import { Instagram, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';

interface CarouselItem {
    id: string;
    image_url: string;
}

export default function InstagramCarousel() {
    const [images, setImages] = useState<CarouselItem[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const INSTAGRAM_URL = "https://www.instagram.com/entea_yathrakal?igsh=MWoybnN2aGJyMzEzcg==";

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const res = await api.get('/carousel');
            if (res.data.length > 0) {
                setImages(res.data);
                setActiveIndex(Math.floor(res.data.length / 2));
            } else {
                // Determine mock images if API returns empty to avoid broken UI
                // Or just show empty initially. Let's use mock if empty for demonstration?
                // No, user wants Admin control. Only use API data.
            }
        } catch (error) {
            console.error("Error fetching carousel:", error);
        } finally {
            setLoading(false);
        }
    };

    // Auto-scroll
    useEffect(() => {
        if (images.length === 0 || isPaused) return;

        intervalRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % images.length);
        }, 3000); // 3 seconds

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [images.length, isPaused]);

    const handleNext = () => {
        if (images.length === 0) return;
        setActiveIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        if (images.length === 0) return;
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const getImageStyles = (index: number) => {
        const offset = index - activeIndex;
        // Handle wrap-around visually if needed, but for simple indices we just match ID
        // Actually, this logic breaks if we don't handle circular math for "neighbors" properly
        // Let's use the circular distance.

        let circularOffset = offset;
        const count = images.length;
        if (count > 0) {
            // Find shortest path in circle
            if (circularOffset > count / 2) circularOffset -= count;
            if (circularOffset < -count / 2) circularOffset += count;
        }

        // Active Card
        if (circularOffset === 0) {
            return { x: 0, scale: 1.2, zIndex: 10, opacity: 1 };
        }
        else if (Math.abs(circularOffset) === 1) {
            return { x: circularOffset * 140, scale: 0.9, zIndex: 5, opacity: 0.7 };
        }
        else if (Math.abs(circularOffset) === 2) {
            return { x: circularOffset * 100, scale: 0.7, zIndex: 2, opacity: 0.4 };
        }
        else {
            return { x: circularOffset * 50, scale: 0, zIndex: 0, opacity: 0 };
        }
    };

    // Only show API images, no mocks
    const activeData = images;
    const finalCount = activeData.length;

    // Need to update activeIndex if switching from empty to fetched
    useEffect(() => {
        if (activeData.length > 0) {
            // Only center if not already set adequately? or just rely on state.
        }
    }, [activeData.length]);

    // Redefine styles closure/logic to use activeData
    const getStyles = (index: number) => {
        let circularOffset = index - activeIndex;
        if (finalCount > 0) {
            if (circularOffset > finalCount / 2) circularOffset -= finalCount;
            if (circularOffset < -finalCount / 2) circularOffset += finalCount;
        }

        if (circularOffset === 0) return { x: 0, scale: 1.2, zIndex: 10, opacity: 1, display: 'block' };
        if (Math.abs(circularOffset) === 1) return { x: circularOffset * 140, scale: 0.9, zIndex: 5, opacity: 0.7, display: 'block' };
        if (Math.abs(circularOffset) === 2) return { x: circularOffset * 100, scale: 0.7, zIndex: 2, opacity: 0.4, display: 'block' };
        return { x: 0, scale: 0, zIndex: 0, opacity: 0, display: 'none' };
    };

    return (
        <div
            className="w-full max-w-5xl mx-auto mt-8 relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="flex items-center gap-2 mb-12 text-white/90 justify-center">
                <Instagram size={20} />
                <span className="font-bold tracking-wide text-sm uppercase">Follow Our Adventures</span>
            </div>

            <div className="relative h-[300px] flex items-center justify-center perspective-container">
                <AnimatePresence>
                    {activeData.map((item, index) => {
                        const styles = getStyles(index);
                        return (
                            <motion.a
                                key={item.id || index}
                                href={INSTAGRAM_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute rounded-xl shadow-2xl overflow-hidden origin-center bg-black"
                                style={{
                                    width: '220px',
                                    height: '280px',
                                }}
                                animate={styles}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                whileHover={{ borderColor: "#f97316", scale: styles.scale * 1.05 }}
                            >
                                <img
                                    src={item.image_url}
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
                    className="p-3 rounded-full backdrop-blur-sm transition-colors pointer-events-auto shadow-lg border border-white/10 bg-black/40 hover:bg-orange-500 text-white"
                >
                    <ChevronLeft size={32} />
                </button>
                <button
                    onClick={handleNext}
                    className="p-3 rounded-full backdrop-blur-sm transition-colors pointer-events-auto shadow-lg border border-white/10 bg-black/40 hover:bg-orange-500 text-white"
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
