'use client';

import { MapPin, ExternalLink, Image as ImageIcon } from 'lucide-react';
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

interface PlaceCardProps {
    place: Place;
}

export default function PlaceCard({ place }: PlaceCardProps) {
    const coverUrl = place.media_urls && place.media_urls.length > 0 ? place.media_urls[0] : place.media_url;
    const coverType = place.media_types && place.media_types.length > 0 ? place.media_types[0] : place.media_type;
    const count = place.media_urls ? place.media_urls.length : (place.media_url ? 1 : 0);

    return (
        <Link
            href={`/places/${place.id}`}
            className="block relative group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer h-full"
        >
            {/* Media Container */}
            <div className="relative h-72 w-full overflow-hidden">
                {coverType === 'video' ? (
                    <video
                        src={coverUrl}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                ) : (
                    <img
                        src={coverUrl || 'https://via.placeholder.com/400x300'}
                        alt={place.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {count > 1 && (
                    <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 backdrop-blur-md">
                        <ImageIcon size={12} /> +{count - 1}
                    </div>
                )}

                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-1 text-teal-300 text-xs font-bold uppercase mb-1">
                        <MapPin size={14} />
                        <span>{place.location || 'Kerala'}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{place.name}</h3>
                    <p className="text-gray-300 text-sm line-clamp-2 mb-4">
                        {place.description}
                    </p>

                    {place.map_url && (
                        <div
                            className="inline-block" // Wrapper to handle click event
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                window.open(place.map_url, '_blank');
                            }}
                        >
                            <span className="inline-flex items-center gap-2 text-white text-sm font-bold hover:text-orange-400 transition-colors z-20 relative">
                                View Map <ExternalLink size={14} />
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
