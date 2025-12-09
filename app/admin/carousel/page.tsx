'use client';

import { useEffect, useState } from 'react';
import { Upload, Trash2, Plus, Loader, X } from 'lucide-react';
import api from '@/lib/api';

interface CarouselItem {
    id: string;
    image_url: string;
}

export default function AdminCarousel() {
    const [items, setItems] = useState<CarouselItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await api.get('/carousel');
            setItems(res.data);
        } catch (error) {
            console.error("Error fetching carousel:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        setUploading(true);

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const res = await api.post('/carousel', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setItems([res.data, ...items]);
            setSelectedFile(null);
            setPreviewUrl(null);
            alert("Image uploaded successfully!");
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image.");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        // Aggressive Debugging
        alert(`Attempting to delete ID: ${id}`);

        // Removed confirm for now to rule out browser blocking
        // if (!confirm("Are you sure you want to delete this slide?")) return;

        try {
            alert('Sending delete request to server...');
            const response = await api.delete(`/carousel/${id}`);
            console.log("Delete response:", response);

            alert('Server responded success! Updating UI...');
            setItems(items.filter(item => item.id !== id));
            alert('Item removed from screen.');

        } catch (error: any) {
            console.error("Error deleting item:", error);
            const msg = error.response?.data?.error || error.message || "Unknown error";
            const status = error.response?.status || "No Status";
            alert(`DELETE FAILED!\nError: ${msg}\nStatus: ${status}`);
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Homepage Carousel</h1>

            {/* Upload Section */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                <h2 className="text-lg font-bold text-gray-700 mb-4">Add New Slide</h2>

                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-full md:w-1/3 relative h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition overflow-hidden">
                        {previewUrl ? (
                            <img src={previewUrl} className="w-full h-full object-cover" />
                        ) : (
                            <div className="text-center text-gray-400">
                                <Upload className="mx-auto mb-2" />
                                <span className="text-sm">Click to Select Image</span>
                            </div>
                        )}
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        {previewUrl && (
                            <button
                                onClick={(e) => { e.preventDefault(); setSelectedFile(null); setPreviewUrl(null); }}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    <div className="w-full md:w-2/3">
                        <p className="text-gray-500 text-sm mb-4">
                            Recommended Size: 600x800 (Vertical/Portrait) or generic landscape.
                            Currently the carousel displays vertical cards.
                        </p>
                        <button
                            onClick={handleUpload}
                            disabled={!selectedFile || uploading}
                            className={`px-6 py-3 rounded-lg font-bold text-white flex items-center gap-2 ${!selectedFile || uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'
                                }`}
                        >
                            {uploading ? <Loader className="animate-spin" /> : <Plus size={20} />}
                            {uploading ? 'Uploading...' : 'Add to Carousel'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Slides List */}
            {loading ? (
                <div className="flex justify-center p-10"><Loader className="animate-spin text-teal-600" /></div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {items.map((item) => (
                        <div key={item.id} className="relative group bg-white rounded-xl shadow-sm overflow-hidden aspect-[3/4]">
                            <img
                                src={item.image_url}
                                alt="Slide"
                                className="w-full h-full object-cover"
                            />
                            {/* Always visible delete button in top-right */}
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full shadow-md hover:bg-red-700 transition-colors z-10"
                                title="Delete Image"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}

                    {items.length === 0 && (
                        <div className="col-span-full text-center py-10 text-gray-500">
                            No slides added yet. Using default mock images on homepage.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
