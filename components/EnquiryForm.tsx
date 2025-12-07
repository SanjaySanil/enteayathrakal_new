'use client';

import { useState } from 'react';
import api from '@/lib/api'; // Using our axios instance

export default function EnquiryForm({ packageId, hotelId }: { packageId?: string; hotelId?: string }) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        date: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // Use the api instance which points to localhost:5000/api
            await api.post('/enquiries', {
                user_name: formData.name,
                user_phone: formData.phone,
                user_email: formData.email,
                travel_date: formData.date,
                package_id: packageId || null,
                hotel_id: hotelId || null
            });

            // Open WhatsApp
            const messageText = `Hi, I am interested in an enquiry.\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Date:* ${formData.date}\n*Email:* ${formData.email || 'N/A'}\n*Package/Hotel ID:* ${packageId || hotelId || 'General'}`;
            const whatsappUrl = `https://wa.me/919207562665?text=${encodeURIComponent(messageText)}`;
            window.open(whatsappUrl, '_blank');

            setMessage('Thank you! Redirecting to WhatsApp...');
            setFormData({ name: '', phone: '', email: '', date: '' });
        } catch (error: any) {
            console.error(error);
            setMessage(error.response?.data?.error || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 sticky top-24">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Plan Your Holiday</h3>
            <p className="text-sm text-gray-500 mb-6">Fill in your details and our travel expert will call you back.</p>

            {message && (
                <div className={`mb-4 p-3 text-sm rounded ${message.includes('wrong') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-black"
                        placeholder="Your Name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-black"
                        placeholder="+91 9207562665"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-black"
                        placeholder="you@example.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
                    <input
                        type="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-black"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-teal-600 text-white py-3 rounded-lg font-bold hover:bg-teal-700 transition shadow-md disabled:bg-teal-400"
                >
                    {loading ? 'Sending...' : 'Send Enquiry'}
                </button>
            </form>
        </div>
    );
}
