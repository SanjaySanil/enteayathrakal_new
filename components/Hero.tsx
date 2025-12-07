'use client';

import { Search } from 'lucide-react';

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

                {/* Search Bar */}
                <div className="bg-white p-4 rounded-lg shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row gap-4 text-gray-800">
                    <div className="flex-1">
                        <label className="block text-xs font-bold text-gray-500 uppercase">Destination</label>
                        <input
                            type="text"
                            placeholder="Where do you want to go?"
                            className="w-full mt-1 border-b-2 border-transparent focus:border-teal-500 outline-none"
                        />
                    </div>
                    <div className="w-px bg-gray-200 hidden md:block"></div>
                    <div className="flex-1">
                        <label className="block text-xs font-bold text-gray-500 uppercase">Date</label>
                        <input
                            type="date"
                            className="w-full mt-1 border-b-2 border-transparent focus:border-teal-500 outline-none bg-transparent"
                        />
                    </div>
                    <div className="w-px bg-gray-200 hidden md:block"></div>
                    <div className="flex-1">
                        <label className="block text-xs font-bold text-gray-500 uppercase">Guests</label>
                        <input
                            type="number"
                            placeholder="2 Guests"
                            className="w-full mt-1 border-b-2 border-transparent focus:border-teal-500 outline-none"
                        />
                    </div>
                    <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-md font-bold hover:shadow-lg transform transition hover:-translate-y-1 flex items-center justify-center gap-2">
                        SEARCH <Search size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
