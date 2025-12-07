'use client';

import { useEffect, useState } from 'react';
import { Camera } from 'lucide-react';
import Link from 'next/link';

interface Moment {
    id: string;
    file_url: string;
    file_type: string;
    caption: string;
    user_name: string;
}

export default function MomentsFeed() {
    const [moments, setMoments] = useState<Moment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMoments() {
            try {
                const res = await fetch('http://localhost:5000/api/moments');
                if (res.ok) {
                    const data = await res.json();
                    setMoments(data.slice(0, 6)); // Show max 6 on homepage
                }
            } catch (error) {
                console.error("Failed to fetch moments:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchMoments();
    }, []);

    if (loading) return <div className="py-20 text-center">Loading moments...</div>;

    if (moments.length === 0) return null; // Don't show section if empty

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Moments from Our Travelers</h2>
                    <p className="text-gray-600">Real stories, real memories.</p>
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {moments.map((moment) => (
                        <div key={moment.id} className="break-inside-avoid bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                            {moment.file_type === 'video' ? (
                                <video controls className="w-full h-auto">
                                    <source src={moment.file_url} type="video/mp4" />
                                </video>
                            ) : (
                                <img
                                    src={moment.file_url}
                                    alt={moment.caption || 'Travel Moment'}
                                    className="w-full h-auto object-cover"
                                />
                            )}
                            {moment.caption && (
                                <div className="p-4 bg-white/95">
                                    <p className="text-gray-800 text-sm line-clamp-2">{moment.caption}</p>
                                    <p className="text-xs text-teal-600 font-bold mt-1">@{moment.user_name}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/moments"
                        className="inline-block bg-teal-600 text-white px-8 py-3 rounded-full font-bold shadow-md hover:bg-teal-700 transition"
                    >
                        View Gallery
                    </Link>
                </div>
            </div>
        </section>
    );
}
