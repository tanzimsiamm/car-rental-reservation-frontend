import { useForm } from "react-hook-form";
import Container from "../components/layout/Container";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { TUser } from "../redux/features/authentication/authSlice";
import { TCar } from "../types";
import { useGetSingleCarQuery } from "../redux/features/car/carApi";
import { useAppSelector } from "../redux/hooks";
import { useGetSingleUserQuery } from "../redux/features/user/userApi";
import ConfirmBookingModal from "../components/ui/modal/ConfirmBookingModal";
import RelatedCars from "../components/ui/BookingPage/RelatedCars";
import { toast } from "sonner";

type FormData = {
  phone: string;
  location: string;
  date: string;
  startTime: string;
  paymentMethod: string;
  identity: FileList;
};

export type TBooking = {
  _id?: string;
  date: string;
  user: TUser;
  car: TCar;
  phone: string;
  location: string;
  paymentMethod: string;
  startTime: string;
  status?: string;
  isReturnProcess?: boolean;
  endTime?: string | null;
  totalCost?: number;
  createdAt?: string;
  updatedAt?: string;
  isPaid?: boolean;
};

const Booking = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const params = useParams();
  const { data: carData, isLoading: isCarLoading, error: carError } = useGetSingleCarQuery(params.carId as string);
  const user = useAppSelector((state) => state.auth.user);
  const { data: singleUserData } = useGetSingleUserQuery(user?.email as string);
  
  const car: TCar | undefined = carData?.data;
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [booking, setBooking] = useState<TBooking | null>(null);

  const onSubmit = async (data: FormData) => {
    if (!user || !car) {
      toast.error("User or car information is missing");
      return;
    }

    const bookingData: TBooking = {
      user: singleUserData?.data || user,
      car: {
        _id: car._id,
        name: car.name,
        pricePerHour: car.pricePerHour,
        status: car.status,
        isDeleted: car.isDeleted,
        description: car.description,
        color: car.color,
        isElectric: car.isElectric,
        features: car.features,
        images: car.images,
        carType: car.carType,
        location: car.location,
      },
      date: data.date,
      startTime: data.startTime,
      phone: data.phone,
      location: data.location,
      paymentMethod: data.paymentMethod,
      status: "pending",
      isPaid: false,
      totalCost: car.pricePerHour,
    };

    setBooking(bookingData);
    setOpenConfirmModal(true);
  };

  if (carError) {
    return (
      <Container>
        <div className="py-20 text-center">
          <h2 className="text-red-500 text-xl">Error loading car details</h2>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <RelatedCars />

      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="flex justify-start item-start space-y-2 flex-col">
          <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
            <span className="text-amber-400 inter-medium">Book A Reservation</span>
          </h1>
          <p className="text-base font-medium leading-6 text-gray-300">
            {new Date().toLocaleString()}
          </p>
        </div>

        {openConfirmModal && booking && (
          <ConfirmBookingModal
            open={openConfirmModal}
            setOpen={setOpenConfirmModal}
            booking={booking}
          />
        )}

        <div className="mt-10 flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <form
                className="flex flex-col lg:flex-row justify-between items-center w-full gap-2 lg:gap-5 xl:gap-8 rounded-md"
                onSubmit={handleSubmit(onSubmit)}
              >
                <section className="flex-1 w-full bg-black border border-zinc-700 rounded-xl p-7">
                  {/* User Info Section */}
                  <div className="flex flex-col justify-start items-start mb-3">
                    <label className="font-semibold text-zinc-300">User Name</label>
                    <input
                      type="text"
                      className="bg-transparent text-amber-400 outline-none border-b-2 border-gray-600 focus:border-blue-600 w-full py-1 rounded-sm"
                      defaultValue={user?.name}
                      readOnly
                    />
                  </div>

                  <div className="flex flex-col justify-start items-start mb-3">
                    <label className="font-semibold text-zinc-300">Email</label>
                    <input
                      type="text"
                      className="bg-transparent text-amber-400 outline-none border-b-2 border-gray-600 focus:border-blue-600 w-full py-1 rounded-sm"
                      defaultValue={user?.email}
                      readOnly
                    />
                  </div>

                  <div className="flex flex-col justify-start items-start mb-3">
                    <label className="font-semibold text-zinc-300">Phone</label>
                    <input
                      type="text"
                      className={`bg-transparent text-amber-400 outline-none border-b-2 ${errors.phone ? 'border-red-500' : 'border-gray-600'} focus:border-blue-600 w-full py-1 rounded-sm`}
                      {...register("phone", { required: "Phone number is required" })}
                    />
                    {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
                  </div>

                  <div className="flex flex-col justify-start items-start mb-3">
                    <label className="font-semibold text-zinc-300">Location</label>
                    <input
                      type="text"
                      className={`bg-transparent text-amber-400 outline-none border-b-2 ${errors.location ? 'border-red-500' : 'border-gray-600'} focus:border-blue-600 w-full py-1 rounded-sm`}
                      {...register("location", { required: "Location is required" })}
                    />
                    {errors.location && <span className="text-red-500 text-sm">{errors.location.message}</span>}
                  </div>

                  <div className="flex justify-start items-center gap-3 mb-3">
                    <label className="font-semibold text-zinc-300">Date</label>
                    <input
                      type="date"
                      className={`bg-zinc-300 outline-none border-b-2 ${errors.date ? 'border-red-500' : 'border-gray-600'} w-full py-1 rounded-sm`}
                      {...register("date", { required: "Date is required" })}
                    />
                    {errors.date && <span className="text-red-500 text-sm">{errors.date.message}</span>}
                  </div>

                  <div className="flex justify-start items-center gap-3 mb-3">
                    <label className="font-semibold text-zinc-300">Start Time</label>
                    <input
                      type="time"
                      className={`bg-zinc-300 outline-none border-b-2 ${errors.startTime ? 'border-red-500' : 'border-gray-600'} w-full py-1 rounded-sm`}
                      {...register("startTime", { required: "Start time is required" })}
                    />
                    {errors.startTime && <span className="text-red-500 text-sm">{errors.startTime.message}</span>}
                  </div>

                  <div className="flex flex-col justify-start items-start mb-3">
                    <label className="font-semibold text-zinc-300">
                      NID / Driving License/ Passport
                    </label>
                    <input
                      type="file"
                      className={`bg-transparent text-amber-400 outline-none border-b-2 ${errors.identity ? 'border-red-500' : 'border-gray-600'} w-full py-1 rounded-sm`}
                      {...register("identity", { required: "Identity document is required" })}
                    />
                    {errors.identity && <span className="text-red-500 text-sm">{errors.identity.message}</span>}
                  </div>

                  <div className="flex flex-col justify-start items-start mb-3">
                    <label className="font-semibold text-zinc-300">Payment Method</label>
                    <select
                      className="max-w-xs outline p-2 mt-1 outline-black/20 rounded-sm outline-1 text-xs md:text-sm"
                      {...register("paymentMethod", { required: true })}
                    >
                      <option value="stripe">Stripe Payment</option>
                      <option value="amr-pay">Amar Pay</option>
                    </select>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-gray-700 py-3 px-10 text-white rounded font-semibold transition-all flex items-center gap-2 hover:bg-gray-600 text-sm md:text-base disabled:cursor-not-allowed"
                      disabled={isCarLoading || !car}
                    >
                      {isCarLoading ? "Loading..." : "Checkout"}
                    </button>
                  </div>
                </section>

                {/* Car Info Section */}
                <div className="flex-1 w-full h-full flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 space-y-6 border border-zinc-500 rounded-xl relative">
                  {isCarLoading && (
                    <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0 rounded-md flex justify-center items-center bg-black bg-opacity-50">
                      <ClipLoader
                        color="#FBBF24"
                        loading={isCarLoading}
                        size={60}
                        aria-label="Loading Spinner"
                      />
                    </div>
                  )}

                  {car && (
                    <section className="mx-auto">
                      <div className="">
                        <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div>
                            <img
                              src={car.images[0]}
                              alt={car.name}
                              className="w-56 md:w-60 lg:w-40 xl:w-60 rounded-md"
                            />
                          </div>

                          <div className="flex flex-col gap-5 flex-1">
                            <p className="text-amber-400 py-1 text-sm px-3 border w-32 border-amber-400">
                              {car.status}
                            </p>
                            <h2 className="text-2xl lg:text-[28px] text-zinc-300 lg:text-3xl font-semibold font-play">
                              {car.name}
                            </h2>

                            <h3 className="text-lg text-amber-400 inter-bold">
                              {`$${car.pricePerHour}`} :{" "}
                              <span className="text-zinc-300">(Per Hour)</span>
                            </h3>

                            <div className="flex gap-3 items-center uppercase font-semibold">
                              <p className="capitalize text-zinc-300">Color :</p>
                              <b className="text-zinc-400 border border-gray-300 py-1 px-3 rounded uppercase font-medium">
                                {car.color}
                              </b>
                            </div>

                            <div className="flex gap-3 items-center uppercase">
                              {car.features?.slice(0, 2).map((feature, index) => (
                                <span key={index} className="text-zinc-400 border border-gray-300 text-xs xl:text-sm px-3 rounded uppercase">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </section>
                        <h6 className="text-zinc-400 mt-4">{car.description}</h6>
                      </div>
                    </section>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Booking;