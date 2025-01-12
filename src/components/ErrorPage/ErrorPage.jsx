import React from "react";
import { Link } from "react-router-dom";
import errorImage from "../../assets/gst_bg_054_16.jpg"

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
            <img
                src={errorImage}
                alt="Error message"
                className="w-64 h-64 mb-8"
            />
            <h1 className="text-6xl font-extrabold text-purple-700 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                Oops! Page Not Found
            </h2>
            <p className="text-lg text-gray-500 text-center mb-6 px-4 md:px-0">
                The page you are looking for might have been removed, had its name changed,
                or is temporarily unavailable.
            </p>
            <Link to="/" className="btn bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition">
                Back to Home
            </Link>
        </div>
    );
};

export default ErrorPage;
