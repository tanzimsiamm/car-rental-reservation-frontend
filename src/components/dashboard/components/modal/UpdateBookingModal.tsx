/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { useEffect } from "react";
import {
  useGetSingleBookingQuery,
  useUpdateBookingMutation,
} from "../../../../redux/features/booking/bookingApi";
import { TBooking } from "../../../../pages/Booking";

type TModalProps = {
  bookingId: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UpdateBookingModal({
  open,
  setOpen,
  bookingId,
}: TModalProps) {
  const { register, handleSubmit, reset } = useForm();
  const [updateBooking, { isLoading: updateLoading }] =
    useUpdateBookingMutation();
  const {
    data,
    isLoading: dataLoading,
    isSuccess,
  } = useGetSingleBookingQuery(bookingId);
  const booking: TBooking = data?.data;

  console.log(booking);

  // Set the default values dynamically
  useEffect(() => {
    if (isSuccess) {
      reset({
        location: booking.location,
        phone: booking.phone,
        status: booking.status,
        date: booking.date,
        startTime: booking.startTime,
        paymentMethod: booking.paymentMethod,
      });
    }
  }, [reset, booking, isSuccess]);

  const onSubmit = async (data: any) => {
    const bookingData: Partial<TBooking> = {
      location: data.location,
      phone: data.phone,
      date: data.date,
      startTime: data.startTime,
      paymentMethod: data.paymentMethod,
    };
    console.log(bookingData);

    try {
      const response = await updateBooking({
        bookingId: booking._id!,
        payload: bookingData,
      }).unwrap();

      if (response?.success) {
        // close the modal
        setOpen(false);
        // show a toast
        toast.success("Booking has been updated");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  return (
    <section className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-50  bg-black/30 backdrop-blur-sm flex justify-center items-center overflow-y-auto">
      <form
        className="w-[400px] md:w-[600px] p-7 bg-white rounded-md relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* loading white layer  */}
        {dataLoading || updateLoading ? (
          <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0 bg-white/80 rounded-md flex justify-center items-center">
            <ClipLoader
              color="#000002"
              loading={dataLoading || updateLoading}
              size={60}
              aria-label="Loading Spinner"
              speedMultiplier={0.8}
            />
          </div>
        ) : (
          ""
        )}

        {/* car info  */}
        <section className="flex items-center gap-4">
          <img
            className="w-20 h-20 object-contain"
            src={booking?.car?.images[0]}
          />

          <h2 className="inter-bold text-zinc-600">{booking?.car?.name}</h2>
        </section>

        <div className="flex flex-col justify-start items-start mb-3">
          <label className="font-semibold">Location</label>
          <input
            type="text"
            className="outline-none border-b-2 border-gray-700 focus:border-blue-600 w-full py-1 rounded-sm"
            {...register("location")}
          />
        </div>

        <div className="flex flex-col justify-start items-start mb-3">
          <label className="font-semibold">Phone</label>
          <input
            type="text"
            className="outline-none border-b-2 border-gray-700 focus:border-blue-600 w-full py-1 rounded-sm"
            {...register("phone")}
          />
        </div>

        <div className="flex flex-col justify-start items-start mb-3">
          <label className="font-semibold">Date</label>
          <input
            type="date"
            className="outline-none border-b-2 border-gray-700 focus:border-blue-600 w-full py-1 rounded-sm"
            {...register("date")}
          />
        </div>

        <div className="flex flex-col justify-start items-start mb-3">
          <label className="font-semibold">Start time </label>
          <input
            type="time"
            className="outline-none border-b-2 border-gray-700 focus:border-blue-600 w-full py-1 rounded-sm"
            {...register("startTime")}
          />
        </div>

        <div className="flex flex-col justify-start items-start mb-3">
          <label className="font-semibold text-zinc-800">Payment Method</label>
          <select
            className=" max-w-xs outline p-2 mt-1 outline-black/20 rounded-sm outline-1 text-xs md:text-sm "
            {...register("paymentMethod")}
          >
            <option value="stripe">Stripe Payment</option>
            <option value="amr-pay">Amar Pay</option>
          </select>
        </div>

        <button
          type="submit"
          className="px-8 text-sm lg:text-base mt-6 mr-3 py-2 md:py-2 font-semibold text-white rounded transition bg-black hover:bg-gray-800 "
        >
          Modify
        </button>

        <button
          onClick={() => setOpen(!open)}
          className="px-8 text-sm lg:text-base mr-3 py-2 md:py-2 font-semibold text-white rounded transition bg-red-600 hover:bg-red-700 "
        >
          {" "}
          Close{" "}
        </button>
      </form>
    </section>
  );
}
