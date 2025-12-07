export default function InstagramFeed() {
    // Mock images for MVP
    const images = [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80',
        'https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?w=500&q=80',
        'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=500&q=80',
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500&q=80',
        'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=500&q=80',
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500&q=80',
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Moments from Our Travelers</h2>
                    <p className="text-gray-600">Follow us on Instagram @EnteaYathrakal</p>
                </div>

                <div className="columns-2 md:columns-3 gap-4 space-y-4">
                    {images.map((src, index) => (
                        <div key={index} className="break-inside-avoid rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
                            <img src={src} alt={`Travel Moment ${index + 1}`} className="w-full h-auto" />
                        </div>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <a
                        href="https://www.instagram.com/entea_yathrakal?igsh=MWoybnN2aGJyMzEzcg=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
                    >
                        Follow Us
                    </a>
                </div>
            </div>
        </section>
    );
}
