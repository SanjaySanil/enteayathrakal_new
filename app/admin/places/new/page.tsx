'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, MapPin, Link as LinkIcon, Save, Loader, X } from 'lucide-react';
import api from '@/lib/api';

export default function NewPlace() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        location: '',
        map_url: ''
    });
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<{ url: string, type: 'image' | 'video' }[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setFiles(prev => [...prev, ...selectedFiles]);

            const newPreviews = selectedFiles.map(file => ({
                url: URL.createObjectURL(file),
                type: file.type.startsWith('video') ? 'video' : 'image' as 'image' | 'video'
            }));
            setPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (files.length === 0 && !formData.name) return alert("Please provide a name and at least one file.");

        setLoading(true);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('location', formData.location);
        data.append('map_url', formData.map_url);

        files.forEach((file) => {
            data.append('media', file);
        });

        try {
            await api.post('/places', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Place added successfully!');
            router.push('/admin/places');
        } catch (error: any) {
            console.error("Error adding place:", error);
            if (error.response && error.response.status === 401) {
                alert("Session expired. Please login again.");
                router.push('/admin/login');
            } else {
                alert("Failed to add place. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Add New Place</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-md">

                {/* File Upload */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Media Gallery (Images/Videos)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition cursor-pointer relative">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*,video/*"
                            multiple
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center text-gray-500">
                            <Upload size={48} className="mb-2" />
                            <span className="font-medium">Click to upload multiple Images or Videos</span>
                            <span className="text-xs mt-1">Supports JPG, PNG, WEBP, MP4</span>
                        </div>
                    </div>

                    {/* Previews Grid */}
                    {previews.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            {previews.map((preview, index) => (
                                <div key={index} className="relative h-32 rounded-lg overflow-hidden border border-gray-200 group">
                                    {preview.type === 'video' ? (
                                        <video
                                            src={preview.url}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <img
                                            src={preview.url}
                                            alt={`Preview ${index}`}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Place Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                        placeholder="e.g. Munnar Tea Gardens"
                        required
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                            placeholder="e.g. Idukki, Kerala"
                        />
                    </div>
                </div>

                {/* Google Map URL */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Google Map Link</label>
                    <div className="relative">
                        <LinkIcon className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="url"
                            value={formData.map_url}
                            onChange={(e) => setFormData({ ...formData, map_url: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                            placeholder="https://maps.app.goo.gl/..."
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                        rows={4}
                        placeholder="Brief description of the place..."
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-teal-600 text-white py-3 rounded-lg font-bold hover:bg-teal-700 transition flex items-center justify-center gap-2"
                >
                    {loading ? <Loader className="animate-spin" /> : <><Save size={20} /> Save Place</>}
                </button>
            </form>
        </div>
    );
}
