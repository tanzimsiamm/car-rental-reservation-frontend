/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClipLoader } from "react-spinners";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { MdOutlinePayment } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { useGetSingleBookingQuery } from "../../../../redux/features/booking/bookingApi";
import { TBooking } from "../../../../pages/Booking";
import CheckoutForm from "../../CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

type TModalProps = {
  bookingId: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess?: () => void;
};

export default function PaymentModal({ 
  setOpen, 
  bookingId,
  onSuccess 
}: TModalProps) {
  const { data, isLoading } = useGetSingleBookingQuery(bookingId);
  const booking: TBooking = data?.data;

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-md md:max-w-lg bg-white rounded-2xl p-8 shadow-lg relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 rounded-2xl flex justify-center items-center">
            <ClipLoader
              color="#F59E0B"
              loading={isLoading}
              size={60}
              aria-label="Loading Spinner"
              speedMultiplier={0.8}
            />
          </div>
        )}

        {!isLoading && booking && (
          <>
            <section className="flex items-center gap-4 mb-6">
              <img
                className="w-24 h-16 object-contain"
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
              <div>
                <h2 className="text-lg font-semibold text-gray-800 font-poppins">
                  {booking?.car?.name || "Unknown Car"}
                </h2>
                <h3 className="text-gray-600 flex items-center gap-1 font-poppins">
                  <IoLocation size={16} />
                  {booking?.location || "N/A"}
                </h3>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="bg-gradient-to-r from-yellow-500 to-red-600 text-white w-16 h-16 rounded-full flex justify-center items-center -mt-12 mx-auto">
                <MdOutlinePayment size={30} />
              </div>
              <h2 className="text-xl font-semibold text-center mt-4 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-600 font-poppins">
                Secure Payment
              </h2>

              <Elements stripe={stripePromise}>
                <CheckoutForm 
                  booking={booking} 
                  setOpen={setOpen} 
                  onSuccess={onSuccess} 
                />
              </Elements>
            </section>
          </>
        )}
      </div>
    </section>
  );
}