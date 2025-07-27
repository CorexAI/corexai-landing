import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="text-7xl md:text-9xl font-extrabold text-blue-500 drop-shadow-lg mb-6">404</div>
      <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">Page Not Found</h1>
      <p className="text-lg md:text-xl text-gray-400 mb-8 text-center max-w-xl">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.<br />
        Let&apos;s get you back to something awesome.
      </p>
      <Link href="/" className="px-8 py-3 rounded-lg text-lg font-bold bg-gradient-to-r from-blue-500 via-blue-700 to-blue-500 shadow-lg border-2 border-blue-600 transition-transform duration-800 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-blue-700/90">
        Go Home
      </Link>
    </div>
  );
} 