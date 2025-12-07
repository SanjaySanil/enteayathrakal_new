'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Trash2, Edit2, Save, X } from 'lucide-react';
import UploadMomentForm from '@/components/UploadMomentForm';
import api from '@/lib/api';

interface Moment {
    id: string;
    file_url: string;
    file_type: string;
    caption: string;
    user_name: string;
    created_at: string;
}

export default function MomentsManager() {
    const [moments, setMoments] = useState<Moment[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editCaption, setEditCaption] = useState('');

    const fetchMoments = async () => {
        try {
            const res = await api.get('/moments');
            setMoments(res.data);
        } catch (error) {
            console.error("Error fetching moments:", error);
        }
    };

    useEffect(() => {
        fetchMoments();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this moment?')) return;
        try {
            await api.delete(`/moments/${id}`);
            setMoments(prev => prev.filter(m => m.id !== id));
        } catch (error) {
            console.error("Error deleting moment:", error);
            alert("Failed to delete moment");
        }
    };

    const startEdit = (moment: Moment) => {
        setEditingId(moment.id);
        setEditCaption(moment.caption);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditCaption('');
    };

    const saveEdit = async (id: string) => {
        try {
            await api.put(`/moments/${id}`, {
                caption: editCaption
            });
            setMoments(prev => prev.map(m => m.id === id ? { ...m, caption: editCaption } : m));
            setEditingId(null);
        } catch (error) {
            console.error(error);
            alert("Failed to update moment");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin/dashboard" className="text-gray-600 hover:text-teal-600 transition">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Manage Moments</h1>
                </div>

                {/* Upload Section */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-bold">Upload New Moment</h2>
                        <p className="text-sm text-gray-500">Post a new photo or video to the gallery.</p>
                    </div>
                    <div className="p-6">
                        <UploadMomentForm onSuccess={() => {
                            alert('Moment Uploaded Successfully!');
                            fetchMoments();
                        }} />
                    </div>
                </div>

                {/* List Section */}
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Existing Moments</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {moments.map((moment) => (
                        <div key={moment.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                            <div className="h-48 bg-gray-200 relative">
                                {moment.file_type === 'image' ? (
                                    <img src={moment.file_url} alt={moment.caption} className="w-full h-full object-cover" />
                                ) : (
                                    <video src={moment.file_url} className="w-full h-full object-cover" controls />
                                )}
                            </div>
                            <div className="p-4 flex-1">
                                {editingId === moment.id ? (
                                    <div className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={editCaption}
                                            onChange={(e) => setEditCaption(e.target.value)}
                                            className="border p-1 rounded w-full"
                                        />
                                        <button onClick={() => saveEdit(moment.id)} className="text-green-600"><Save size={20} /></button>
                                        <button onClick={cancelEdit} className="text-gray-500"><X size={20} /></button>
                                    </div>
                                ) : (
                                    <p className="font-medium text-gray-800 mb-1">{moment.caption}</p>
                                )}
                                <p className="text-sm text-gray-500">By: {moment.user_name}</p>
                            </div>
                            <div className="bg-gray-50 p-3 flex justify-end gap-3 border-t">
                                <button onClick={() => startEdit(moment)} className="text-blue-600 hover:bg-blue-50 p-1 rounded"><Edit2 size={18} /></button>
                                <button onClick={() => handleDelete(moment.id)} className="text-red-600 hover:bg-red-50 p-1 rounded"><Trash2 size={18} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
