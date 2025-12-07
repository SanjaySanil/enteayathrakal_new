import Link from 'next/link';
import { Users, Heart, Globe, Award, Map, ShieldCheck } from 'lucide-react';

export default function About() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-teal-900 text-white py-24 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80')] bg-cover bg-center opacity-20"></div>
                <div className="relative max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        We Are <span className="text-teal-400">EnteaYathrakal</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
                        Kerala's First Travel Community & Your Ultimate Travel Guide.
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <span className="text-teal-600 font-bold tracking-wider uppercase">Our Story</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            More Than Just a Travel Agency
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Entea Yathrakal started with a simple passion: to explore the hidden gems of the world and share those moments with a community of like-minded travelers.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            What began as a small group of travel enthusiasts in Kerala has now grown into a vibrant community. We don't just book tickets; we curate experiences that become cherished memories. From the mist-covered hills of Munnar to global adventures, we are with you every step of the way.
                        </p>

                        <div className="flex gap-4 pt-4">
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-teal-600">5k+</span>
                                <span className="text-sm text-gray-500">Happy Travelers</span>
                            </div>
                            <div className="w-px bg-gray-300 h-12"></div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-teal-600">50+</span>
                                <span className="text-sm text-gray-500">Destinations</span>
                            </div>
                            <div className="w-px bg-gray-300 h-12"></div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-teal-600">24/7</span>
                                <span className="text-sm text-gray-500">Support</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
                        <img
                            src="https://images.unsplash.com/photo-1527631746610-bca00104827d?w=800&q=80"
                            alt="Travel Community"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                            <div className="text-white">
                                <p className="font-bold text-lg">Exploring Together</p>
                                <p className="text-sm opacity-90">Join our next adventure</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="bg-gray-50 py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Travel With Us?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We bring you the perfect blend of adventure, comfort, and authenticity.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-t-4 border-teal-500">
                            <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 mb-6">
                                <Users size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Community First</h3>
                            <p className="text-gray-600">
                                You are not just a customer; you're part of Kerala's first and largest travel community. We build connections that last a lifetime.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-t-4 border-orange-500">
                            <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-6">
                                <Award size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Curated</h3>
                            <p className="text-gray-600">
                                Every itinerary is handpicked by travel experts who have been there. We ensure you get the best authentic experiences.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-t-4 border-blue-500">
                            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6">
                                <ShieldCheck size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Trusted & Safe</h3>
                            <p className="text-gray-600">
                                Your safety is our priority. We partner with top-rated hotels and certified guides to ensure a worry-free journey.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Ready to Explore?</h2>
                    <p className="text-xl text-gray-600 mb-10">
                        Let's plan your dream vacation today. The world is waiting for you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/packages" className="bg-teal-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-teal-700 transition shadow-lg hover:-translate-y-1">
                            View All Packages
                        </Link>
                        <Link href="/#plan" className="bg-white text-teal-600 border-2 border-teal-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-teal-50 transition">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
