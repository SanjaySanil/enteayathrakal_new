'use client';

import { useState } from 'react';

interface ImageGalleryProps {
    images: string[];
    title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(images[0] || '');

    if (!images || images.length === 0) {
        return <div className="h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">No Images</div>;
    }

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden p-2">
            <div className="h-[400px] rounded-lg overflow-hidden mb-2 relative group">
                <img
                    src={selectedImage}
                    alt={title}
                    className="w-full h-full object-cover transition duration-300"
                />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img: string, idx: number) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`flex-shrink-0 w-24 h-24 rounded-md overflow-hidden border-2 transition ${selectedImage === img ? 'border-teal-600 ring-2 ring-teal-100' : 'border-transparent opacity-70 hover:opacity-100'
                            }`}
                    >
                        <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
}
