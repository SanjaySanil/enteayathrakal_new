'use client';

import { Search } from 'lucide-react';
import InstagramCarousel from './InstagramCarousel';

export default function Hero() {
    return (
        <div className="relative h-[80vh] flex items-center justify-center bg-teal-900 text-white overflow-hidden">
            {/* Background Image/Video Placeholder */}
            <div className="absolute inset-0 bg-black/40 z-10" />
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop')" }}
            ></div>

            <div className="relative z-20 text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
                    Explore the Unseen Beauty of the World
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md">
                    Curated tour packages for your dream vocation.
                </p>

                {/* Instagram Carousel */}
                <InstagramCarousel />
            </div>
        </div>
    );
}

