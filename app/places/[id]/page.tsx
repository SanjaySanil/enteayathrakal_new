import { MapPin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import PlaceGallery from '@/components/PlaceGallery';
import EnquiryForm from '@/components/EnquiryForm';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getPlace(id: string) {
    try {
        const res = await fetch(`${API_URL}/places/${id}`, { cache: 'no-store' });
        if (!res.ok) return null;
        return res.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}

export default async function PlaceDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const place = await getPlace(id);

    if (!place) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Place Not Found</h1>
                    <p className="text-gray-600 mt-2">The destination you requested does not exist.</p>
                    <Link href="/places" className="mt-4 inline-block text-teal-600 hover:underline">
                        &larr; Back to Destinations
                    </Link>
                </div>
            </div>
        );
    }

    // Prepare media array for gallery
    const media = [];
    if (place.media_urls && place.media_urls.length > 0) {
        place.media_urls.forEach((url: string, index: number) => {
            media.push({
                url,
                type: place.media_types && place.media_types[index] ? place.media_types[index] : 'image'
            });
        });
    } else if (place.media_url) {
        media.push({
            url: place.media_url,
            type: place.media_type || 'image'
        });
    }

    return (
        <div className="bg-gray-50 min-h-screen pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Back Button */}
                <Link href="/places" className="inline-flex items-center text-gray-500 hover:text-teal-600 mb-6 transition">
                    <ArrowLeft size={20} className="mr-2" /> Back to All Destinations
                </Link>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Column: Gallery & Info */}
                    <div className="lg:w-2/3 space-y-8">

                        <PlaceGallery media={media} title={place.name} />

                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{place.name}</h1>
                                    <div className="flex items-center gap-2 text-teal-600 font-medium">
                                        <MapPin size={18} />
                                        <span>{place.location}</span>
                                    </div>
                                </div>
                            </div>

                            <hr className="my-6 border-gray-100" />

                            <h2 className="text-xl font-bold text-gray-800 mb-4">About this Destination</h2>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                {place.description}
                            </p>

                            {place.map_url && (
                                <div className="mt-8">
                                    <a
                                        href={place.map_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-white border-2 border-teal-600 text-teal-600 px-6 py-3 rounded-lg font-bold hover:bg-teal-50 transition"
                                    >
                                        <MapPin size={20} />
                                        View Location on Google Maps
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Enquiry */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-24">
                            <div className="bg-teal-900 text-white p-6 rounded-t-xl shadow-lg">
                                <h3 className="text-xl font-bold">Plan a Trip Here</h3>
                                <p className="text-teal-100 text-sm mt-1">
                                    Interested in visiting {place.name}? Let us help you organize the perfect trip.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-b-xl shadow-lg border-x border-b border-gray-100">
                                {/* Reuse EnquiryForm - passing place name as context via packageId prop purely for message generation */}
                                <EnquiryForm packageId={`Trip to ${place.name}`} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
