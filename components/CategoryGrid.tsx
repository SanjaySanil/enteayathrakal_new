'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const categories = [
    {
        id: 'honeymoon',
        title: 'Honeymoon',
        image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop',
        description: 'Romantic Getaways'
    },
    {
        id: 'adventure',
        title: 'Adventure',
        image: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=1974&auto=format&fit=crop',
        description: 'Trekking & Camping'
    },
    {
        id: 'family',
        title: 'Family',
        image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2070&auto=format&fit=crop',
        description: 'Fun for Everyone'
    },
    {
        id: 'pilgrimage',
        title: 'Pilgrimage',
        image: 'https://images.unsplash.com/photo-1590053913076-2f7823e2dc21?q=80&w=2070&auto=format&fit=crop',
        description: 'Spiritual Journeys'
    }
];

export default function CategoryGrid() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <span className="text-teal-600 font-bold uppercase tracking-wider text-sm">Discover</span>
                        <h2 className="text-3xl font-bold text-gray-900 mt-2">Explore by Category</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <Link href={`/packages?category=${category.id}`} key={category.id}>
                            <motion.div
                                className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg"
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url('${category.image}')` }}
                                ></div>

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-2xl font-bold text-white mb-1">{category.title}</h3>
                                    <p className="text-gray-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                        {category.description} →
                                    </p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
