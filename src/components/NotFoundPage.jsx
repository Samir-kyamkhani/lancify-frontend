import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center px-6">
      <div className="text-center space-y-6">
        <h1 className="text-7xl font-bold text-red-500 drop-shadow-lg">404</h1>
        <h2 className="text-3xl md:text-4xl font-semibold">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-300 max-w-md mx-auto">
          The page you’re looking for doesn’t exist or has been moved. Let’s get
          you back home!
        </p>
        <Link
          to="/"
          className="inline-block mt-4 px-6 py-3 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
