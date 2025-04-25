import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { RiEditCircleLine } from "react-icons/ri";
import { FcCancel } from "react-icons/fc";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { toast } from "sonner";
import {
  useCancelBookingMutation,
  useGetBookingsQuery,
  useUpdateBookingMutation,
} from "../../../redux/features/booking/bookingApi";
import { useReturnCarMutation } from "../../../redux/features/car/carApi";
import { TBooking } from "../../../pages/Booking";
import UpdateBookingModal from "../components/modal/UpdateBookingModal";

export default function ManageBooking() {
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const { data, isLoading: bookingsLoading } = useGetBookingsQuery(undefined);
  const [updateBooking, { isLoading: updateLoading }] =
    useUpdateBookingMutation();
  const [cancelBooking, { isLoading: cancelLoading }] =
    useCancelBookingMutation();
  const [returnCar] = useReturnCarMutation();
  const [updateBookingId, setUpdateBookingId] = useState("");

  const bookings: TBooking[] = data?.data || [];

  const approveBooking = async (bookingId: string) => {
    const res = await updateBooking({
      bookingId,
      payload: { status: "approved" },
    });

    if (res?.data?.success) {
      toast.success("Booking Approved!");
    } else {
      toast.error("Failed to approve booking");
    }
  };

  const cancelBookingIntoDB = async (bookingId: string, carId: string) => {
    const res = await cancelBooking({ bookingId, carId });

    if (res?.data?.success) {
      toast.success("Booking Cancelled!");
    } else {
      toast.error("Failed to cancel booking");
    }
  };

  const confirmReturnBooking = async (bookingId: string) => {
    const res = await returnCar({ bookingId });

    if (res?.data?.success) {
      toast.success("Car Returned Successfully");
    } else {
      toast.error("Failed to process return");
    }
  };

  return (
    <section className="max-w-[1500px] mx-auto px-4 py-12">
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
          Manage Bookings
        </h2>
        <div
          className="mt-3 text-gray-600 space-y-1 text-sm"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <p>◽ Gray background indicates a car return request.</p>
          <p>◽ Click the approve icon to confirm a booking.</p>
        </div>
      </div>

      {openUpdateModal && (
        <UpdateBookingModal
          bookingId={updateBookingId}
          open={openUpdateModal}
          setOpen={setOpenUpdateModal}
        />
      )}

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        {(bookingsLoading || updateLoading || cancelLoading) && (
          <div className="flex justify-center items-center py-12">
            <ClipLoader
              color="#F59E0B"
              loading={bookingsLoading || updateLoading || cancelLoading}
              size={60}
              aria-label="Loading Spinner"
              speedMultiplier={0.8}
            />
          </div>
        )}

        {!bookingsLoading && !bookings.length && (
          <div className="text-center py-12">
            <p
              className="text-gray-600 text-lg"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              No bookings found.
            </p>
          </div>
        )}

        {bookings.length > 0 && (
          <table className="min-w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-gradient-to-r from-yellow-500 to-red-600 text-white">
                <th
                  className="px-6 py-4 rounded-tl-xl text-left"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Image
                </th>
                <th
                  className="px-6 py-4 text-left"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Name
                </th>
                <th
                  className="px-6 py-4 text-left"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  User
                </th>
                <th
                  className="px-6 py-4 text-left"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Date
                </th>
                <th
                  className="px-6 py-4 text-left"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Price (1H)
                </th>
                <th
                  className="px-6 py-4 text-left"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Status
                </th>
                <th
                  className="px-6 py-4 text-left"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Approve
                </th>
                <th
                  className="px-6 py-4 text-left"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Cancel
                </th>
                <th
                  className="px-6 py-4 rounded-tr-xl text-left"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className={`border-b border-gray-200 relative hover:bg-gray-50 transition-colors duration-200 ${
                    booking.isReturnProcess ? "bg-yellow-500/10" : ""
                  }`}
                >
                  {booking.isReturnProcess && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <button
                        className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300"
                        onClick={() => confirmReturnBooking(booking._id!)}
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        Approve Return
                      </button>
                    </div>
                  )}
                  <td className="px-6 py-4">
                    <img
                      src={
                        booking?.car?.images[0] ||
                        "https://via.placeholder.com/150?text=Car+Image"
                      }
                      alt={booking.car.name}
                      className="w-16 h-16 object-contain rounded-full"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/150?text=Car+Image";
                      }}
                    />
                  </td>
                  <td
                    className="px-6 py-4 text-gray-800"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {booking.car.name}
                  </td>
                  <td
                    className="px-6 py-4 text-gray-600"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {booking.user.email}
                  </td>
                  <td
                    className="px-6 py-4 text-gray-600"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {new Date(booking.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td
                    className="px-6 py-4 text-green-500"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    ${booking.car.pricePerHour.toFixed(2)}
                  </td>
                  <td
                    className={`px-6 py-4 ${
                      booking.status === "approved"
                        ? "text-green-500"
                        : booking.status === "pending"
                        ? "text-yellow-500"
                        : booking.status === "completed"
                        ? "text-purple-500"
                        : "text-red-500"
                    }`}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {booking.status}
                  </td>
                  <td className="px-6 py-4">
                    {booking.status === "cancelled" ||
                    booking.status === "completed" ? (
                      <span className="text-gray-400">-</span>
                    ) : (
                      <button
                        className="text-green-500 hover:text-green-600 transition-colors duration-200"
                        onClick={() => approveBooking(booking._id!)}
                        aria-label="Approve booking"
                      >
                        <IoShieldCheckmarkSharp size={24} />
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {booking.status === "cancelled" ||
                    booking.status === "completed" ? (
                      <span className="text-gray-400">-</span>
                    ) : (
                      <button
                        className="text-red-500 hover:text-red-600 transition-colors duration-200"
                        onClick={() =>
                          cancelBookingIntoDB(booking._id!, booking.car._id!)
                        }
                        aria-label="Cancel booking"
                      >
                        <FcCancel size={24} />
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {booking.status === "cancelled" ||
                    booking.status === "completed" ? (
                      <span className="text-gray-400">-</span>
                    ) : (
                      <button
                        className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        onClick={() => {
                          setUpdateBookingId(booking._id!);
                          setOpenUpdateModal(true);
                        }}
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        <RiEditCircleLine size={20} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
