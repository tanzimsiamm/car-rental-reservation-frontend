import { TBooking } from "../../../pages/Booking";
import { useGetUserBookingsQuery } from "../../../redux/features/booking/bookingApi";

const BookingHistory = () => {
  const { data } = useGetUserBookingsQuery(undefined);

  const bookings: TBooking[] = data?.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center my-16">
        <h2 className="text-3xl lg:text-4xl carter-one-regular text-center text-gray-300 ">
          Booking History
        </h2>
        <p className=" mt-2 text-gray-400 lg:text-lg">
          Explore a wide variety of vehicles we have to offer for every journey.
        </p>
      </div>

      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="card bg-[#171A21] shadow-xl mb-6 p-4 flex flex-col md:flex-row"
        >
          <div className="md:w-1/3">
            <img
              src={booking.car.images[0]}
              alt={booking.car.name}
              className="w-full h-48 object-cover rounded"
            />
          </div>
          <div className="md:w-2/3 p-4">
            <h3 className="text-xl text-amber-500 font-semibold">
              {booking.car.name} - {booking.car.color}
            </h3>

            <div className="mt-4 text-zinc-400">
              <p>
                <strong>Booked by:</strong> {booking.user.name} (
                {booking.user.email})
              </p>
              <p>
                <strong>Booking Date:</strong>{" "}
                {new Date(booking.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Price per Hour:</strong> ${booking.car.pricePerHour}
              </p>
              <p>
                <strong>Car Status:</strong> {booking.car.status}
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
  );
};

export default BookingHistory;
