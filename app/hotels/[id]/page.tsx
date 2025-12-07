import { MapPin, Star, CheckCircle, Wifi, Coffee, Tent, Waves } from 'lucide-react';
import EnquiryForm from '@/components/EnquiryForm';
import ImageGallery from '@/components/ImageGallery';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getHotel(id: string) {
    try {
        const res = await fetch(`${API_URL}/hotels/${id}`, { cache: 'no-store' });
        if (!res.ok) return null;
        return res.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}

export default async function HotelDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const hotel = await getHotel(id);

    if (!hotel) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Hotel Not Found</h1>
                </div>
            </div>
        );
    }

    const images = hotel.images || [];
    const amenities = hotel.amenities || [];

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* LEFT COLUMN: Content */}
                    <div className="lg:w-2/3 space-y-8">

                        <ImageGallery images={images} title={hotel.name} />

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <MapPin size={18} className="text-teal-600" />
                                        <span>{hotel.location}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-bold">
                                    <Star size={18} className="fill-current" />
                                    <span>{hotel.rating}</span>
                                </div>
                            </div>

                            {hotel.map_url && (
                                <div className="mb-6">
                                    <a
                                        href={hotel.map_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-white border border-teal-600 text-teal-600 px-4 py-2 rounded-lg hover:bg-teal-50 transition"
                                    >
                                        <MapPin size={18} />
                                        View on Google Maps
                                    </a>
                                </div>
                            )}

                            <h2 className="text-xl font-bold text-gray-800 mb-3 mt-6">About this Hotel</h2>
                            <p className="text-gray-700 leading-relaxed">
                                {hotel.description}
                            </p>

                            <h2 className="text-xl font-bold text-gray-800 mb-4 mt-8">Amenities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {amenities.map((amenity: string, index: number) => (
                                    <div key={index} className="flex items-center gap-2 text-gray-700 bg-gray-50 p-3 rounded-lg">
                                        <CheckCircle size={16} className="text-teal-600" />
                                        <span className="text-sm font-medium">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: Sticky Enquiry */}
                    <div className="lg:w-1/3">
                        <div className="bg-teal-900 text-white p-6 rounded-xl shadow-lg mb-6">
                            <p className="text-sm opacity-80">Price Per Night</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold">₹{parseInt(hotel.price_per_night).toLocaleString('en-IN')}</span>
                                <span className="text-sm">/ room</span>
                            </div>
                            <p className="text-xs mt-2 text-teal-200">*Taxes extra as applicable</p>
                        </div>

                        <EnquiryForm hotelId={hotel.id} />
                    </div>

                </div>
            </div>
        </div>
    );
}
