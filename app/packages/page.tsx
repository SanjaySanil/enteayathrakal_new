import PackageCard from '@/components/PackageCard';
import FilterSidebar from '@/components/FilterSidebar';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getPackages(searchParams: any) {
    try {
        const params = new URLSearchParams(searchParams);
        const res = await fetch(`${API_URL}/packages?${params.toString()}`, { cache: 'no-store' });
        if (!res.ok) {
            return [];
        }
        return res.json();
    } catch (error) {
        console.error("Error fetching packages:", error);
        return [];
    }
}

export default async function PackagesPage({ searchParams }: { searchParams: any }) {
    // Await searchParams before using them (Next.js 15+ requirement, good practice generally)
    const resolvedParams = await searchParams;
    const packages = await getPackages(resolvedParams);

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">All Tour Packages</h1>
                    <p className="text-lg text-gray-600">Find your perfect getaway with our tailored searches.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="lg:w-1/4">
                        <FilterSidebar />
                    </div>

                    {/* Results Grid */}
                    <div className="lg:w-3/4">
                        {packages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center bg-white p-12 rounded-xl shadow-sm text-center">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">No packages found</h3>
                                <p className="text-gray-500">Try adjusting your filters or search terms.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
