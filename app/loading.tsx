export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
                <p className="mt-4 text-teal-600 font-bold animate-pulse">Loading Entea Yathrakal...</p>
            </div>
        </div>
    );
}
