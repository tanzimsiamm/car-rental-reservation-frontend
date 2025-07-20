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
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updateBookingId, setUpdateBookingId] = useState("");
  const { data, isLoading: bookingsLoading } = useGetBookingsQuery(undefined);
  const [updateBooking, { isLoading: updateLoading }] =
    useUpdateBookingMutation();
  const [cancelBooking, { isLoading: cancelLoading }] =
    useCancelBookingMutation();
  const [returnCar] = useReturnCarMutation();

  const bookings: TBooking[] = data?.data || [];

  const approveBooking = async (bookingId: string) => {
    if (!bookingId) return;
    const res = await updateBooking({
      bookingId,
      payload: { status: "approved" },
    });
    res?.data?.success
      ? toast.success("Booking Approved!")
      : toast.error("Failed to approve booking");
  };

  const cancelBookingIntoDB = async (bookingId: string, carId: string) => {
    if (!bookingId || !carId) return;
    const res = await cancelBooking({ bookingId, carId });
    res?.data?.success
      ? toast.success("Booking Cancelled!")
      : toast.error("Failed to cancel booking");
  };

  const confirmReturnBooking = async (bookingId: string) => {
    if (!bookingId) return;
    const res = await returnCar({ bookingId });
    res?.data?.success
      ? toast.success("Car Returned Successfully")
      : toast.error("Failed to process return");
  };

  return (
    <section className="max-w-[1500px] mx-auto px-4 py-6 sm:py-12">
      <div className="text-center mb-8 sm:mb-12">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold"
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
          className="mt-2 sm:mt-3 text-gray-600 space-y-1 text-xs sm:text-sm"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <p>◽ Gray background indicates a car return request.</p>
          <p>◽ Hover on icons to see actions.</p>
        </div>
      </div>

      {openUpdateModal && (
        <UpdateBookingModal
          bookingId={updateBookingId}
          open={openUpdateModal}
          setOpen={setOpenUpdateModal}
        />
      )}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {(bookingsLoading || updateLoading || cancelLoading) && (
          <div className="flex justify-center items-center py-12">
            <ClipLoader color="#F59E0B" size={60} speedMultiplier={0.8} />
          </div>
        )}

        {!bookingsLoading && bookings.length === 0 && (
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
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
              <thead>
                <tr className="bg-gradient-to-r from-yellow-500 to-red-600 text-white">
                  <th className="px-3 py-2 sm:px-4 sm:py-3 text-left">Image</th>
                  <th className="px-3 py-2 sm:px-4 sm:py-3 text-left hidden sm:table-cell">
                    Name
                  </th>
                  <th className="px-3 py-2 sm:px-4 sm:py-3 text-left hidden md:table-cell">
                    User
                  </th>
                  <th className="px-3 py-2 sm:px-4 sm:py-3 text-left">Date</th>
                  <th className="px-3 py-2 sm:px-4 sm:py-3 text-left hidden sm:table-cell">
                    Price
                  </th>
                  <th className="px-3 py-2 sm:px-4 sm:py-3 text-left">
                    Status
                  </th>
                  <th className="px-3 py-2 sm:px-4 sm:py-3 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => {
                  const car = booking?.car;
                  const user = booking?.user;
                  const bookingId = booking?._id || "";
                  const carId = car?._id || "";

                  return (
                    <tr
                      key={bookingId}
                      className={`border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200 relative ${
                        booking.isReturnProcess ? "bg-yellow-100" : ""
                      }`}
                    >
                      {booking.isReturnProcess && (
                        <td
                          colSpan={7}
                          className="absolute inset-0 flex justify-center items-center bg-black/50 z-10"
                        >
                          <button
                            onClick={() => confirmReturnBooking(bookingId)}
                            className="bg-green-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-green-700 transition-all duration-300 text-sm sm:text-base"
                            title="Click to approve car return"
                          >
                            Approve Return
                          </button>
                        </td>
                      )}

                      <td className="px-3 py-2 sm:px-4 sm:py-3 z-0">
                        <img
                          src={
                            car?.images?.[0] ||
                            "https://via.placeholder.com/150?text=Car+Image"
                          }
                          alt={car?.name || "Car Image"}
                          className="w-10 h-10 sm:w-14 sm:h-14 object-cover rounded-full"
                        />
                      </td>
                      <td className="px-3 py-2 sm:px-4 sm:py-3 hidden sm:table-cell">
                        <div className="truncate max-w-[120px] md:max-w-[180px]">
                          {car?.name || "Unknown"}
                        </div>
                      </td>
                      <td className="px-3 py-2 sm:px-4 sm:py-3 hidden md:table-cell">
                        <div className="truncate max-w-[120px]">
                          {user?.email || "Unknown"}
                        </div>
                      </td>
                      <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap">
                        {new Date(booking.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-3 py-2 sm:px-4 sm:py-3 text-green-500 hidden sm:table-cell">
                        ${car?.pricePerHour?.toFixed(2) || "0.00"}
                      </td>
                      <td
                        className={`px-3 py-2 sm:px-4 sm:py-3 font-semibold whitespace-nowrap ${
                          booking.status === "approved"
                            ? "text-green-600"
                            : booking.status === "pending"
                            ? "text-yellow-600"
                            : booking.status === "completed"
                            ? "text-purple-600"
                            : "text-red-600"
                        }`}
                      >
                        {booking.status}
                      </td>
                      <td className="px-3 py-2 sm:px-4 sm:py-3">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          {["cancelled", "completed"].includes(
                            booking.status ?? ""
                          ) ? (
                            <span className="text-gray-400">-</span>
                          ) : (
                            <>
                              <button
                                onClick={() => approveBooking(bookingId)}
                                className="text-green-600 hover:text-green-700"
                                title="Approve Booking"
                              >
                                <IoShieldCheckmarkSharp
                                  size={18}
                                  className="sm:w-5 sm:h-5"
                                />
                              </button>
                              <button
                                onClick={() =>
                                  cancelBookingIntoDB(bookingId, carId)
                                }
                                className="text-red-500 hover:text-red-600"
                                title="Cancel Booking"
                              >
                                <FcCancel size={18} className="sm:w-5 sm:h-5" />
                              </button>
                              <button
                                onClick={() => {
                                  setUpdateBookingId(bookingId);
                                  setOpenUpdateModal(true);
                                }}
                                className="bg-blue-600 text-white p-1 rounded hover:bg-blue-700"
                                title="Edit Booking"
                              >
                                <RiEditCircleLine
                                  size={16}
                                  className="sm:w-4 sm:h-4"
                                />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
