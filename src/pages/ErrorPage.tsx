
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#212433]">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-red-500">404</h1>
        <h2 className="text-3xl font-semibold text-gray-300 mt-4">
          Oops! Page not found.
        </h2>
        <p className="text-gray-400 mt-2">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn btn-primary bg-gray-700 hover:bg-gray-800 mx-2 border-none">
            Home
          </Link>
          <Link to="/login" className="btn btn-secondary bg-gray-700 border-none hover:bg-gray-800 mx-2">
            Login
          </Link>
        </div>
      </div>
   
    </div>
  );
};

export default ErrorPage;
