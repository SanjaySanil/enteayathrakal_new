import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';

interface PackageCardProps {
    id: string;
    title: string;
    image: string;
    price: number;
    days: number;
    nights: number;
}

export default function PackageCard({ id, title, image, price, days, nights }: PackageCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 group">
            <div className="relative h-64 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent w-full p-4">
                    <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                        BEST SELLER
                    </span>
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>

                <div className="flex items-center text-gray-500 text-sm mb-4">
                    <Clock size={16} className="mr-1" />
                    <span>{days} Days / {nights} Nights</span>
                </div>

                <div className="flex justify-between items-end border-t pt-4">
                    <div>
                        <p className="text-xs text-gray-500">Starting from</p>
                        <p className="text-2xl font-bold text-teal-600">₹{price.toLocaleString('en-IN')}</p>
                    </div>

                    <Link href={`/packages/${id}`}>
                        <button className="flex items-center text-orange-500 font-bold hover:text-orange-600 transition">
                            View Details <ArrowRight size={18} className="ml-1" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
