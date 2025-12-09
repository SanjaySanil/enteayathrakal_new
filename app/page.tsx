import Hero from '@/components/Hero';
import PackageCard from '@/components/PackageCard';
import HotelCard from '@/components/HotelCard';
import MomentsFeed from '@/components/MomentsFeed';
import PlacesSection from '@/components/PlacesSection';
import { ShieldCheck, Users, Map, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getFeaturedPackages() {
  try {
    const res = await fetch(`${API_URL}/packages`, { cache: 'no-store' });
    if (!res.ok) {
      console.error("Failed to fetch packages");
      return [];
    }
    const packages = await res.json();
    return packages.filter((p: any) => p.is_featured).slice(0, 3); // Display first 3 as featured
  } catch (error) {
    console.error("Error fetching packages:", error);
    return [];
  }
}

async function getFeaturedHotels() {
  try {
    const res = await fetch(`${API_URL}/hotels`, { cache: 'no-store' });
    if (!res.ok) return [];
    const hotels = await res.json();
    return hotels.filter((h: any) => h.is_featured).slice(0, 3);
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return [];
  }
}

export default async function Home() {
  const packages = await getFeaturedPackages();
  const hotels = await getFeaturedHotels();

  return (
    <div className="bg-white">
      <Hero />

      {/* Explore by Category */}
      <PlacesSection />

      {/* Featured Packages */}
      <section id="packages" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">Best Selling</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Featured Packages</h2>
          </div>
          <Link href="/packages" className="hidden md:block border-2 border-teal-600 text-teal-600 px-6 py-2 rounded-full font-bold hover:bg-teal-50 transition">
            View All Packages
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg: any) => (
            <PackageCard
              key={pkg.id}
              id={pkg.id}
              title={pkg.title}
              image={pkg.images && pkg.images.length > 0 ? pkg.images[0] : 'https://via.placeholder.com/400x300'}
              price={pkg.price}
              days={pkg.duration_days}
              nights={pkg.duration_nights}
            />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/packages" className="border-2 border-teal-600 text-teal-600 px-6 py-2 rounded-full font-bold hover:bg-teal-50 transition inline-block">
            View All Packages
          </Link>
        </div>
      </section>

      {/* Featured Hotels */}
      <section id="hotels" className="py-20 bg-gray-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-teal-600 font-bold uppercase tracking-wider text-sm">Luxury Stays</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Top Hotels & Resorts</h2>
          </div>
          <Link href="/hotels" className="hidden md:block border-2 border-teal-600 text-teal-600 px-6 py-2 rounded-full font-bold hover:bg-teal-50 transition">
            View All Hotels
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel: any) => (
            <HotelCard
              key={hotel.id}
              id={hotel.id}
              name={hotel.name}
              location={hotel.location}
              image={hotel.images && hotel.images.length > 0 ? hotel.images[0] : 'https://via.placeholder.com/400x300'}
              price={hotel.price_per_night}
              rating={hotel.rating}
            />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/hotels" className="border-2 border-teal-600 text-teal-600 px-6 py-2 rounded-full font-bold hover:bg-teal-50 transition inline-block">
            View All Hotels
          </Link>
        </div>
      </section>

      {/* Video / Promo Section */}
      <section className="bg-teal-900 text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center z-10 relative">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Plan Your Dream Holiday Today</h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Get personalized itineraries, best rates, and 24/7 support for your next adventure.
          </p>
          <a
            href="#plan"
            className="inline-block bg-orange-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-600 shadow-xl transition transform hover:scale-105"
          >
            Start Planning
          </a>
        </div>
      </section>



      <MomentsFeed />


      {/* Contact / Map */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100" id="plan">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-teal-600 font-bold tracking-wider uppercase">Contact Us</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2">Ready to Start Your Journey?</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              We are here to help you plan the perfect getaway. Reach out to us anytime!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Phone Card */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <Phone size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us Directly</h3>
              <p className="text-gray-500 mb-4">Available 24/7 for your queries.</p>
              <a href="tel:+919207562665" className="text-2xl font-bold text-teal-700 hover:text-teal-900 block">
                +91 92075 62665
              </a>
            </div>

            {/* Email Card */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <Mail size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-500 mb-4">Drop a line, we'll reply shortly.</p>
              <a href="mailto:enteayathrakal@gmail.com" className="text-lg font-bold text-orange-600 hover:text-orange-800 break-all">
                enteayathrakal@gmail.com
              </a>
            </div>

            {/* Visit Card */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <MapPin size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Our Office</h3>
              <p className="text-gray-500 mb-4">Drop by for a coffee & chat.</p>
              <p className="text-lg font-bold text-gray-800">
                Munnar, Kerala, India
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
