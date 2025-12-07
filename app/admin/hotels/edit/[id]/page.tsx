'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, X, Upload } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';

export default function EditHotelPage() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Data States
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        description: '',
        price_per_night: '',
        amenities: '',
        rating: '',
        is_featured: false,
        map_url: '',
    });

    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [newFiles, setNewFiles] = useState<FileList | null>(null);
    const [newPreviews, setNewPreviews] = useState<string[]>([]);

    useEffect(() => {
        if (id) fetchHotel();
    }, [id]);

    const fetchHotel = async () => {
        try {
            const res = await api.get(`/hotels/${id}`);
            const hotel = res.data;
            setFormData({
                name: hotel.name,
                location: hotel.location,
                description: hotel.description,
                price_per_night: hotel.price_per_night,
                amenities: Array.isArray(hotel.amenities) ? hotel.amenities.join(', ') : hotel.amenities,
                rating: hotel.rating,
                is_featured: hotel.is_featured,
                map_url: hotel.map_url || '',
            });
            setExistingImages(hotel.images || []);
        } catch (error) {
            console.error("Fetch error:", error);
            alert("Failed to fetch hotel details");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const totalImages = existingImages.length + e.target.files.length;
            if (totalImages > 10) {
                alert(`You have ${existingImages.length} existing images. You can add at most ${10 - existingImages.length} more.`);
                e.target.value = "";
                return;
            }
            setNewFiles(e.target.files);
            const previews = Array.from(e.target.files).map(file => URL.createObjectURL(file));
            setNewPreviews(previews);
        }
    };

    const removeExistingImage = (indexToRemove: number) => {
        setExistingImages(prev => prev.filter((_, i) => i !== indexToRemove));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const data = new FormData();

            // Basic fields
            data.append('name', formData.name);
            data.append('location', formData.location);
            data.append('description', formData.description);
            data.append('price_per_night', formData.price_per_night);
            data.append('rating', formData.rating);
            data.append('is_featured', String(formData.is_featured));
            data.append('map_url', formData.map_url);

            // Amenities (JSON)
            const amenitiesArray = formData.amenities.split(',').map((item: string) => item.trim()).filter((i: string) => i);
            data.append('amenities', JSON.stringify(amenitiesArray));

            // Image Handling
            // 1. Existing
            data.append('existing_images', JSON.stringify(existingImages));

            // 2. New
            if (newFiles) {
                for (let i = 0; i < newFiles.length; i++) {
                    data.append('images', newFiles[i]);
                }
            }

            await api.put(`/hotels/${id}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            alert('Hotel Updated Successfully!');
            router.push('/admin/dashboard');
        } catch (error) {
            console.error('Failed to update hotel', error);
            alert('Failed to update hotel.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-xl font-bold text-gray-600 flex items-center gap-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
                    Loading Hotel Details...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin/dashboard" className="text-gray-600 hover:text-teal-600 transition">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Edit Hotel</h1>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name</label>
                                <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-black" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <input type="text" name="location" required value={formData.location} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-black" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price Per Night (₹)</label>
                                <input type="number" name="price_per_night" required value={formData.price_per_night} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-black" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                                <input type="number" step="0.1" max="5" name="rating" required value={formData.rating} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-black" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps Link (Optional)</label>
                            <input type="url" name="map_url" value={formData.map_url} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-black" placeholder="https://goo.gl/maps/..." />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea name="description" required value={formData.description} onChange={handleChange} rows={4} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-black" />
                        </div>

                        {/* Image Management */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Manage Images</label>

                            {/* Existing Images */}
                            {existingImages.length > 0 && (
                                <div className="mb-4">
                                    <p className="text-xs text-gray-500 mb-2">Current Images (Click X to remove):</p>
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                        {existingImages.map((img, i) => (
                                            <div key={i} className="relative group">
                                                <img src={img} className="h-24 w-full object-cover rounded shadow" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeExistingImage(i)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600 transition"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* New Uploads */}
                            <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                                <label className="flex flex-col items-center cursor-pointer">
                                    <Upload size={24} className="text-gray-400 mb-2" />
                                    <span className="text-sm text-gray-500">Add New Images (Max 10 total)</span>
                                    <input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
                                </label>
                            </div>

                            {newPreviews.length > 0 && (
                                <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
                                    {newPreviews.map((src, index) => (
                                        <div key={index} className="relative aspect-video rounded-lg overflow-hidden shadow-sm border">
                                            <img src={src} alt="New Preview" className="w-full h-full object-cover" />
                                            <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded-bl">New</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Amenities (Comma separated)</label>
                            <input type="text" name="amenities" value={formData.amenities} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-black" />
                        </div>

                        <div className="flex items-center gap-2">
                            <input type="checkbox" name="is_featured" id="is_featured_hotel" checked={formData.is_featured} onChange={handleChange} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                            <label htmlFor="is_featured_hotel" className="text-sm font-medium text-gray-700">Feature this hotel on Homepage</label>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-teal-600 text-white py-3 rounded-lg font-bold hover:bg-teal-700 transition flex justify-center items-center gap-2 disabled:bg-gray-400"
                            >
                                <Save size={20} />
                                {submitting ? 'Saving...' : 'Update Hotel'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
