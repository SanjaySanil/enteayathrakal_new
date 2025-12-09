'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, MapPin, Loader, ExternalLink, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';

export default function AdminPlaces() {
    const [places, setPlaces] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPlaces();
    }, []);

    const fetchPlaces = async () => {
        try {
            const res = await api.get('/places');
            setPlaces(res.data);
        } catch (error) {
            console.error("Error fetching places:", error);
            alert("Failed to load places");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this place?")) return;

        try {
            await api.delete(`/places/${id}`);
            setPlaces(places.filter(p => p.id !== id));
        } catch (error) {
            console.error("Error deleting place:", error);
            alert("Failed to delete place");
        }
    };

    if (loading) return <div className="flex justify-center p-10"><Loader className="animate-spin text-teal-600" /></div>;

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Manage Places</h1>
                <Link
                    href="/admin/places/new"
                    className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
                >
                    <Plus size={20} /> Add New Place
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {places.map((place) => {
                    // Logic to handle both old schema (media_url) and new schema (media_urls array)
                    const coverUrl = place.media_urls && place.media_urls.length > 0 ? place.media_urls[0] : place.media_url;
                    const coverType = place.media_types && place.media_types.length > 0 ? place.media_types[0] : place.media_type;
                    const count = place.media_urls ? place.media_urls.length : (place.media_url ? 1 : 0);

                    return (
                        <div key={place.id} className="bg-white rounded-xl shadow-md overflow-hidden relative group">
                            {/* Image/Video Preview */}
                            <div className="h-48 bg-gray-200 relative">
                                {coverType === 'video' ? (
                                    <video
                                        src={coverUrl}
                                        className="w-full h-full object-cover"
                                        muted
                                        loop
                                    />
                                ) : (
                                    <img
                                        src={coverUrl || 'https://via.placeholder.com/300'}
                                        alt={place.name}
                                        className="w-full h-full object-cover"
                                    />
                                )}

                                <div className="absolute top-2 right-2 flex gap-1">
                                    <span className="bg-white/90 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
                                        {coverType}
                                    </span>
                                    {count > 1 && (
                                        <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                                            <ImageIcon size={10} /> +{count - 1}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="p-4">
                                <h3 className="font-bold text-lg text-gray-800 mb-1">{place.name}</h3>
                                <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                                    <MapPin size={16} />
                                    <span className="truncate">{place.location || 'No location'}</span>
                                </div>

                                {place.map_url && (
                                    <a
                                        href={place.map_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 text-xs flex items-center gap-1 hover:underline mb-4"
                                    >
                                        <ExternalLink size={12} /> View Map
                                    </a>
                                )}

                                <button
                                    onClick={() => handleDelete(place.id)}
                                    className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition"
                                >
                                    <Trash2 size={18} /> Delete
                                </button>
                            </div>
                        </div>
                    );
                })}

                {places.length === 0 && (
                    <div className="col-span-full text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500">No places added yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
