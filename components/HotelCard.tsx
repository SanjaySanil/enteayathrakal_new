import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';

interface HotelProps {
    id: string;
    name: string;
    location: string;
    price: number;
    image: string;
    rating: number;
}

const HotelCard: React.FC<HotelProps> = ({ id, name, location, price, image, rating }) => {
    const formattedPrice = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(price);

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
            <div className="relative h-64 overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold shadow-sm">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span>{rating}</span>
                </div>
            </div>
            <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
                        <div className="flex items-center text-gray-500 text-sm">
                            <MapPin size={14} className="mr-1" />
                            {location}
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex items-end justify-between">
                    <div>
                        <p className="text-xs text-gray-500">Per Night</p>
                        <p className="text-2xl font-bold text-teal-700">{formattedPrice}</p>
                    </div>
                    <Link
                        href={`/hotels/${id}`}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-700 transition"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HotelCard;
