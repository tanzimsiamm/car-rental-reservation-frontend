/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { useSavePaymentMutation } from "../../redux/features/payment/paymentApi";
import { useUpdateBookingMutation } from "../../redux/features/booking/bookingApi";
import { TBooking } from "../../pages/Booking";
import { useAppSelector } from "../../redux/hooks";

type CheckoutFormProps = {
  booking: TBooking;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess?: () => void; // Add the onSuccess prop
};

export default function CheckoutForm({
  booking,
  setOpen,
  onSuccess
}: CheckoutFormProps) {
  const { _id, totalCost } = booking || {};
  const [savePayment] = useSavePaymentMutation();
  const [updateBooking] = useUpdateBookingMutation();

  const currentUser = useAppSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (totalCost) {
      fetch("http://localhost:3000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ totalCost, currency: "usd" }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.data))
        .catch(() => toast.error("Failed to initialize payment"));
    }
  }, [totalCost]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      toast.error("Payment system not initialized");
      setLoading(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      toast.error("Card details not provided");
      setLoading(false);
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message || "Invalid card details");
      setLoading(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: currentUser?.name || "Guest",
            email: currentUser?.email || "",
          },
        },
      });

    if (confirmError) {
      toast.error(confirmError.message || "Payment confirmation failed");
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
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
        setOpen(false);
        onSuccess?.(); // Call onSuccess after successful payment
      } else {
        toast.error("Failed to save payment");
      }
    }
    setLoading(false);
  };

  return (
    <section className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-600 font-poppins">
          Total: ${totalCost?.toFixed(2)}
        </h2>
        <div className="mb-6">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#1F2937",
                  fontFamily: "'Poppins', sans-serif",
                  "::placeholder": {
                    color: "#6B7280",
                  },
                },
                invalid: {
                  color: "#EF4444",
                },
              },
            }}
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 focus:ring-2 focus:ring-yellow-500 transition-all duration-300 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed font-poppins"
            disabled={!stripe || !elements || loading}
          >
            {loading ? (
              <ClipLoader
                color="#ffffff"
                loading={loading}
                size={20}
                aria-label="Loading Spinner"
                speedMultiplier={0.8}
              />
            ) : (
              "Pay Now"
            )}
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full bg-gray-600 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 focus:ring-2 focus:ring-yellow-500 transition-all duration-300 font-poppins"
          >
            Close
          </button>
        </div>
      </form>
    </section>
  );
}