import { TBooking } from "../../../pages/Booking";
import { useGetUserBookingsQuery } from "../../../redux/features/booking/bookingApi";

const BookingHistory = () => {
  const { data, isLoading, isError } = useGetUserBookingsQuery(undefined);
  const bookings: TBooking[] = data?.data || [];

  return (
    <div className="container mx-auto px-4 py-12 max-w-[1500px]">
      <div className="text-center mb-12">
        <h2
          className="text-3xl md:text-4xl font-bold"
          style={{
            fontFamily: "'Poppins', sans-serif",
            background: "linear-gradient(90deg, #F59E0B, #D97706)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Booking History
        </h2>
        <p
          className="mt-3 text-gray-600 md:text-lg"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Review your past and upcoming bookings with DriveSpark.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-500"></div>
        </div>
      ) : isError ? (
        <div className="text-center py-12">
          <p
            className="text-red-500 text-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Failed to load bookings. Please try again later.
          </p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-12">
          <p
            className="text-gray-600 text-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            No bookings found. Start your journey with DriveSpark today!
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={
                    booking.car.images[0] ||
                    "https://via.placeholder.com/300?text=Car+Image"
                  }
                  alt={booking.car.name || "Car"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/300?text=Car+Image";
                  }}
                />
              </div>
              <div className="p-6">
                <h3
                  className="text-xl font-semibold text-gray-800"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {booking.car.name} - {booking.car.color}
                </h3>
                <div
                  className="mt-4 text-gray-600 space-y-2 text-sm"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  <p>
                    <strong>Booked by:</strong> {booking.user.name} (
                    {booking.user.email})
                  </p>
                  <p>
                    <strong>Booking Date:</strong>{" "}
                    {new Date(booking.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p>
                    <strong>Price per Hour:</strong> $
                    {booking.car.pricePerHour.toFixed(2)}
                  </p>
                  <p>
                    <strong>Car Status:</strong>{" "}
                    <span
                      className={
                        booking.car.status === "available"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {booking.car.status}
                    </span>
                  </p>
                  <p>
                    <strong>Electric:</strong>{" "}
                    {booking.car.isElectric ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
