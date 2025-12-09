'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Plane, Phone, MapPin } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? 'bg-white shadow-lg border-b border-gray-100 py-2'
                : 'bg-white/95 backdrop-blur-sm py-4'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo Section */}
                    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-teal-600 group-hover:scale-105 transition-transform duration-300">
                                <img
                                    src="/logo.jpg"
                                    alt="EnteaYathrakal Logo"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <span className="text-2xl font-extrabold tracking-tight text-teal-900 group-hover:text-teal-700 transition-colors">
                                Entea<span className="text-teal-600">Yathrakal</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {[
                            { name: 'Destinations', href: '/#destinations' },
                            { name: 'Packages', href: '/packages' },
                            { name: 'Hotels', href: '/hotels' },
                            { name: 'Moments', href: '/moments' },
                            { name: 'About', href: '/about' },
                        ].map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-700 font-medium hover:text-teal-600 transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute left-0 bottom-[-4px] w-0 h-0.5 bg-teal-600 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}

                        <a
                            href="#plan"
                            className="bg-gradient-to-r from-teal-600 to-teal-500 text-white px-6 py-2.5 rounded-full font-bold shadow-lg hover:shadow-teal-500/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
                        >
                            <Phone size={18} />
                            <span>Plan Holiday</span>
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-teal-600 focus:outline-none p-2 rounded-md hover:bg-gray-100 transition"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-b shadow-xl animate-in slide-in-from-top-5 duration-300">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {[
                            { name: 'Destinations', href: '/#destinations' },
                            { name: 'Packages', href: '/packages' },
                            { name: 'Hotels', href: '/hotels' },
                            { name: 'Moments', href: '/moments' },
                            { name: 'About', href: '/about' },
                        ].map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-3 text-lg font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 px-4">
                            <a
                                href="#plan"
                                onClick={() => setIsOpen(false)}
                                className="block w-full text-center bg-gradient-to-r from-teal-600 to-teal-500 text-white py-3 rounded-xl font-bold shadow-md active:scale-95 transition-transform"
                            >
                                Plan My Holiday
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
