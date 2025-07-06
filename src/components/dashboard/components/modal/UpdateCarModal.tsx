/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { useEffect, useCallback } from "react";
import {
  useGetSingleCarQuery,
  useUpdateCarMutation,
} from "../../../../redux/features/car/carApi";
import { TCar } from "../../../../types";

type TModalProps = {
  carId: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SkeletonLoader = () => (
  <div className="animate-pulse space-y-4">
    {[...Array(8)].map((_, index) => (
      <div key={index} className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    ))}
    <div className="flex gap-4">
      <div className="flex-1 h-10 bg-gray-200 rounded"></div>
      <div className="flex-1 h-10 bg-gray-200 rounded"></div>
    </div>
  </div>
);

export default function UpdateCarModal({ open, setOpen, carId }: TModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [updateCar, { isLoading: updateLoading }] = useUpdateCarMutation();
  const {
    data,
    isLoading: dataLoading,
    isSuccess,
  } = useGetSingleCarQuery(carId);
  const car: TCar = data?.data;

  useEffect(() => {
    if (isSuccess && car) {
      reset({
        name: car.name,
        carType: car.carType,
        isElectric: car.isElectric ? "yes" : "no",
        color: car.color,
        location: car.location,
        pricePerHour: car.pricePerHour,
        description: car.description,
        features: car.features?.join(","),
        image1: car.images[0],
        image2: car.images[1],
        image3: car.images[2],
      });
    }
  }, [reset, car, isSuccess]);

  const onSubmit = useCallback(
    async (data: any) => {
      const carData: TCar = {
        name: data.name,
        carType: data.carType,
        isElectric: data.isElectric === "yes",
        color: data.color,
        location: data.location,
        pricePerHour: parseInt(data.pricePerHour),
        description: data.description,
        features: data.features
          .toUpperCase()
          .split(",")
          .map((f: string) => f.trim())
          .filter((f: string) => f),
        images: [data.image1, data.image2, data.image3].filter(
          (img: string) => img
        ),
      };

      try {
        const response = await updateCar({
          carId: car._id!,
          payload: carData,
        }).unwrap();

        if (response?.success) {
          setOpen(false);
          toast.success("Car updated successfully", { duration: 2000 });
        }
      } catch (error) {
        toast.error("Failed to update car. Please try again.", {
          duration: 3000,
        });
        console.error(error);
      }
    },
    [updateCar, car?._id, setOpen]
  );

  if (!open) return null;

  return (
    <section
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4"
      role="dialog"
      aria-labelledby="update-car-modal-title"
      aria-modal="true"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[90vw] sm:max-w-md md:max-w-lg bg-white rounded-2xl p-6 sm:p-8 shadow-lg relative max-h-[90vh] overflow-y-auto"
      >
        {(dataLoading || updateLoading) && (
          <div className="absolute inset-0 bg-white/80 rounded-2xl flex justify-center items-center">
            <ClipLoader
              color="#F59E0B"
              loading={dataLoading || updateLoading}
              size={40}
              aria-label="Loading Spinner"
              speedMultiplier={0.8}
            />
          </div>
        )}

        {dataLoading ? (
          <SkeletonLoader />
        ) : (
          <>
            <h2
              id="update-car-modal-title"
              className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center"
              style={{
                fontFamily: "'Poppins', sans-serif",
                background: "linear-gradient(90deg, #F59E0B, #D97706, #F59E0B)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200%",
                animation: "gradient 3s ease infinite",
              }}
            >
              Update Car
            </h2>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300 text-sm sm:text-base"
                {...register("name", { required: "Car name is required" })}
                style={{ fontFamily: "'Poppins', sans-serif" }}
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && (
                <span
                  className="text-red-500 text-xs sm:text-sm mt-1"
                  role="alert"
                >
                  {errors.name.message as string}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                htmlFor="carType"
              >
                Car Type
              </label>
              <select
                id="carType"
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300 text-sm sm:text-base"
                {...register("carType", { required: "Car type is required" })}
                style={{ fontFamily: "'Poppins', sans-serif" }}
                aria-invalid={errors.carType ? "true" : "false"}
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="compact">Compact</option>
                <option value="suv">SUVs</option>
                <option value="luxury">Luxury</option>
                <option value="pickup/truck">Pickups / Trucks</option>
                <option value="electric">Electric</option>
                <option value="convertibles">Convertibles</option>
              </select>
              {errors.carType && (
                <span
                  className="text-red-500 text-xs sm:text-sm mt-1"
                  role="alert"
                >
                  {errors.carType.message as string}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                htmlFor="isElectric"
              >
                Electric
              </label>
              <select
                id="isElectric"
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300 text-sm sm:text-base"
                {...register("isElectric", {
                  required: "Electric status is required",
                })}
                style={{ fontFamily: "'Poppins', sans-serif" }}
                aria-invalid={errors.isElectric ? "true" : "false"}
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.isElectric && (
                <span
                  className="text-red-500 text-xs sm:text-sm mt-1"
                  role="alert"
                >
                  {errors.isElectric.message as string}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                htmlFor="color"
              >
                Color
              </label>
              <input
                type="text"
                id="color"
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300 text-sm sm:text-base"
                {...register("color", { required: "Color is required" })}
                style={{ fontFamily: "'Poppins', sans-serif" }}
                aria-invalid={errors.color ? "true" : "false"}
              />
              {errors.color && (
                <span
                  className="text-red-500 text-xs sm:text-sm mt-1"
                  role="alert"
                >
                  {errors.color.message as string}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                htmlFor="location"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300 text-sm sm:text-base"
                {...register("location", { required: "Location is required" })}
                style={{ fontFamily: "'Poppins', sans-serif" }}
                aria-invalid={errors.location ? "true" : "false"}
              />
              {errors.location && (
                <span
                  className="text-red-500 text-xs sm:text-sm mt-1"
                  role="alert"
                >
                  {errors.location.message as string}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                htmlFor="pricePerHour"
              >
                Price Per Hour
              </label>
              <input
                type="number"
                id="pricePerHour"
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300 text-sm sm:text-base"
                {...register("pricePerHour", {
                  required: "Price per hour is required",
                  min: { value: 1, message: "Price must be greater than 0" },
                })}
                style={{ fontFamily: "'Poppins', sans-serif" }}
                aria-invalid={errors.pricePerHour ? "true" : "false"}
              />
              {errors.pricePerHour && (
                <span
                  className="text-red-500 text-xs sm:text-sm mt-1"
                  role="alert"
                >
                  {errors.pricePerHour.message as string}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                htmlFor="features"
              >
                Features{" "}
                <span className="text-xs sm:text-sm text-yellow-500">
                  (Separate each feature with a comma)
                </span>
              </label>
              <input
                type="text"
                id="features"
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300 text-sm sm:text-base"
                {...register("features", { required: "Features are required" })}
                style={{ fontFamily: "'Poppins', sans-serif" }}
                aria-invalid={errors.features ? "true" : "false"}
              />
              {errors.features && (
                <span
                  className="text-red-500 text-xs sm:text-sm mt-1"
                  role="alert"
                >
                  {errors.features.message as string}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300 text-sm sm:text-base"
                {...register("description", {
                  required: "Description is required",
                })}
                style={{ fontFamily: "'Poppins', sans-serif" }}
                rows={4}
                aria-invalid={errors.description ? "true" : "false"}
              />
              {errors.description && (
                <span
                  className="text-red-500 text-xs sm:text-sm mt-1"
                  role="alert"
                >
                  {errors.description.message as string}
                </span>
              )}
            </div>

            {isSuccess && (
              <div className="mb-6">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Images (URL)
                </label>
                <input
                  type="text"
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300 text-sm sm:text-base mb-2"
                  {...register("image1")}
                  placeholder="Image 1"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                  aria-label="Image 1 URL"
                />
                <input
                  type="text"
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300 text-sm sm:text-base mb-2"
                  {...register("image2")}
                  placeholder="Image 2"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                  aria-label="Image 2 URL"
                />
                <input
                  type="text"
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300 text-sm sm:text-base"
                  {...register("image3")}
                  placeholder="Image 3"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                  aria-label="Image 3 URL"
                />
              </div>
            )}

            <div className="flex gap-3 sm:gap-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-900 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                disabled={dataLoading || updateLoading}
                aria-label="Submit car updates"
              >
                Modify
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 bg-gradient-to-r from-gray-600 to-gray-800 text-white py-2 rounded-lg font-semibold hover:from-gray-700 hover:to-gray-900 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-300 text-sm sm:text-base"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                aria-label="Close modal"
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