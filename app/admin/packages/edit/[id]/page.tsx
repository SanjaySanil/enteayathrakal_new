'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, X, Upload } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

export default function EditPackagePage() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Data States
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
        map_url: '',
    });

    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [newFiles, setNewFiles] = useState<FileList | null>(null);
    const [newPreviews, setNewPreviews] = useState<string[]>([]);

    useEffect(() => {
        if (id) fetchPackage();
    }, [id]);

    const fetchPackage = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/packages/${id}`);
            const pkg = res.data;
            setFormData({
                title: pkg.title,
                description: pkg.description,
                price: pkg.price,
                duration_days: pkg.duration_days,
                duration_nights: pkg.duration_nights,
                itinerary: Array.isArray(pkg.itinerary) ? pkg.itinerary.join('\n') : pkg.itinerary,
                inclusions: Array.isArray(pkg.inclusions) ? pkg.inclusions.join('\n') : pkg.inclusions,
                exclusions: Array.isArray(pkg.exclusions) ? pkg.exclusions.join('\n') : pkg.exclusions,
                is_featured: pkg.is_featured,
                map_url: pkg.map_url || '',
            });
            setExistingImages(pkg.images || []);
        } catch (error) {
            console.error("Fetch error:", error);
            alert("Failed to fetch package details");
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

            // Append basic fields
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('price', formData.price);
            data.append('duration_days', formData.duration_days);
            data.append('duration_nights', formData.duration_nights);
            data.append('is_featured', String(formData.is_featured));
            data.append('map_url', formData.map_url);

            // JSON fields
            data.append('itinerary', JSON.stringify(formData.itinerary.split('\n').filter((l: string) => l.trim())));
            data.append('inclusions', JSON.stringify(formData.inclusions.split('\n').filter((l: string) => l.trim())));
            data.append('exclusions', JSON.stringify(formData.exclusions.split('\n').filter((l: string) => l.trim())));

            // Image Handling
            // 1. Existing Images (kept)
            data.append('existing_images', JSON.stringify(existingImages));

            // 2. New Files
            if (newFiles) {
                for (let i = 0; i < newFiles.length; i++) {
                    data.append('images', newFiles[i]);
                }
            }

            await axios.put(`http://localhost:5000/api/packages/${id}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            alert('Package Updated Successfully!');
            router.push('/admin/dashboard');
        } catch (error) {
            console.error('Failed to update package', error);
            alert('Failed to update package.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-xl font-bold text-gray-600 flex items-center gap-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
                    Loading Package Details...
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
                    <h1 className="text-3xl font-bold text-gray-900">Edit Package</h1>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Package Title</label>
                                <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-black" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                                <input type="number" name="price" required value={formData.price} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-black" />
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
                            <textarea name="description" required value={formData.description} onChange={handleChange} rows={3} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-black" />
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

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Itinerary (One per line)</label>
                                <textarea name="itinerary" value={formData.itinerary} onChange={handleChange} rows={6} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-black" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Inclusions (One per line)</label>
                                <textarea name="inclusions" value={formData.inclusions} onChange={handleChange} rows={6} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-black" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Exclusions (One per line)</label>
                                <textarea name="exclusions" value={formData.exclusions} onChange={handleChange} rows={6} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-black" />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input type="checkbox" name="is_featured" id="is_featured" checked={formData.is_featured} onChange={handleChange} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                            <label htmlFor="is_featured" className="text-sm font-medium text-gray-700">Feature this package on Homepage</label>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-teal-600 text-white py-3 rounded-lg font-bold hover:bg-teal-700 transition flex justify-center items-center gap-2 disabled:bg-gray-400"
                            >
                                <Save size={20} />
                                {submitting ? 'Saving...' : 'Update Package'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
