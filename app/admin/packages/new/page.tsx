'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

export default function AddPackagePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<FileList | null>(null);
    const [previews, setPreviews] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        duration_days: '',
        duration_nights: '',
        itinerary: '',
        inclusions: '',
        exclusions: '',
        is_featured: false,
        map_url: ''
    });

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            if (e.target.files.length > 10) {
                alert("You can only upload up to 10 images.");
                e.target.value = ""; // Clear input
                setImages(null);
                setPreviews([]);
                return;
            }

            setImages(e.target.files);

            // Generate Previews
            const newPreviews = Array.from(e.target.files).map(file => URL.createObjectURL(file));
            setPreviews(newPreviews);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('price', formData.price);
            data.append('duration_days', formData.duration_days);
            data.append('duration_nights', formData.duration_nights);
            console.error('Failed to create package', error);
            alert('Failed to create package. Check console for details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin/dashboard" className="text-gray-600 hover:text-teal-600 transition">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Add New Package</h1>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Package Title</label>
                                <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-black" placeholder="e.g. Kerala Paradise" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                                <input type="number" name="price" required value={formData.price} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-black" placeholder="25000" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Days</label>
                                <input type="number" name="duration_days" required value={formData.duration_days} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-black" />
                            </div>
                            <div>
                                <input type="number" name="duration_nights" required value={formData.duration_nights} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-black" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps Link (Optional)</label>
                            <input type="url" name="map_url" value={formData.map_url} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-black" placeholder="https://goo.gl/maps/..." />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                            <textarea name="description" required value={formData.description} onChange={handleChange} rows={3} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-black" placeholder="Brief overview..." />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Images (Max 10)</label>
                            <input type="file" multiple accept="image/*" onChange={handleFileChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-black" />

                            {previews.length > 0 && (
                                <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
                                    {previews.map((src, index) => (
                                        <div key={index} className="relative aspect-video rounded-lg overflow-hidden shadow-sm border">
                                            <img src={src} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Itinerary (One per line)</label>
                                <textarea name="itinerary" value={formData.itinerary} onChange={handleChange} rows={6} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-black" placeholder="Day 1: Arrival..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Inclusions (One per line)</label>
                                <textarea name="inclusions" value={formData.inclusions} onChange={handleChange} rows={6} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-black" placeholder="Breakfast..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Exclusions (One per line)</label>
                                <textarea name="exclusions" value={formData.exclusions} onChange={handleChange} rows={6} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-black" placeholder="Airfare..." />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input type="checkbox" name="is_featured" id="is_featured" checked={formData.is_featured} onChange={handleChange} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                            <label htmlFor="is_featured" className="text-sm font-medium text-gray-700">Feature this package on Homepage</label>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-teal-600 text-white py-3 rounded-lg font-bold hover:bg-teal-700 transition flex justify-center items-center gap-2 disabled:bg-gray-400"
                            >
                                <Save size={20} />
                                {loading ? 'Saving...' : 'Create Package'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
