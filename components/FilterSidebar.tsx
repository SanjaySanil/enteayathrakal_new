'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter } from 'lucide-react';

export default function FilterSidebar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState({
        search: searchParams.get('search') || '',
        min_price: searchParams.get('min_price') || '',
        max_price: searchParams.get('max_price') || '',
        min_days: searchParams.get('min_days') || '',
        max_days: searchParams.get('max_days') || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const applyFilters = () => {
        const params = new URLSearchParams();
        if (filters.search) params.set('search', filters.search);
        if (filters.min_price) params.set('min_price', filters.min_price);
        if (filters.max_price) params.set('max_price', filters.max_price);
        if (filters.min_days) params.set('min_days', filters.min_days);
        if (filters.max_days) params.set('max_days', filters.max_days);

        router.push(`/packages?${params.toString()}`);
    };

    const clearFilters = () => {
        setFilters({ search: '', min_price: '', max_price: '', min_days: '', max_days: '' });
        router.push('/packages');
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md h-fit">
            <div className="flex items-center gap-2 mb-6 text-gray-800 border-b pb-4">
                <Filter size={20} className="text-teal-600" />
                <h3 className="font-bold text-lg">Filter Packages</h3>
            </div>

            <div className="space-y-6">
                {/* Search */}
                <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Search</label>
                    <div className="relative">
                        <input
                            type="text"
                            name="search"
                            value={filters.search}
                            onChange={handleChange}
                            placeholder="Destination or keyword..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm text-black"
                        />
                        <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                    </div>
                </div>

                {/* Price Range */}
                <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Price Range (₹)</label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            name="min_price"
                            value={filters.min_price}
                            onChange={handleChange}
                            placeholder="Min"
                            className="w-1/2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm text-black"
                        />
                        <input
                            type="number"
                            name="max_price"
                            value={filters.max_price}
                            onChange={handleChange}
                            placeholder="Max"
                            className="w-1/2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm text-black"
                        />
                    </div>
                </div>

                {/* Duration */}
                <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Duration (Days)</label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            name="min_days"
                            value={filters.min_days}
                            onChange={handleChange}
                            placeholder="Min"
                            className="w-1/2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm text-black"
                        />
                        <input
                            type="number"
                            name="max_days"
                            value={filters.max_days}
                            onChange={handleChange}
                            placeholder="Max"
                            className="w-1/2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm text-black"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="pt-4 flex flex-col gap-3">
                    <button
                        onClick={applyFilters}
                        className="w-full bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition shadow-sm"
                    >
                        Apply Filters
                    </button>
                    <button
                        onClick={clearFilters}
                        className="w-full text-gray-500 hover:text-gray-800 text-sm font-medium transition"
                    >
                        Clear All
                    </button>
                </div>
            </div>
        </div>
    );
}
