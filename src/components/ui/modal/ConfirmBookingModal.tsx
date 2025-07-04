/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { TBooking } from "../../../pages/Booking"; // Assuming this path is correct
import { useCreateBookingMutation } from "../../../redux/features/booking/bookingApi"; // Assuming this path is correct

// --- Fallback Image URLs ---
// It's highly recommended to use local assets for default images
// Example: import defaultUserImage from '/path/to/assets/default-user.png';
// Example: import defaultCarImage from '/path/to/assets/default-car.png';

// For demonstration, using external placeholder services. Choose reliable ones.
const DEFAULT_USER_IMAGE = "https://i.pravatar.cc/150?img=68"; // A commonly used, more reliable avatar placeholder
const DEFAULT_CAR_IMAGE = "https://via.placeholder.com/200x120?text=No+Car+Image"; // A basic placeholder

type TModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  booking: TBooking;
};

export default function ConfirmBookingModal({
  open,
  setOpen,
  booking,
}: TModalProps) {
  const [createBooking, { isLoading }] = useCreateBookingMutation();
  const navigate = useNavigate();

  // Destructure booking properties with default empty objects/values for safety
  const {
    car = {} as TBooking['car'], // Default to an empty car object to prevent errors if car is undefined
    date = "",
    location = "",
    paymentMethod = "",
    phone = "",
    startTime = "",
    user = {} as TBooking['user'], // Default to an empty user object
  } = booking || {}; // Ensure booking itself is not null/undefined

  // Calculate total cost safely
  const totalCost = car?.pricePerHour ? car.pricePerHour.toFixed(2) : "0.00";

  const handleConfirmBooking = async () => {
    // Add client-side validation before attempting booking creation if needed
    if (!booking || !booking.user || !booking.car) {
      toast.error("Booking data is incomplete. Please try again.");
      return;
    }

    try {
      // The `createBooking` mutation expects a `TBooking` object.
      // Ensure the 'user' and 'car' fields contain the full objects as expected by the frontend TBooking,
      // but remember on the backend they will be converted to ObjectIds if your schema uses refs.
      const res = await createBooking(booking).unwrap();

      if (res?.success) {
        toast.success("Booking confirmed successfully!");
        setOpen(false); // Close the modal
        navigate("/cars"); // Redirect after successful booking
      } else {
        // Handle API success: false, but no explicit error message
        toast.error(res?.message || "Failed to confirm booking.");
      }
    } catch (error: any) {
      // Handle API errors (e.g., network errors, server-side validation errors)
      console.error("Booking confirmation error:", error);
      toast.error(error.data?.message || "An error occurred while confirming the booking.");
    }
  };

  if (!open) return null; // Render nothing if the modal is not open

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto px-4 md:px-0">
      <div className="w-full max-w-md md:max-w-lg bg-white rounded-2xl p-6 md:p-8 shadow-lg relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 rounded-2xl flex justify-center items-center">
            <ClipLoader
              color="#F59E0B"
              loading={isLoading}
              size={60}
              aria-label="Loading Spinner"
              speedMultiplier={0.8}
            />
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2
            className="text-2xl font-bold"
            style={{
              fontFamily: "'Poppins', sans-serif",
              background: "linear-gradient(90deg, #F59E0B, #D97706)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Confirm Your Booking
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            aria-label="Close booking confirmation modal"
          >
            ×
          </button>
        </div>

        {/* User Info Section */}
        {user.name || user.email ? ( // Only render if user has at least a name or email
          <div className="flex items-center mb-6">
            <img
              src={user.image || DEFAULT_USER_IMAGE}
              alt={`${user.name || 'User'}'s profile`}
              className="w-12 h-12 rounded-full mr-4 object-cover"
              onError={(e) => {
                // Set a permanent fallback and prevent further errors for this element
                e.currentTarget.src = DEFAULT_USER_IMAGE;
                e.currentTarget.onerror = null;
              }}
            />
            <div>
              <h3
                className="text-lg font-semibold text-gray-800"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {user.name || "N/A"}
              </h3>
              <p
                className="text-sm text-gray-600"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {user.email || "N/A"}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 mb-6">User information not available.</p>
        )}

        {/* Booking Details */}
        <div className="mb-6">
          <p className="text-sm text-gray-700 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <span className="font-semibold">Date:</span>{" "}
            {date ? new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "N/A"}
          </p>
          <p className="text-sm text-gray-700 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <span className="font-semibold">Phone:</span> {phone || "N/A"}
          </p>
          <p className="text-sm text-gray-700" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <span className="font-semibold">Location:</span> {location || "N/A"}
          </p>
        </div>

        {/* Car Info Section */}
        {car.name || car.images?.[0] ? ( // Only render if car has at least a name or image
          <div className="mb-6">
            <img
              src={car.images?.[0] || DEFAULT_CAR_IMAGE}
              alt={car.name || "Car Image"}
              className="w-full h-40 object-cover rounded-lg mb-2"
              onError={(e) => {
                // Set a permanent fallback and prevent further errors for this element
                e.currentTarget.src = DEFAULT_CAR_IMAGE;
                e.currentTarget.onerror = null;
              }}
            />
            <h3
              className="text-lg font-semibold text-gray-800 mb-1"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Car: {car.name || "N/A"}
            </h3>
            <p
              className="text-sm text-gray-700 mb-1"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <span className="font-semibold">Features:</span>{" "}
              {car.features && car.features.length > 0 ? car.features.join(", ") : "N/A"}
            </p>
            <p
              className="text-sm text-gray-700 mb-1"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <span className="font-semibold">Cost per Hour:</span> ${car.pricePerHour?.toFixed(2) || "0.00"}
            </p>
            <p
              className="text-sm text-gray-700"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <span className="font-semibold">Payment Method:</span> {paymentMethod || "N/A"}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 mb-6">Car information not available.</p>
        )}


        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-700" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <span className="font-semibold">Start Time:</span> {startTime || "N/A"}
          </p>
          <p className="text-sm text-gray-700" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <span className="font-semibold">Total Cost:</span> ${totalCost}
          </p>
        </div>

        <div className="flex gap-4 justify-end">
          <button
            onClick={handleConfirmBooking}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-yellow-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            disabled={isLoading}
            aria-label="Confirm booking"
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" loading={isLoading} size={20} aria-label="Confirming..." />
            ) : (
              "Confirm"
            )}
          </button>
          <button
            onClick={() => setOpen(false)}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            aria-label="Cancel booking"
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
}