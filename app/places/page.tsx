'use client';

import { useEffect, useState } from 'react';
import PlaceCard from '@/components/PlaceCard';
import api from '@/lib/api';
import { Loader, Search, MapPin, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface Place {
    id: string;
    name: string;
    description: string;
    location: string;
    media_url?: string;
    media_type?: 'image' | 'video';
    media_urls?: string[];
    media_types?: ('image' | 'video')[];
    map_url: string;
}

export default function PlacesPage() {
    const [places, setPlaces] = useState<Place[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const [locations, setLocations] = useState<string[]>([]);

    useEffect(() => {
        fetchPlaces();
    }, []);

    const fetchPlaces = async () => {
        try {
            const res = await api.get('/places');
            setPlaces(res.data);

            // Extract unique locations
            const uniqueLocations = Array.from(new Set(res.data.map((p: Place) => p.location))).filter(Boolean) as string[];
            setLocations(uniqueLocations);
        } catch (error) {
            console.error("Error fetching places:", error);
        } finally {
            setLoading(false);
        }
    };

    // Filter Logic
    const filteredPlaces = places.filter(place => {
        const matchesName = place.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLocation = selectedLocation ? place.location === selectedLocation : true;
        return matchesName && matchesLocation;
    });

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header & Search */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-teal-900 mb-4">
                        Explore Destinations
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
                        Discover hidden gems, waterfalls, and scenic spots in Kerala.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto relative mb-8">
                        <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search places by name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    {/* Location Filters */}
                    {locations.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-2">
                            <button
                                onClick={() => setSelectedLocation(null)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedLocation === null
                                        ? 'bg-teal-600 text-white shadow-md'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                All Locations
                            </button>
                            {locations.map(loc => (
                                <button
                                    key={loc}
                                    onClick={() => setSelectedLocation(loc === selectedLocation ? null : loc)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${selectedLocation === loc
                                            ? 'bg-teal-600 text-white shadow-md'
                                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                        }`}
                                >
                                    <MapPin size={12} /> {loc}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader className="animate-spin text-teal-600" size={40} />
                    </div>
                ) : filteredPlaces.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredPlaces.map((place) => (
                            <motion.div
                                key={place.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <PlaceCard place={place} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No places found matching your criteria.</p>
                        <button
                            onClick={() => { setSearchQuery(''); setSelectedLocation(null); }}
                            className="mt-4 text-teal-600 font-bold hover:underline"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
