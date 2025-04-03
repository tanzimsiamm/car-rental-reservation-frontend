/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { useSavePaymentMutation } from "../../redux/features/payment/paymentApi";
import { useUpdateBookingMutation } from "../../redux/features/booking/bookingApi";
import { TBooking } from "../../pages/Booking";
import { useAppSelector } from "../../redux/hooks";

export default function CheckoutForm({
  booking,
  setOpen,
}: {
  booking: TBooking;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { _id, totalCost } = booking || {};
  const [savePayment] = useSavePaymentMutation();
  const [updateBooking] = useUpdateBookingMutation();

  const currentUser = useAppSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);

  const [clientSecret, setClientSecret] = useState({});
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (totalCost) {
      // http://localhost:3000
      // https://assignment-three-seven.vercel.app/api/payments/create-payment-intent
      fetch("http://localhost:3000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ totalCost, currency: "usd" }),
      })
        .then((data) => data.json())
        .then((res) => setClientSecret(res.data));
    }
  }, [totalCost]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    // get input field value from CardElement , this is internal mechanism
    const card = elements.getElement(CardElement);

    if (card === null) {
      setLoading(false);
      return;
    }

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setLoading(false);
      console.log(error);
    } else {
      console.log("payment method", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret as string, {
        payment_method: {
          card: card,
          billing_details: {
            name: currentUser?.name,
            email: currentUser?.email,
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
      setLoading(false);
    }

    if (paymentIntent?.status === "succeeded") {
      // now save the payment in database
      const payment = {
        email: currentUser?.email,
        cost: Number(totalCost),
        bookingId: _id,
        transactionId: paymentIntent.id,
        date: new Date(),
      };

      const res = await savePayment(payment);

      if (res.data?.success) {
        await updateBooking({
          bookingId: _id!,
          payload: { isPaid: true },
        }).unwrap();

        toast.success("Payment Successful");
        setLoading(false);
        setOpen(false);
      } else {
        toast.error("something wrong");
      }
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h2 className="uppercase text-gray-400 md:text-[17px] font-semibold text-center my-6 ">
          {" "}
          Total : {totalCost?.toFixed(1)} Taka{" "}
        </h2>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className=" bg-green-600 my-6 py-2 text-sm md:text-base font-semibold uppercase px-12 rounded-md text-white/80"
          disabled={!stripe || !elements}
        >
          {" "}
          {loading ? (
            <ClipLoader
              color="#ffffff"
              //  loading={dataLoading || updateLoading}
              size={16}
              aria-label="Loading Spinner"
              speedMultiplier={0.8}
            />
          ) : (
            "Pay Now"
          )}
        </button>

        <button
          onClick={() => setOpen(!open)}
          className="px-8 ml-2 text-sm lg:text-base mr-3 py-2 md:py-2 font-semibold text-white rounded transition bg-red-600 hover:bg-red-700 "
        >
          {" "}
          Close{" "}
        </button>
      </form>
    </section>
  );
}
