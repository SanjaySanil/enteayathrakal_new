'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { LogOut, Package, MessageSquare, LayoutDashboard, Building, Trash2, Edit2 } from 'lucide-react';
import axios from 'axios';

export default function Dashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState({ enquiries: 0, packages: 0, hotels: 0 });
    const [enquiries, setEnquiries] = useState([]);
    const [packages, setPackages] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) router.push('/admin/login');
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch all data in parallel
            const [enqRes, pkgRes, hotelRes] = await Promise.all([
                api.get('/enquiries'),
                api.get('/packages'),
                api.get('/hotels')
            ]);

            setEnquiries(enqRes.data);
            setPackages(pkgRes.data);
            setHotels(hotelRes.data);

            setStats({
                enquiries: enqRes.data.length,
                packages: pkgRes.data.length,
                hotels: hotelRes.data.length
            });

        } catch (error) {
            console.error("Error fetching admin data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/admin/login');
    };

    const handleDelete = async (type: 'package' | 'hotel' | 'enquiry', id: string) => {
        if (!confirm("Are you sure you want to delete this?")) return;

        try {
            if (type === 'package') {
                await api.delete(`/packages/${id}`);
                setPackages(prev => prev.filter((p: any) => p.id !== id));
            } else if (type === 'hotel') {
                await api.delete(`/hotels/${id}`);
                setHotels(prev => prev.filter((h: any) => h.id !== id));
            } else if (type === 'enquiry') {
                await api.delete(`/enquiries/${id}`);
                setEnquiries(prev => prev.filter((e: any) => e.id !== id));
            }
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Failed to delete item.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-teal-800 text-white p-6 hidden md:block">
                <h2 className="text-2xl font-bold mb-8">Tour Manager</h2>
                <nav className="space-y-4">
                    <button onClick={() => setActiveTab('overview')} className={`flex items-center space-x-3 w-full p-3 rounded transition ${activeTab === 'overview' ? 'bg-teal-700' : 'hover:bg-teal-700/50'}`}>
                        <LayoutDashboard size={20} /> <span>Overview</span>
                    </button>
                    <button onClick={() => setActiveTab('packages')} className={`flex items-center space-x-3 w-full p-3 rounded transition ${activeTab === 'packages' ? 'bg-teal-700' : 'hover:bg-teal-700/50'}`}>
                        <Package size={20} /> <span>Packages</span>
                    </button>
                    <button onClick={() => setActiveTab('hotels')} className={`flex items-center space-x-3 w-full p-3 rounded transition ${activeTab === 'hotels' ? 'bg-teal-700' : 'hover:bg-teal-700/50'}`}>
                        <Building size={20} /> <span>Hotels</span>
                    </button>
                    <button onClick={() => setActiveTab('enquiries')} className={`flex items-center space-x-3 w-full p-3 rounded transition ${activeTab === 'enquiries' ? 'bg-teal-700' : 'hover:bg-teal-700/50'}`}>
                        <MessageSquare size={20} /> <span>Enquiries</span>
                    </button>
                    <button
                        onClick={() => router.push('/admin/moments')}
                        className="flex items-center space-x-3 w-full p-3 rounded transition hover:bg-teal-700/50"
                    >
                        <Package size={20} />
                        <span>Moments</span>
                    </button>
                </nav>
                <button onClick={handleLogout} className="flex items-center space-x-3 w-full p-3 rounded mt-auto hover:bg-red-600/80 transition absolute bottom-6 w-52">
                    <LogOut size={20} /> <span>Logout</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {/* Header */}
                <div className="md:hidden flex justify-between mb-6">
                    <h1 className="text-xl font-bold">Dashboard</h1>
                    <button onClick={handleLogout}><LogOut className="text-red-500" /></button>
                </div>

                {loading ? <div className="text-center py-20">Loading Dashboard...</div> : (
                    <>
                        {activeTab === 'overview' && (
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-teal-500">
                                        <h3 className="text-gray-500 text-sm font-bold uppercase">Total Enquiries</h3>
                                        <p className="text-4xl font-bold text-gray-800 mt-2">{stats.enquiries}</p>
                                    </div>
                                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
                                        <h3 className="text-gray-500 text-sm font-bold uppercase">Active Packages</h3>
                                        <p className="text-4xl font-bold text-gray-800 mt-2">{stats.packages}</p>
                                    </div>
                                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
                                        <h3 className="text-gray-500 text-sm font-bold uppercase">Listed Hotels</h3>
                                        <p className="text-4xl font-bold text-gray-800 mt-2">{stats.hotels}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'packages' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h1 className="text-3xl font-bold text-gray-800">Manage Packages</h1>
                                    <button className="bg-teal-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-teal-700 shadow" onClick={() => router.push('/admin/packages/new')}>
                                        + Add New Package
                                    </button>
                                </div>
                                <div className="bg-white rounded-xl shadow overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase">Title</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase">Price</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase">Duration</th>
                                                <th className="px-6 py-3 text-right text-xs font-bold text-gray-800 uppercase">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {packages.map((pkg: any) => (
                                                <tr key={pkg.id}>
                                                    <td className="px-6 py-4 text-gray-900 font-medium">{pkg.title}</td>
                                                    <td className="px-6 py-4 text-gray-900">₹{pkg.price}</td>
                                                    <td className="px-6 py-4 text-gray-900">{pkg.duration_days}D / {pkg.duration_nights}N</td>
                                                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                                                        <button onClick={() => router.push(`/admin/packages/edit/${pkg.id}`)} className="text-blue-600 hover:text-blue-900"><Edit2 size={18} /></button>
                                                        <button onClick={() => handleDelete('package', pkg.id)} className="text-red-600 hover:text-red-900"><Trash2 size={18} /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'hotels' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h1 className="text-3xl font-bold text-gray-800">Manage Hotels</h1>
                                    <button className="bg-teal-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-teal-700 shadow" onClick={() => router.push('/admin/hotels/new')}>
                                        + Add New Hotel
                                    </button>
                                </div>
                                <div className="bg-white rounded-xl shadow overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase">Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase">Location</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase">Price/Night</th>
                                                <th className="px-6 py-3 text-right text-xs font-bold text-gray-800 uppercase">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {hotels.map((hotel: any) => (
                                                <tr key={hotel.id}>
                                                    <td className="px-6 py-4 text-gray-900 font-medium">{hotel.name}</td>
                                                    <td className="px-6 py-4 text-gray-900">{hotel.location}</td>
                                                    <td className="px-6 py-4 text-gray-900">₹{hotel.price_per_night}</td>
                                                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                                                        <button onClick={() => router.push(`/admin/hotels/edit/${hotel.id}`)} className="text-blue-600 hover:text-blue-900"><Edit2 size={18} /></button>
                                                        <button onClick={() => handleDelete('hotel', hotel.id)} className="text-red-600 hover:text-red-900"><Trash2 size={18} /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'enquiries' && (
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800 mb-6">Enquiries Inbox</h1>
                                <div className="bg-white rounded-xl shadow overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase">Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase">Interest</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase">Contact</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase">Travel Date</th>
                                                <th className="px-6 py-3 text-right text-xs font-bold text-gray-800 uppercase">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {enquiries.map((enq: any) => (
                                                <tr key={enq.id}>
                                                    <td className="px-6 py-4 font-bold text-gray-900">{enq.user_name}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                                                        {enq.packages?.title || enq.hotels?.name || 'General Enquiry'}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm">
                                                        <div className="text-gray-900 font-medium">{enq.user_email}</div>
                                                        <div className="text-gray-800">{enq.user_phone}</div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                        {enq.travel_date ? new Date(enq.travel_date).toLocaleDateString() : 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button onClick={() => handleDelete('enquiry', enq.id)} className="text-red-600 hover:text-red-900"><Trash2 size={18} /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
