'use client';

import { useState } from 'react';
import axios from 'axios';
import { Upload, X } from 'lucide-react';

export default function UploadMomentForm({ onSuccess }: { onSuccess: () => void }) {
    const [name, setName] = useState('');
    const [caption, setCaption] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setLoading(true);
        setMessage('');

        const formData = new FormData();
        formData.append('user_name', name);
        formData.append('caption', caption);
        formData.append('file', file);

        try {
            // Direct axios call because our api instance might default to JSON content-type
            // and browser handles multipart boundaries better automatically
            await axios.post('http://localhost:5000/api/moments/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage('Upload successful! It will appear shortly.');
            setName('');
            setCaption('');
            setFile(null);
            setPreview(null);
            if (onSuccess) onSuccess();
        } catch (error: any) {
            console.error(error);
            setMessage('Upload failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Upload size={20} className="text-teal-600" /> Share Your Moment
            </h3>

            {message && (
                <div className={`mb-4 p-3 text-sm rounded ${message.includes('failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
                    <textarea
                        required
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none h-20 resize-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Photo / Video</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition cursor-pointer relative">
                        <input
                            type="file"
                            accept="image/*,video/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        {preview ? (
                            <div className="relative h-32 w-full">
                                <img src={preview} alt="Preview" className="h-full w-full object-contain" />
                                <button
                                    type="button"
                                    onClick={(e) => { e.preventDefault(); setFile(null); setPreview(null); }}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 z-10"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ) : (
                            <div className="text-gray-500">
                                <p className="text-xs">Click to browse or drag file here</p>
                            </div>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading || !file}
                    className="w-full bg-teal-600 text-white py-2 rounded-lg font-bold hover:bg-teal-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    {loading ? 'Uploading...' : 'Post Moment'}
                </button>
            </form>
        </div>
    );
}
