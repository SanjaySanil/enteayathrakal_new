import { Clock, CheckCircle, XCircle, MapPin } from 'lucide-react';
import EnquiryForm from '@/components/EnquiryForm';
import ImageGallery from '@/components/ImageGallery';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getPackage(id: string) {
    try {
        const res = await fetch(`${API_URL}/packages/${id}`, { cache: 'no-store' });
        if (!res.ok) return null;
        return res.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}

export default async function PackageDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const pkg = await getPackage(id);

    if (!pkg) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Package Not Found</h1>
                    <p className="text-gray-600 mt-2">The package you requested does not exist or has been removed.</p>
                </div>
            </div>
        );
    }
    const data = pkg;

    // Ensure we have fallback for array fields if they are missing/null in DB data
    const itinerary = data.itinerary && Array.isArray(data.itinerary) ? data.itinerary : [];
    const inclusions = data.inclusions || [];
    const exclusions = data.exclusions || [];
    const images = data.images || [];

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* LEFT COLUMN: Content */}
                    <div className="lg:w-2/3 space-y-8">

                        {/* Interactive Image Gallery */}
                        <ImageGallery images={images} title={data.title} />


                        {/* Title & Overview */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.title}</h1>
                            <div className="flex items-center gap-4 text-gray-600 text-sm mb-4">
                                <div className="flex items-center gap-1">
                                    <Clock size={16} className="text-teal-600" />
                                    <span>{data.duration_days} Days / {data.duration_nights} Nights</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin size={16} className="text-teal-600" />
                                    <span>Destination</span>
                                </div>
                            </div>
                            {data.map_url && (
                                <div className="mb-4">
                                    <a
                                        href={data.map_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-800 font-medium underline"
                                    >
                                        <MapPin size={16} />
                                        View Location on Google Maps
                                    </a>
                                </div>
                            )}
                            <p className="text-gray-700 leading-relaxed">
                                {data.description}
                            </p>
                        </div>

                        {/* Itinerary */}
                        {itinerary.length > 0 && (
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">Itinerary</h2>
                                <div className="space-y-6">
                                    {itinerary.map((item: any, index: number) => {
                                        // Handle both string (new format) and object (old format)
                                        const title = typeof item === 'string' ? `Day ${index + 1}` : item.title;
                                        const desc = typeof item === 'string' ? item : (item.desc || item.description);

                                        return (
                                            <div key={index} className="flex gap-4">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                                                        D{index + 1}
                                                    </div>
                                                    {index !== itinerary.length - 1 && (
                                                        <div className="w-0.5 h-full bg-gray-200 my-2"></div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                                                    <p className="text-gray-600 text-sm mt-1">{desc}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}


                        {/* Inclusions / Exclusions */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-lg font-bold text-green-700 mb-4 flex items-center"><CheckCircle size={20} className="mr-2" /> Inclusions</h3>
                                <ul className="space-y-2">
                                    {inclusions.map((inc: string, i: number) => (
                                        <li key={i} className="flex items-start text-sm text-gray-700">
                                            <span className="mr-2">•</span> {inc}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-lg font-bold text-red-700 mb-4 flex items-center"><XCircle size={20} className="mr-2" /> Exclusions</h3>
                                <ul className="space-y-2">
                                    {exclusions.map((exc: string, i: number) => (
                                        <li key={i} className="flex items-start text-sm text-gray-700">
                                            <span className="mr-2">•</span> {exc}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: Sticky Enquiry */}
                    <div className="lg:w-1/3">
                        {/* Price Card */}
                        <div className="bg-teal-900 text-white p-6 rounded-xl shadow-lg mb-6">
                            <p className="text-sm opacity-80">Starting From</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold">₹{parseInt(data.price).toLocaleString('en-IN')}</span>
                                <span className="text-sm">/ person</span>
                            </div>
                            <p className="text-xs mt-2 text-teal-200">*Prices subject to change based on season</p>
                        </div>

                        <EnquiryForm packageId={data.id} />
                    </div>

                </div>
            </div>
        </div>
    );
}
