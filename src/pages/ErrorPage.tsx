import { Link, useLocation } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
  const location = useLocation();
  const errorMessage = location.state?.errorMessage || null;

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <FaExclamationTriangle className="text-red-600 text-6xl mx-auto" />
          <h1
            className="text-7xl md:text-9xl font-bold text-zinc-800 mt-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            404
          </h1>
          <h2
            className="text-2xl md:text-3xl font-semibold text-zinc-800 mt-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {errorMessage ? "Something Went Wrong" : "Page Not Found"}
          </h2>
          <p
            className="text-gray-500 mt-2 text-base md:text-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {errorMessage
              ? errorMessage
              : "The page you're looking for doesn't exist or has been moved. Let's get you back on track!"}
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="bg-red-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-red-700 focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Go to Home
          </Link>
          <Link
            to="/login"
            className="bg-white/90 backdrop-blur-sm border border-amber-500/50 text-yellow-500 py-2 px-6 rounded-lg font-semibold hover:text-red-600 focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;