import { Link, useParams } from "react-router-dom";
import {
  FaPlus,
  FaMinus,
  FaHeart,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { ClipLoader } from "react-spinners";
import { useGetSingleCarQuery } from "../redux/features/car/carApi";
import { TCar } from "../types";
import { useState } from "react";

export default function CarDetails() {
  const params = useParams();
  const { data, isLoading } = useGetSingleCarQuery(params.carId as string);
  const car: TCar = data?.data;

  const [quantity, setQuantity] = useState(1);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const additionalFeatures = [
    { id: "insurance", name: "Insurance", price: 20 },
    { id: "gps", name: "GPS Navigation", price: 15 },
    { id: "child_seat", name: "Child Seat", price: 10 },
  ];

  if (isLoading) {
    return (
      <ClipLoader
        color="#F59E0B"
        size={60}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-label="Loading Spinner"
        speedMultiplier={0.8}
      />
    );
  }

  const {
    _id,
    name,
    images,
    pricePerHour,
    color,
    description,
    status,
    features,
  } = car;

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  const totalPrice =
    pricePerHour +
    selectedFeatures.reduce((sum, id) => {
      const feature = additionalFeatures.find((f) => f.id === id);
      return sum + (feature?.price || 0);
    }, 0);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 lg:py-20">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="flex-1">
          <ImageGallery
            items={images.map((image) => ({
              original: image,
              thumbnail: image,
            }))}
            showNav={true}
            showPlayButton={false}
            showFullscreenButton={true}
            additionalClass="custom-image-gallery"
            renderItem={(item) => (
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={item.original}
                  alt={name}
                  className="w-full h-auto object-cover transition-transform duration-300 hover:scale-150"
                />
                <button
                  onClick={() => window.location.reload()}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full text-yellow-500 hover:text-red-600 focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
                  aria-label="Zoom out"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </button>
              </div>
            )}
          />
        </div>

        {/* Car Details */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span
              className={`py-1 px-3 text-sm rounded-full ${
                status === "available"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {status}
            </span>
          </div>
          <h2
            className="text-3xl lg:text-4xl font-bold text-zinc-800"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {name}
          </h2>
          <p
            className="text-gray-500 text-base"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {description}
          </p>
          <h3
            className="text-2xl font-semibold text-yellow-500"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            ${totalPrice.toFixed(2)}{" "}
            <span className="text-gray-500 text-lg">(Per Hour)</span>
          </h3>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-gray-500 font-medium">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="p-2 text-yellow-500 hover:text-red-600"
                aria-label="Decrease quantity"
              >
                <FaMinus />
              </button>
              <span className="px-4 py-2 text-gray-500">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="p-2 text-yellow-500 hover:text-red-600"
                aria-label="Increase quantity"
              >
                <FaPlus />
              </button>
            </div>
          </div>

          {/* Color */}
          <div className="flex items-center gap-4">
            <span className="text-gray-500 font-medium">Color:</span>
            <span
              className="py-1 px-3 bg-white/90 backdrop-blur-sm border border-amber-500/50 rounded text-gray-500 capitalize"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {color}
            </span>
          </div>

          {/* Additional Features */}
          <div className="flex flex-col gap-4">
            <span className="text-gray-500 font-medium">
              Additional Features:
            </span>
            <div className="flex flex-wrap gap-4">
              {additionalFeatures.map((feature) => (
                <label
                  key={feature.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedFeatures.includes(feature.id)}
                    onChange={() => handleFeatureToggle(feature.id)}
                    className="h-5 w-5 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                  />
                  <span
                    className="text-gray-500 text-sm"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {feature.name} (+${feature.price})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Features List */}
          <div className="flex flex-col gap-4">
            <span className="text-gray-500 font-medium">Car Features:</span>
            <ul className="grid grid-cols-2 gap-2 text-gray-500 text-sm">
              {features.map((feature, index) => (
                <li key={index} style={{ fontFamily: "'Poppins', sans-serif" }}>
                  • {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <span className="text-gray-500 font-medium">Reviews:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill={star <= 4.7 ? "#F59E0B" : "#D1D5DB"}
                >
                  <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" />
                </svg>
              ))}
              <span className="text-gray-500 text-sm ml-2">(4.7)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Link to={`/booking/${_id}`}>
              <button
                className={`bg-red-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-red-700 focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ${
                  status === "unavailable"
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={status === "unavailable"}
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Book Now
              </button>
            </Link>
            <button
              className="p-3 bg-white/90 backdrop-blur-sm border border-amber-500/50 rounded-lg text-yellow-500 hover:text-red-600 focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
              aria-label="Add to favorites"
            >
              <FaHeart className="w-5 h-5" />
            </button>
          </div>

          {/* Additional Info */}
          <div className="border-t pt-6 mt-6 text-gray-500">
            <p style={{ fontFamily: "'Poppins', sans-serif" }}>
              <span className="font-medium">Origin:</span> Japan
            </p>
            <p style={{ fontFamily: "'Poppins', sans-serif" }}>
              <span className="font-medium">Manufactured By:</span> Toyota
            </p>
            <div className="flex items-center gap-4 mt-4">
              <span className="font-medium">Share:</span>
              <div className="flex gap-3 text-xl">
                <a
                  href="https://facebook.com"
                  className="text-yellow-500 hover:text-red-600"
                  aria-label="Share on Facebook"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://twitter.com"
                  className="text-yellow-500 hover:text-red-600"
                  aria-label="Share on Twitter"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://linkedin.com"
                  className="text-yellow-500 hover:text-red-600"
                  aria-label="Share on LinkedIn"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mt-12">
        <h3
          className="text-2xl font-semibold text-zinc-800 mb-6"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Customer Reviews
        </h3>
        <div className="space-y-6">
          {[
            {
              name: "Emma Thompson",
              rating: 4.8,
              comment:
                "Fantastic car! Smooth ride and great service from the team.",
              date: "2025-03-15",
            },
            {
              name: "Aarav Patel",
              rating: 4.5,
              comment: "Loved the car, but the GPS add-on was a bit pricey.",
              date: "2025-02-20",
            },
          ].map((review, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h4
                    className="text-lg font-semibold text-zinc-800"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {review.name}
                  </h4>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill={
                          star <= Math.round(review.rating)
                            ? "#F59E0B"
                            : "#D1D5DB"
                        }
                      >
                        <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <span
                  className="text-gray-500 text-sm"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {review.date}
                </span>
              </div>
              <p
                className="text-gray-500 mt-2"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
