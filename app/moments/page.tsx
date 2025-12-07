'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Camera } from 'lucide-react';

interface Moment {
    id: string;
    user_name: string;
    caption: string;
    file_url: string;
    file_type: string;
    created_at: string;
}

export default function MomentsPage() {
    const [moments, setMoments] = useState<Moment[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMoments = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/moments');
            setMoments(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMoments();
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Traveler Moments</h1>
                    <p className="text-lg text-gray-600">See the world through the eyes of our community.</p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
                    </div>
                ) : moments.length === 0 ? (
                    <div className="bg-white rounded-xl shadow p-12 text-center text-gray-500">
                        <Camera size={48} className="mx-auto mb-4 opacity-50" />
                        <p className="text-xl">No moments shared yet.</p>
                        <p>Stay tuned for updates!</p>
                    </div>
                ) : (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {moments.map((moment) => (
                            <div key={moment.id} className="break-inside-avoid bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                                <div className="relative">
                                    {moment.file_type === 'video' ? (
                                        <video controls className="w-full h-auto">
                                            <source src={moment.file_url} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    ) : (
                                        <img
                                            src={moment.file_url}
                                            alt={moment.caption}
                                            className="w-full h-auto object-cover"
                                        />
                                    )}
                                </div>
                                <div className="p-4">
                                    <p className="text-gray-800 font-medium mb-2">{moment.caption}</p>
                                    <div className="flex justify-between items-center text-xs text-gray-500">
                                        {/* Optional: <span className="font-bold text-teal-600">@{moment.user_name}</span> */}
                                        <span>{new Date(moment.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
