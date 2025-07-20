import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { RiEditCircleLine } from "react-icons/ri";
import { FcCancel } from "react-icons/fc";
import { toast } from "sonner";
import { BsArrowUpRightSquareFill } from "react-icons/bs";
import { SiPayoneer } from "react-icons/si";
import { IoCloseCircleOutline } from "react-icons/io5";
import {
  useCancelBookingMutation,
  useGetUserBookingsQuery,
  useUpdateBookingMutation,
} from "../../../redux/features/booking/bookingApi";
import { TBooking } from "../../../pages/Booking";
import UpdateBookingModal from "../components/modal/UpdateBookingModal";
import PaymentModal from "../components/modal/PaymentModal";
import { Tooltip } from "react-tooltip";

// Error Modal Component
interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  errorMessage?: string;
}

const ErrorModal = ({ isOpen, onClose, errorMessage }: ErrorModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-[90%] sm:max-w-md mx-4 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3
            className="text-lg sm:text-xl font-bold text-red-600"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Unable to Modify Booking
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            aria-label="Close modal"
          >
            <IoCloseCircleOutline size={24} />
          </button>
        </div>

        <p
          className="text-gray-600 mb-6 text-base sm:text-lg"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {errorMessage ||
            "Sorry, this booking cannot be modified at this time. Please try again later or contact support."}
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-red-600 text-white rounded-lg hover:from-yellow-600 hover:to-red-700 transition-colors duration-200 text-base sm:text-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default function MyBooking() {
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [openPayModal, setOpenPayModal] = useState<boolean>(false);
  const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const { data, isLoading: bookingsLoading, refetch } =
    useGetUserBookingsQuery(undefined);
  const [updateBooking, { isLoading: updateLoading }] =
    useUpdateBookingMutation();
  const [cancelBooking, { isLoading: cancelLoading }] =
    useCancelBookingMutation();
  const [updateBookingId, setUpdateBookingId] = useState<string>("");

  const bookings: TBooking[] = data?.data || [];

  const sendReturnReq = async (bookingId: string) => {
    const currentTime = new Date();
    const hours = String(currentTime.getHours()).padStart(2, "0");
    const minutes = String(currentTime.getMinutes()).padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;

    try {
      const res = await updateBooking({
        bookingId,
        payload: { isReturnProcess: true, endTime: formattedTime },
      }).unwrap();

      if (res?.success) {
        toast.success("Return Request Sent");
        await refetch(); // refresh bookings instead of reload
      } else {
        throw new Error("Failed to send return request");
      }
    } catch (error: any) {
      setErrorMessage(error?.data?.message || "Failed to send return request");
      setOpenErrorModal(true);
    }
  };

  const cancelBookingIntoDB = async (bookingId: string, carId: string) => {
    try {
      const res = await cancelBooking({ bookingId, carId }).unwrap();

      if (res?.success) {
        toast.success("Booking Cancelled!");
        await refetch(); // refresh bookings
      } else {
        throw new Error("Failed to cancel booking");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to cancel booking");
    }
  };

  return (
    <section className="max-w-[1500px] mx-auto px-4 py-12 sm:py-16">
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
          My Bookings
        </h2>
        <p
          className="mt-3 text-gray-600 text-base sm:text-lg md:text-xl"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Manage your DriveSpark bookings with ease.
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

      <ErrorModal
        isOpen={openErrorModal}
        onClose={() => setOpenErrorModal(false)}
        errorMessage={errorMessage}
      />

      <div className="bg-white rounded-xl shadow-lg">
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
              className="text-gray-600 text-base sm:text-lg"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              No bookings found. Book your next ride with DriveSpark!
            </p>
          </div>
        )}

        {bookings.length > 0 && (
          <>
            {/* DESKTOP TABLE VIEW */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full text-sm sm:text-base text-gray-700">
                <thead>
                  <tr className="bg-gradient-to-r from-yellow-500 to-red-600 text-white">
                    <th className="px-6 py-4 rounded-tl-xl text-left">Image</th>
                    <th className="px-6 py-4 text-left">Name</th>
                    <th className="px-6 py-4 text-left">Date</th>
                    <th className="px-6 py-4 text-left">Price (1H)</th>
                    <th className="px-6 py-4 text-left">Status</th>
                    <th className="px-6 py-4 text-left">Return</th>
                    <th className="px-6 py-4 text-left">Payment</th>
                    <th className="px-6 py-4 rounded-tr-xl text-left">Actions</th>
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
                      <td className="px-6 py-4">{booking.car.name}</td>
                      <td className="px-6 py-4">
                        {new Date(booking.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 text-green-500">
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
                      >
                        {booking.status}
                      </td>
                      <td className="px-6 py-4">
                        {booking.status === "approved" &&
                        !booking.isReturnProcess ? (
                          <button
                            className="text-violet-600 hover:text-violet-800 transition-colors duration-200"
                            onClick={() => sendReturnReq(booking._id!)}
                            data-tooltip-id={`return-${booking._id}`}
                            data-tooltip-content="Send Return Request"
                          >
                            <BsArrowUpRightSquareFill size={24} />
                          </button>
                        ) : booking.isReturnProcess ? (
                          <span className="text-yellow-500">In Progress</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                        <Tooltip id={`return-${booking._id}`} />
                      </td>
                      <td className="px-6 py-4">
                        {booking.status === "completed" && !booking.isPaid ? (
                          <button
                            className="flex items-center gap-1 text-blue-500 hover:text-blue-600"
                            onClick={() => {
                              setUpdateBookingId(booking._id!);
                              setOpenPayModal(true);
                            }}
                            data-tooltip-id={`pay-${booking._id}`}
                            data-tooltip-content="Make Payment"
                          >
                            <SiPayoneer size={20} /> Pay
                          </button>
                        ) : booking.isPaid ? (
                          <span className="text-purple-500">Paid</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                        <Tooltip id={`pay-${booking._id}`} />
                      </td>
                      <td className="px-6 py-4">
                        {(booking.status === "pending" ||
                          booking.status === "approved") && (
                          <div className="flex items-center gap-4">
                            <button
                              className="text-red-500 hover:text-red-600"
                              onClick={() =>
                                cancelBookingIntoDB(
                                  booking._id!,
                                  booking.car._id!
                                )
                              }
                              data-tooltip-id={`cancel-${booking._id}`}
                              data-tooltip-content="Cancel Booking"
                            >
                              <FcCancel size={24} />
                            </button>
                            <button
                              className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                              onClick={() => {
                                setUpdateBookingId(booking._id!);
                                setOpenUpdateModal(true);
                              }}
                              data-tooltip-id={`edit-${booking._id}`}
                              data-tooltip-content="Modify Booking"
                            >
                              <RiEditCircleLine size={20} />
                            </button>
                            <Tooltip id={`cancel-${booking._id}`} />
                            <Tooltip id={`edit-${booking._id}`} />
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARD VIEW */}
            <div className="md:hidden space-y-6 p-6">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-200"
                >
                  <div className="flex items-center gap-4">
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
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {booking.car.name}
                      </h3>
                      <p className="text-base text-gray-600">
                        {new Date(booking.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6 text-base">
                    <div>
                      <span className="font-medium">Price (1H):</span>
                      <span className="text-green-500 ml-1">
                        ${booking.car.pricePerHour.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Status:</span>
                      <span
                        className={`ml-1 ${
                          booking.status === "approved"
                            ? "text-green-500"
                            : booking.status === "pending"
                            ? "text-yellow-500"
                            : booking.status === "completed"
                            ? "text-purple-500"
                            : "text-red-500"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Return:</span>
                      {booking.status === "approved" &&
                      !booking.isReturnProcess ? (
                        <button
                          className="text-violet-600 hover:text-violet-800 ml-1"
                          onClick={() => sendReturnReq(booking._id!)}
                        >
                          <BsArrowUpRightSquareFill size={20} />
                        </button>
                      ) : booking.isReturnProcess ? (
                        <span className="text-yellow-500 ml-1">In Progress</span>
                      ) : (
                        <span className="text-gray-400 ml-1">-</span>
                      )}
                    </div>
                    <div>
                      <span className="font-medium">Payment:</span>
                      {booking.status === "completed" && !booking.isPaid ? (
                        <button
                          className="flex items-center gap-1 text-blue-500 hover:text-blue-600 ml-1"
                          onClick={() => {
                            setUpdateBookingId(booking._id!);
                            setOpenPayModal(true);
                          }}
                        >
                          <SiPayoneer size={18} /> Pay
                        </button>
                      ) : booking.isPaid ? (
                        <span className="text-purple-500 ml-1">Paid</span>
                      ) : (
                        <span className="text-gray-400 ml-1">-</span>
                      )}
                    </div>
                  </div>

                  {(booking.status === "pending" ||
                    booking.status === "approved") && (
                    <div className="flex justify-end gap-4 mt-6">
                      <button
                        className="text-red-500 hover:text-red-600"
                        onClick={() =>
                          cancelBookingIntoDB(booking._id!, booking.car._id!)
                        }
                      >
                        <FcCancel size={24} />
                      </button>
                      <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        onClick={() => {
                          setUpdateBookingId(booking._id!);
                          setOpenUpdateModal(true);
                        }}
                      >
                        <RiEditCircleLine size={20} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
