/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import { useCreateCarMutation } from "../../../../redux/features/car/carApi";
import { ClipLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { TCar } from "../../../../types";

type TModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateCarModal({ open, setOpen }: TModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [createCar, { isLoading }] = useCreateCarMutation();

  const onSubmit = async (data: any) => {
    const carData: TCar = {
      name: data.name,
      carType: data.carType,
      isElectric: data.isElectric === "yes",
      color: data.color,
      location: data.location,
      pricePerHour: parseInt(data.pricePerHour),
      description: data.description,
      features: data.features.toUpperCase().split(",").map((f: string) => f.trim()),
      images: [data.image1, data.image2, data.image3].filter((img: string) => img),
    };

    try {
      const response = await createCar(carData).unwrap();
      if (response?.success) {
        setOpen(false);
        toast.success("New Car has been created");
      }
    } catch (error) {
      toast.error("Failed to create car");
      console.error(error);
    }
  };

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md md:max-w-lg bg-white rounded-2xl p-8 shadow-lg relative"
      >
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

        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{
            fontFamily: "'Poppins', sans-serif",
            background: "linear-gradient(90deg, #F59E0B, #D97706)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Add New Car
        </h2>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Car Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300"
            {...register("name", { required: "Car name is required" })}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message as string}</span>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Car Type
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300"
            {...register("carType", { required: "Car type is required" })}
            style={{ fontFamily: "'Poppins', sans-serif" }}
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
            <span className="text-red-500 text-sm">{errors.carType.message as string}</span>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Electric
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300"
            {...register("isElectric", { required: "Electric status is required" })}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {errors.isElectric && (
            <span className="text-red-500 text-sm">{errors.isElectric.message as string}</span>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Color
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300"
            {...register("color", { required: "Color is required" })}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          />
          {errors.color && (
            <span className="text-red-500 text-sm">{errors.color.message as string}</span>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Location
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300"
            {...register("location", { required: "Location is required" })}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          />
          {errors.location && (
            <span className="text-red-500 text-sm">{errors.location.message as string}</span>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Price Per Hour
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300"
            {...register("pricePerHour", {
              required: "Price per hour is required",
              min: { value: 1, message: "Price must be greater than 0" },
            })}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          />
          {errors.pricePerHour && (
            <span className="text-red-500 text-sm">{errors.pricePerHour.message as string}</span>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Features{" "}
            <span className="text-sm text-yellow-500">
              (Separate each feature with a comma)
            </span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300"
            {...register("features", { required: "Features are required" })}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          />
          {errors.features && (
            <span className="text-red-500 text-sm">{errors.features.message as string}</span>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Description
          </label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300"
            {...register("description", { required: "Description is required" })}
            style={{ fontFamily: "'Poppins', sans-serif" }}
            rows={4}
          />
          {errors.description && (
            <span className="text-red-500 text-sm">{errors.description.message as string}</span>
          )}
        </div>

        <div className="mb-6">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Images (URL)
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300 mb-2"
            {...register("image1")}
            placeholder="Image 1"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          />
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300 mb-2"
            {...register("image2")}
            placeholder="Image 2"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          />
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300"
            {...register("image3")}
            placeholder="Image 3"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            disabled={isLoading}
          >
            Create
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full bg-gray-600 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Close
          </button>
        </div>
      </form>
    </section>
  );
}