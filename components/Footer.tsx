import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Brand */}
                <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                        <img
                            src="/logo.jpg"
                            alt="Logo"
                            className="w-12 h-12 rounded-full border-2 border-teal-500"
                        />
                        <h3 className="text-2xl font-bold text-white">Entea Yathrakal</h3>
                    </div>
                    <div className="space-y-1 text-sm text-gray-400">
                        <p>Your Ultimate travel guide</p>
                        <p>You're following Kerala's first travel community</p>
                    </div>
                    <div className="flex justify-center md:justify-start space-x-4 mt-6">
                        <a href="https://www.instagram.com/entea_yathrakal?igsh=MWoybnN2aGJyMzEzcg==" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400"><Instagram /></a>
                        <a href="#" className="hover:text-teal-400"><Facebook /></a>
                        <a href="#" className="hover:text-teal-400"><Twitter /></a>
                    </div>
                </div>

                {/* Quick Links - Centered on Desktop */}
                <div className="text-center md:text-left md:justify-self-center">
                    <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-teal-400 transition">Home</a></li>
                        <li><a href="#" className="hover:text-teal-400 transition">Packages</a></li>
                        <li><a href="#" className="hover:text-teal-400 transition">Destinations</a></li>
                        <li><a href="#" className="hover:text-teal-400 transition">About Us</a></li>
                        <li><a href="#" className="hover:text-teal-400 transition">Contact</a></li>
                    </ul>
                </div>

                {/* Contact - Right Aligned on Desktop */}
                <div className="text-center md:text-left md:justify-self-end">
                    <h4 className="text-lg font-bold text-white mb-4">Contact Us</h4>
                    <ul className="space-y-4">
                        <li className="flex items-center justify-center md:justify-start gap-3">
                            <MapPin className="text-teal-500 shrink-0" />
                            <span>Munnar, Kerala, India</span>
                        </li>
                        <li className="flex items-center justify-center md:justify-start gap-3">
                            <Phone className="text-teal-500 shrink-0" />
                            <span>+91 92075 62665</span>
                        </li>
                        <li className="flex items-center justify-center md:justify-start gap-3">
                            <Mail className="text-teal-500 shrink-0" />
                            <span>enteayathrakal@gmail.com</span>
                        </li>
                    </ul>
                </div>

            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
                &copy; {new Date().getFullYear()} EnteaYathrakal. All rights reserved.
            </div>
        </footer>
    );
}
