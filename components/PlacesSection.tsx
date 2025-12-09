'use client';

import { useEffect, useState } from 'react';
import { Loader, ArrowRight } from 'lucide-react';
import api from '@/lib/api';
import PlaceCard from './PlaceCard';
import Link from 'next/link';

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

export default function PlacesSection() {
    const [places, setPlaces] = useState<Place[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const res = await api.get('/places');
                // Slice to first 4 for display
                setPlaces(res.data.slice(0, 4));
            } catch (error) {
                console.error("Error fetching places:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaces();
    }, []);

    if (loading) {
        return (
            <div className="py-20 flex justify-center">
                <Loader className="animate-spin text-teal-600" />
            </div>
        );
    }

    if (places.length === 0) return null; // Don't show empty section

    return (
        <section id="destinations" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-teal-600 font-bold uppercase tracking-wider text-sm">Destinations</span>
                        <h2 className="text-4xl font-bold text-gray-900 mt-2">Must Visit Places</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {places.map((place) => (
                        <PlaceCard key={place.id} place={place} />
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <Link
                        href="/places"
                        className="inline-flex items-center gap-2 bg-teal-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-teal-700 hover:scale-105 transition-all text-lg"
                    >
                        Explore All Destinations <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
