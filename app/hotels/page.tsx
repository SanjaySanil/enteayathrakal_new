import HotelCard from '@/components/HotelCard';
import HotelFilterSidebar from '@/components/HotelFilterSidebar';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getHotels(searchParams: any) {
    try {
        const params = new URLSearchParams(searchParams);
        const res = await fetch(`${API_URL}/hotels?${params.toString()}`, { cache: 'no-store' });
        if (!res.ok) {
            return [];
        }
        return res.json();
    } catch (error) {
        console.error("Error fetching hotels:", error);
        return [];
    }
}

export default async function HotelsPage({ searchParams }: { searchParams: any }) {
    const resolvedParams = await searchParams;
    const hotels = await getHotels(resolvedParams);

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Luxury Hotels & Resorts</h1>
                    <p className="text-lg text-gray-600">Handpicked stays for your perfect getaway.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="lg:w-1/4">
                        <HotelFilterSidebar />
                    </div>

                    {/* Results Grid */}
                    <div className="lg:w-3/4">
                        {hotels.length === 0 ? (
                            <div className="flex flex-col items-center justify-center bg-white p-12 rounded-xl shadow-sm text-center">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">No hotels found</h3>
                                <p className="text-gray-500">Try adjusting your filters or search terms.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
