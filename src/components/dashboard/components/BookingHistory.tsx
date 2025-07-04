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
          {bookings.map((booking) => {
            const car = booking.car ?? {};
            const user = booking.user ?? {};
            const images = Array.isArray(car.images) ? car.images : [];

            return (
              <div
                key={booking._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={
                      images.length > 0
                        ? images[0]
                        : "https://placehold.co/300x200?text=Car+Image"
                    }
                    alt={car.name || "Car"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/300x200?text=Car+Image";
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3
                    className="text-xl font-semibold text-gray-800"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {car.name || "Unknown"} - {car.color || "N/A"}
                  </h3>
                  <div
                    className="mt-4 text-gray-600 space-y-2 text-sm"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    <p>
                      <strong>Booked by:</strong> {user.name || "N/A"} (
                      {user.email || "N/A"})
                    </p>
                    <p>
                      <strong>Booking Date:</strong>{" "}
                      {booking.date
                        ? new Date(booking.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "N/A"}
                    </p>
                    <p>
                      <strong>Price per Hour:</strong>{" "}
                      {typeof car.pricePerHour === "number"
                        ? `$${car.pricePerHour.toFixed(2)}`
                        : "N/A"}
                    </p>
                    <p>
                      <strong>Car Status:</strong>{" "}
                      <span
                        className={
                          car.status === "available"
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {car.status || "Unknown"}
                      </span>
                    </p>
                    <p>
                      <strong>Electric:</strong> {car.isElectric ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
