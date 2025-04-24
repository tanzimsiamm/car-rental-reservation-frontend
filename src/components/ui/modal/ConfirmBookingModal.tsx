import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { TBooking } from "../../../pages/Booking";
import { useCreateBookingMutation } from "../../../redux/features/booking/bookingApi";

type TModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  booking: TBooking;
};

export default function ConfirmBookingModal({ open, setOpen, booking }: TModalProps) {
  const [createBooking, { isLoading }] = useCreateBookingMutation();
  const navigate = useNavigate();

  const handleConfirmBooking = async () => {
    try {
      const res = await createBooking(booking).unwrap();
      if (res?.success) {
        toast.success("Booking confirmed successfully!");
        setOpen(false);
        navigate("/cars");
      } else {
        toast.error("Failed to confirm booking");
      }
    } catch (error) {
      toast.error("An error occurred while confirming the booking");
      console.error(error);
    }
  };

  const { car, date, location, paymentMethod, phone, startTime, user } = booking;

  // Calculate total cost (assuming 1-hour booking if no duration is provided)
  const totalCost = car.pricePerHour.toFixed(2);

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
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="flex items-center mb-6">
          <img
            src={user.image || "https://via.placeholder.com/150?text=User+Image"}
            alt={`${user.name}'s profile`}
            className="w-12 h-12 rounded-full mr-4 object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/150?text=User+Image";
            }}
          />
          <div>
            <h3
              className="text-lg font-semibold text-gray-800"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {user.name}
            </h3>
            <p
              className="text-sm text-gray-600"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {user.email}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <p
            className="text-sm text-gray-700 mb-1"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <span className="font-semibold">Date:</span>{" "}
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <p
            className="text-sm text-gray-700 mb-1"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <span className="font-semibold">Phone:</span> {phone}
          </p>
          <p
            className="text-sm text-gray-700"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <span className="font-semibold">Location:</span> {location}
          </p>
        </div>

        <div className="mb-6">
          <img
            src={car.images[0] || "https://via.placeholder.com/150?text=Car+Image"}
            alt={car.name}
            className="w-full h-40 object-cover rounded-lg mb-2"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/150?text=Car+Image";
            }}
          />
          <h3
            className="text-lg font-semibold text-gray-800 mb-1"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Car: {car.name}
          </h3>
          <p
            className="text-sm text-gray-700 mb-1"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <span className="font-semibold">Features:</span>{" "}
            {car.features.join(", ")}
          </p>
          <p
            className="text-sm text-gray-700 mb-1"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <span className="font-semibold">Cost per Hour:</span> $
            {car.pricePerHour.toFixed(2)}
          </p>
          <p
            className="text-sm text-gray-700"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <span className="font-semibold">Payment Method:</span> {paymentMethod}
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <p
            className="text-sm text-gray-700"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <span className="font-semibold">Start Time:</span> {startTime}
          </p>
          <p
            className="text-sm text-gray-700"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
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
            Confirm
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