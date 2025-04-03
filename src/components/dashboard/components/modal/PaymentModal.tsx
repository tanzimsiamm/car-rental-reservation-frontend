/* eslint-disable @typescript-eslint/no-explicit-any */

import { ClipLoader } from "react-spinners";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { MdOutlinePayment } from "react-icons/md";
import CheckoutForm from "../../CheckOutForm";
import { IoLocation } from "react-icons/io5";
import { useGetSingleBookingQuery } from "../../../../redux/features/booking/bookingApi";
import { TBooking } from "../../../../pages/Booking";

// get stripe promise with publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

type TModalProps = {
  bookingId: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PaymentModal({ setOpen, bookingId }: TModalProps) {
  const { data, isLoading } = useGetSingleBookingQuery(bookingId);
  const booking: TBooking = data?.data;

  return (
    <section className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-50  bg-black/30 backdrop-blur-sm flex justify-center items-center overflow-y-auto">
      <div className="w-[400px] md:w-[600px] p-7 bg-white rounded-md relative">
        {/* loading white layer  */}
        {isLoading ? (
          <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0 bg-white/80 rounded-md flex justify-center items-center">
            <ClipLoader
              color="#000002"
              loading={isLoading}
              size={60}
              aria-label="Loading Spinner"
              speedMultiplier={0.8}
            />
          </div>
        ) : (
          ""
        )}

        {/* car infro  */}
        <section className="flex items-center gap-3">
          <img
            className="md:w-36 h-20 object-contain"
            src={booking?.car?.images[0]}
          />

          <div>
            <h2 className="inter-bold text-zinc-600 text-left">
              {booking?.car?.name}
            </h2>
            <h2 className=" text-zinc-600 flex items-center gap-2">
              <IoLocation /> {booking?.location}
            </h2>
          </div>
        </section>

        {/* payment   */}
        <section className="max-w-5xl mx-auto shadow-xl rounded-md border p-5 mt-12">
          <div className="bg-amber-500 text-white/80 w-16 h-16 rounded-full -mt-14 mx-auto flex justify-center items-center p-2">
            <MdOutlinePayment size={35} />
          </div>
          <h2 className="uppercase text-gray-500  text-[21px] font-semibold text-center my-2">
            {" "}
            secure payment info{" "}
          </h2>

          <Elements stripe={stripePromise}>
            <CheckoutForm booking={booking} setOpen={setOpen} />
          </Elements>
        </section>
      </div>
    </section>
  );
}
