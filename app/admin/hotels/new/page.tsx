'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

export default function AddHotelPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<FileList | null>(null);
    const [previews, setPreviews] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        description: '',
        price_per_night: '',
        amenities: '', // comma separated or new line
        rating: '4.5',
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
            data.append('name', formData.name);
            data.append('location', formData.location);
            data.append('description', formData.description);
            data.append('price_per_night', formData.price_per_night);
            data.append('rating', formData.rating);
            data.append('is_featured', String(formData.is_featured));
            data.append('map_url', formData.map_url);

            // Amenities as JSON
            data.append('amenities', JSON.stringify(formData.amenities.split(',').map(item => item.trim()).filter(item => item)));

            // Append files
            if (images) {
                for (let i = 0; i < images.length; i++) {
                    data.append('images', images[i]);
                }
            }

            await axios.post('http://localhost:5000/api/hotels', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            alert('Hotel Created Successfully!');
            router.push('/admin/dashboard');
        } catch (error) {
            console.error('Failed to create hotel', error);
            alert('Failed to create hotel. Check console for details.');
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
                    <h1 className="text-3xl font-bold text-gray-900">Add New Hotel</h1>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name</label>
                                <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-black" placeholder="e.g. Grand Hyatt Kochi" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <input type="text" name="location" required value={formData.location} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-black" placeholder="e.g. Kochi, Kerala" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price Per Night (₹)</label>
                                <input type="number" name="price_per_night" required value={formData.price_per_night} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-black" placeholder="8000" />
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
                            <textarea name="description" required value={formData.description} onChange={handleChange} rows={4} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-black" placeholder="About the hotel..." />
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

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Amenities (Comma separated)</label>
                            <input type="text" name="amenities" value={formData.amenities} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-black" placeholder="WiFi, Pool, Spa, Parking" />
                        </div>

                        <div className="flex items-center gap-2">
                            <input type="checkbox" name="is_featured" id="is_featured_hotel" checked={formData.is_featured} onChange={handleChange} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                            <label htmlFor="is_featured_hotel" className="text-sm font-medium text-gray-700">Feature this hotel on Homepage</label>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-teal-600 text-white py-3 rounded-lg font-bold hover:bg-teal-700 transition flex justify-center items-center gap-2 disabled:bg-gray-400"
                            >
                                <Save size={20} />
                                {loading ? 'Saving...' : 'Create Hotel'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
