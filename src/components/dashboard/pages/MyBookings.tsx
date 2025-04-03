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

export default function MyBooking() {
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [openPayModal, setOpenPayModal] = useState<boolean>(false);
  const { data, isLoading: bookingsLoading } =
    useGetUserBookingsQuery(undefined);
  const [updateBooking, { isLoading: updateLoading }] =
    useUpdateBookingMutation();
  const [cancelBooking] = useCancelBookingMutation();
  const [updateBookingId, setUpdateBookingId] = useState("");

  const bookings: TBooking[] = data?.data || [];

  // send return request booking
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
      location.reload();
    } else {
      toast.error("Something went wrong");
    }
  };

  // cancel booking
  const cancelBookingIntoDB = async (bookingId: string, carId: string) => {
    const res = await cancelBooking({ bookingId, carId });

    if (res?.data?.success) {
      toast.success("Booking Cancelled!");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="max-w-[1300px] mx-auto px-4 my-2 md:my-6 lg:my-10 mb-10 font-prompt">
      <div className="flex justify-center items-center mb-3">
        <h2 className="text-2xl md:text-4xl carter-one-regular text-zinc-300 ">
          My Bookings
        </h2>
      </div>

      <div className="text-right mb-7">
        {/* update booking modal  */}
        {openUpdateModal && (
          <UpdateBookingModal
            bookingId={updateBookingId}
            open={openUpdateModal}
            setOpen={setOpenUpdateModal}
          />
        )}

        {/* payment modal  */}
        {openPayModal && (
          <PaymentModal
            bookingId={updateBookingId}
            open={openPayModal}
            setOpen={setOpenPayModal}
          />
        )}
      </div>

      <div className="flex flex-col ">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-center text-sm inter-regular dark:border-neutral-500">
                <thead className=" inter-regular ">
                  <tr className="bg-amber-600 h-8 text-white/95 text-[12px] md:text-base ">
                    <th
                      scope="col"
                      className="border-r px-6 py-0 md:py-2 lg:py-4 border-zinc-600 rounded-l-2xl"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="border-r px-6 py-0 md:py-2 lg:py-4 border-zinc-600"
                    >
                      Name
                    </th>

                    <th
                      scope="col"
                      className="border-r px-6 py-0 md:py-2 lg:py-4 border-zinc-600"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="border-r px-6 py-0 md:py-2 lg:py-4 border-zinc-600"
                    >
                      Price(1H)
                    </th>
                    <th
                      scope="col"
                      className="border-r px-6 py-0 md:py-2 lg:py-4 border-zinc-600"
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="border-r border-zinc-600 px-6 py-0 md:py-2 lg:py-4  "
                    >
                      Return REQ
                    </th>

                    <th
                      scope="col"
                      className="border-r border-zinc-600 px-6 py-0 md:py-2 lg:py-4  "
                    >
                      Cancel
                    </th>

                    <th
                      scope="col"
                      className=" px-6 py-0 md:py-2 lg:py-4  rounded-r-2xl"
                    >
                      {" "}
                      Edit{" "}
                    </th>
                  </tr>
                </thead>
                <tbody className="relative">
                  {bookingsLoading && (
                    <ClipLoader
                      color="#FBBF24"
                      loading={bookingsLoading}
                      className="absolute top-14 left-2/4"
                      size={60}
                      aria-label="Loading Spinner"
                      speedMultiplier={0.8}
                    />
                  )}

                  {updateLoading && (
                    <ClipLoader
                      color="#FBBF24"
                      loading={updateLoading}
                      className="absolute top-14 left-2/4 backdrop-blur-lg"
                      size={60}
                      aria-label="Loading Spinner"
                      speedMultiplier={0.8}
                    />
                  )}

                  {bookings?.map((booking) => (
                    <tr key={booking._id} className="border-b ">
                      <td className="whitespace-nowrap border-r px-6 py-4 font-medium border-zinc-500 flex items-center justify-center">
                        <img
                          src={booking?.car?.images[0]}
                          className="w-[52px] h-[52px] md:w-16 md:h-16 object-contain rounded-full"
                        />
                      </td>
                      <td className=" border-r font-medium text-sm  text-zinc-400 text-start md:text-center px-6 py-4 border-zinc-500">
                        {booking.car.name}
                      </td>

                      <td className=" border-r font-medium text-sm   text-zinc-400 text-start md:text-center px-6 py-4 border-zinc-500">
                        {booking.date}
                      </td>

                      <td className="whitespace-nowrap font-medium text-lime-500 text-sm md:text-lg border-r px-6 py-4 border-zinc-500">
                        ${booking.car.pricePerHour}
                      </td>
                      <td className="whitespace-nowrap font-medium text-zinc-400 text-sm  border-r px-6 py-4 border-zinc-500">
                        {booking.status}
                      </td>

                      {booking.status === "approved" ? (
                        <td className="whitespace-nowrap font-medium text-zinc-400 text-sm  border-r px-6 py-4 border-zinc-500">
                          {booking.isReturnProcess === true ? (
                            <span className="text-amber-500">IN Progress</span>
                          ) : (
                            <button
                              className={` bg-white text-violet-600 rounded font-semibold transition-all md:text-3xl `}
                              onClick={() => {
                                sendReturnReq(booking._id!);
                              }}
                            >
                              {" "}
                              <BsArrowUpRightSquareFill />{" "}
                            </button>
                          )}
                        </td>
                      ) : (
                        <>
                          {" "}
                          <span> </span>
                        </>
                      )}

                      {booking.status === "completed" ? (
                        <td className="whitespace-nowrap font-medium text-zinc-400 text-sm  border-r px-6 py-4 border-zinc-500">
                          {booking.isPaid ? (
                            <span className="text-lg text-purple-500">
                              Paid
                            </span>
                          ) : (
                            <button
                              className={` text-blue-500 hover:text-blue-600 flex items-center gap-1 rounded carter-one-regular transition-all md:text-xl `}
                              onClick={() => {
                                setUpdateBookingId(booking._id!);
                                setOpenPayModal(true);
                              }}
                            >
                              {" "}
                              <SiPayoneer /> PAY
                            </button>
                          )}
                        </td>
                      ) : (
                        <>
                          {" "}
                          <span> </span>
                        </>
                      )}

                      {booking.status === "pending" ? (
                        <>
                          {" "}
                          <td className="whitespace-nowrap font-medium  text-sm md:text-lg  px-6 py-4 border border-zinc-400">
                            {/* delete product  */}
                            <button
                              className={`  text-white rounded font-semibold transition-all md:text-2xl `}
                              onClick={() =>
                                cancelBookingIntoDB(
                                  booking._id!,
                                  booking.car._id!
                                )
                              }
                            >
                              <FcCancel />
                            </button>
                          </td>
                          <td className="whitespace-nowrap font-medium border-r text-sm md:text-lg  px-6 py-4 border-zinc-500">
                            <button
                              className={`bg-blue-700 p-1 px-2 md:py-2  text-white rounded font-semibold transition-all hover:bg-blue-800 text-[12px] md:text-base `}
                              onClick={() => {
                                setUpdateBookingId(booking._id!);
                                setOpenUpdateModal(true);
                              }}
                            >
                              <RiEditCircleLine />
                            </button>
                          </td>
                        </>
                      ) : (
                        <></>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              {!bookings?.length && (
                <p className="text-xl text-center mt-44 text-gray-500">
                  {" "}
                  No Bookings{" "}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
