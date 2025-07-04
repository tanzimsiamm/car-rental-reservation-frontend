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
  onSuccess?: () => void;
};

export default function UpdateBookingModal({
  setOpen,
  bookingId,
  onSuccess,
}: TModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [updateBooking, { isLoading: updateLoading }] =
    useUpdateBookingMutation();
  const {
    data,
    isLoading: dataLoading,
    isSuccess,
  } = useGetSingleBookingQuery(bookingId);
  const booking: TBooking = data?.data;

  useEffect(() => {
    if (isSuccess && booking) {
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

    try {
      const response = await updateBooking({
        bookingId: booking._id!,
        payload: bookingData,
      }).unwrap();

      if (response?.success) {
        setOpen(false);
        toast.success("Booking updated successfully");
        onSuccess?.();
      }
    } catch (error) {
      toast.error("Failed to update booking");
      console.error(error);
    }
  };

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md md:max-w-lg bg-white rounded-2xl p-8 shadow-lg relative"
      >
        {(dataLoading || updateLoading) && (
          <div className="absolute inset-0 bg-white/80 rounded-2xl flex justify-center items-center">
            <ClipLoader
              color="#F59E0B"
              loading={dataLoading || updateLoading}
              size={60}
              aria-label="Loading Spinner"
              speedMultiplier={0.8}
            />
          </div>
        )}

        {booking && (
          <>
            <section className="flex items-center gap-4 mb-6">
              <img
                className="w-20 h-20 object-contain rounded-lg"
                src={
                  booking?.car?.images[0] ||
                  "https://via.placeholder.com/150?text=Car+Image"
                }
                alt={booking?.car?.name}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/150?text=Car+Image";
                }}
              />
              <h2 className="text-lg font-semibold text-gray-800 font-poppins">
                {booking?.car?.name || "Unknown Car"}
              </h2>
            </section>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">
                Location
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300 font-poppins"
                {...register("location", { required: "Location is required" })}
              />
              {errors.location && (
                <span className="text-red-500 text-sm">
                  {errors.location.message as string}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">
                Phone
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300 font-poppins"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\+?[1-9]\d{1,14}$/,
                    message: "Invalid phone number",
                  },
                })}
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">
                  {errors.phone.message as string}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">
                Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300 font-poppins"
                {...register("date", { required: "Date is required" })}
              />
              {errors.date && (
                <span className="text-red-500 text-sm">
                  {errors.date.message as string}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">
                Start Time
              </label>
              <input
                type="time"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300 font-poppins"
                {...register("startTime", {
                  required: "Start time is required",
                })}
              />
              {errors.startTime && (
                <span className="text-red-500 text-sm">
                  {errors.startTime.message as string}
                </span>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">
                Payment Method
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300 font-poppins"
                {...register("paymentMethod", {
                  required: "Payment method is required",
                })}
              >
                <option value="stripe">Stripe Payment</option>
                <option value="amr-pay">Amar Pay</option>
              </select>
              {errors.paymentMethod && (
                <span className="text-red-500 text-sm">
                  {errors.paymentMethod.message as string}
                </span>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-poppins"
                disabled={dataLoading || updateLoading}
              >
                Modify
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-full bg-gray-600 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 focus:ring-2 focus:ring-yellow-500 transition-all duration-300 font-poppins"
              >
                Close
              </button>
            </div>
          </>
        )}
      </form>
    </section>
  );
}
