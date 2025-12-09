'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';

interface MediaItem {
    url: string;
    type: 'image' | 'video';
}

interface PlaceGalleryProps {
    media: MediaItem[];
    title: string;
}

export default function PlaceGallery({ media, title }: PlaceGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    if (!media || media.length === 0) {
        return <div className="h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">No Media</div>;
    }

    const selectedMedia = media[selectedIndex];

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden p-2">
            {/* Main Display */}
            <div className="h-[400px] rounded-lg overflow-hidden mb-2 relative group bg-black">
                {selectedMedia.type === 'video' ? (
                    <video
                        src={selectedMedia.url}
                        className="w-full h-full object-contain"
                        controls
                        autoPlay
                        loop
                    />
                ) : (
                    <img
                        src={selectedMedia.url}
                        alt={title}
                        className="w-full h-full object-cover transition duration-300"
                    />
                )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {media.map((item, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedIndex(idx)}
                        className={`flex-shrink-0 w-24 h-24 rounded-md overflow-hidden border-2 transition relative ${selectedIndex === idx
                                ? 'border-teal-600 ring-2 ring-teal-100'
                                : 'border-transparent opacity-70 hover:opacity-100'
                            }`}
                    >
                        {item.type === 'video' ? (
                            <div className="w-full h-full bg-gray-900 flex items-center justify-center relative">
                                <video src={item.url} className="w-full h-full object-cover opacity-50" />
                                <Play size={24} className="text-white absolute active-indicator" />
                            </div>
                        ) : (
                            <img src={item.url} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
