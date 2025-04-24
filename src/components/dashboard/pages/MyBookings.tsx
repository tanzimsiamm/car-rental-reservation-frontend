import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { RiEditCircleLine } from "react-icons/ri";
import { FcCancel } from "react-icons/fc";
import { toast } from "sonner";
import { BsArrowUpRightSquareFill } from "react-icons/bs";
import { SiPayoneer } from "react-icons/si";
import {
  useCancelBookingMutation,
  useGetUserBookingsQuery,
  useUpdateBookingMutation,
} from "../../../redux/features/booking/bookingApi";
import { TBooking } from "../../../pages/Booking";
import UpdateBookingModal from "../components/modal/UpdateBookingModal";
import PaymentModal from "../components/modal/PaymentModal";
import { Tooltip } from "react-tooltip";

export default function MyBooking() {
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [openPayModal, setOpenPayModal] = useState<boolean>(false);
  const { data, isLoading: bookingsLoading } = useGetUserBookingsQuery(undefined);
  const [updateBooking, { isLoading: updateLoading }] = useUpdateBookingMutation();
  const [cancelBooking, { isLoading: cancelLoading }] = useCancelBookingMutation();
  const [updateBookingId, setUpdateBookingId] = useState("");

  const bookings: TBooking[] = data?.data || [];

  const sendReturnReq = async (bookingId: string) => {
    const currentTime = new Date();
    const hours = String(currentTime.getHours()).padStart(2, "0");
    const minutes = String(currentTime.getMinutes()).padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;

    const res = await updateBooking({
      bookingId,
      payload: { isReturnProcess: true, endTime: formattedTime },
    });

    if (res?.data?.success) {
      toast.success("Return Request Sent");
      window.location.reload();
    } else {
      toast.error("Failed to send return request");
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
          My Bookings
        </h2>
        <p
          className="mt-3 text-gray-600 md:text-lg"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Manage your ZipCar bookings with ease.
        </p>
      </div>

      {openUpdateModal && (
        <UpdateBookingModal
          bookingId={updateBookingId}
          open={openUpdateModal}
          setOpen={setOpenUpdateModal}
        />
      )}

      {openPayModal && (
        <PaymentModal
          bookingId={updateBookingId}
          open={openPayModal}
          setOpen={setOpenPayModal}
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
              No bookings found. Book your next ride with ZipCar!
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
                  Return Request
                </th>
                <th
                  className="px-6 py-4 text-left"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Payment
                </th>
                <th
                  className="px-6 py-4 rounded-tr-xl text-left"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                >
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
                    {booking.status === "approved" && !booking.isReturnProcess ? (
                      <button
                        className="text-violet-600 hover:text-violet-800 transition-colors duration-200"
                        onClick={() => sendReturnReq(booking._id!)}
                        data-tooltip-id={`return-${booking._id}`}
                        data-tooltip-content="Send Return Request"
                        aria-label="Send return request"
                      >
                        <BsArrowUpRightSquareFill size={24} />
                      </button>
                    ) : booking.isReturnProcess ? (
                      <span
                        className="text-yellow-500"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        In Progress
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                    <Tooltip id={`return-${booking._id}`} />
                  </td>
                  <td className="px-6 py-4">
                    {booking.status === "completed" && !booking.isPaid ? (
                      <button
                        className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors duration-200"
                        onClick={() => {
                          setUpdateBookingId(booking._id!);
                          setOpenPayModal(true);
                        }}
                        data-tooltip-id={`pay-${booking._id}`}
                        data-tooltip-content="Make Payment"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        <SiPayoneer size={20} /> Pay
                      </button>
                    ) : booking.isPaid ? (
                      <span
                        className="text-purple-500"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        Paid
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                    <Tooltip id={`pay-${booking._id}`} />
                  </td>
                  <td className="px-6 py-4">
                    {(booking.status === "pending" || booking.status === "approved") ? (
                      <div className="flex items-center gap-4">
                        <button
                          className="text-red-500 hover:text-red-600 transition-colors duration-200"
                          onClick={() =>
                            cancelBookingIntoDB(booking._id!, booking.car._id!)
                          }
                          data-tooltip-id={`cancel-${booking._id}`}
                          data-tooltip-content="Cancel Booking"
                          aria-label="Cancel booking"
                        >
                          <FcCancel size={24} />
                        </button>
                        <button
                          className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                          onClick={() => {
                            setUpdateBookingId(booking._id!);
                            setOpenUpdateModal(true);
                          }}
                          data-tooltip-id={`edit-${booking._id}`}
                          data-tooltip-content="Modify Booking"
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          <RiEditCircleLine size={20} />
                        </button>
                        <Tooltip id={`cancel-${booking._id}`} />
                        <Tooltip id={`edit-${booking._id}`} />
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
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