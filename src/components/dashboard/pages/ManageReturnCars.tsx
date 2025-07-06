import { useState, useCallback, memo } from "react";
import { ClipLoader } from "react-spinners";
import { MdModeEdit } from "react-icons/md";
import { useGetCarsQuery } from "../../../redux/features/car/carApi";
import { TCar } from "../../../types";
import UpdateCarModal from "../components/modal/UpdateCarModal";

interface CarCardProps {
  car: TCar;
  onModify: (id: string) => void;
}

const CarCard = memo(({ car, onModify }: CarCardProps) => (
  <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3 transition-transform duration-200 hover:scale-[1.02]">
    <div className="flex items-center gap-3">
      <img
        src={car.images[0] || "https://via.placeholder.com/150?text=Car+Image"}
        alt={car.name}
        className="w-16 h-16 object-contain rounded-full"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = "https://via.placeholder.com/150?text=Car+Image";
        }}
      />
      <div>
        <h3
          className="text-gray-800 font-semibold text-base"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {car.name}
        </h3>
        <p
          className="text-gray-600 text-sm"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {car.carType}
        </p>
      </div>
    </div>
    <div className="flex justify-between items-center">
      <p
        className="text-gray-600 text-sm"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {car.location || "N/A"}
      </p>
      <p
        className="text-green-500 text-sm font-medium"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        ${car.pricePerHour.toFixed(2)} / hr
      </p>
    </div>
    <div className="flex justify-between items-center">
      <p
        className={`text-sm font-medium ${
          car.status === "available" ? "text-green-500" : "text-red-500"
        }`}
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {car.status}
      </p>
      <button
        className="bg-blue-600 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 text-sm"
        onClick={() => onModify(car._id!)}
        style={{ fontFamily: "'Poppins', sans-serif" }}
        aria-label={`Edit ${car.name}`}
      >
        <MdModeEdit size={20} />
      </button>
    </div>
  </div>
));

const SkeletonLoader = () => (
  <div className="animate-pulse space-y-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3"
      >
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    ))}
  </div>
);

export default function ManageReturnCars() {
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [updateProductId, setUpdateProductId] = useState<string>("");
  const { data, isLoading } = useGetCarsQuery({ status: "unavailable" });
  const cars: TCar[] = data?.data || [];

  const handleModify = useCallback((carId: string) => {
    setUpdateProductId(carId);
    setOpenUpdateModal(true);
  }, []);

  return (
    <section className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8 sm:mb-12">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold"
          style={{
            fontFamily: "'Poppins', sans-serif",
            background: "linear-gradient(90deg, #F59E0B, #D97706, #F59E0B)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "200%",
            animation: "gradient 3s ease infinite",
          }}
        >
          Manage Booked Cars
        </h2>
      </div>

      {openUpdateModal && (
        <UpdateCarModal
          carId={updateProductId}
          open={openUpdateModal}
          setOpen={setOpenUpdateModal}
        />
      )}

      {isLoading && (
        <div className="flex justify-center items-center py-12 md:hidden">
          <ClipLoader
            color="#F59E0B"
            loading={isLoading}
            size={40}
            aria-label="Loading Spinner"
            speedMultiplier={0.8}
          />
        </div>
      )}
      {isLoading && <SkeletonLoader />}

      {!isLoading && !cars.length && (
        <div className="text-center py-12">
          <p
            className="text-gray-600 text-base sm:text-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            No booked cars found.
          </p>
        </div>
      )}

      {!isLoading && cars.length > 0 && (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-lg">
            <table className="min-w-full text-sm text-gray-700">
              <thead>
                <tr className="bg-gradient-to-r from-yellow-500 to-red-600 text-white">
                  {[
                    "Image",
                    "Name",
                    "Location",
                    "Car Type",
                    "Price (1H)",
                    "Status",
                    "Action",
                  ].map((header, index) => (
                    <th
                      key={header}
                      className={`px-4 sm:px-6 py-4 text-left ${
                        index === 0
                          ? "rounded-tl-xl"
                          : index === 6
                          ? "rounded-tr-xl"
                          : ""
                      }`}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr
                    key={car._id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-4 sm:px-6 py-4">
                      <img
                        src={
                          car.images[0] ||
                          "https://via.placeholder.com/150?text=Car+Image"
                        }
                        alt={car.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-full"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/150?text=Car+Image";
                        }}
                      />
                    </td>
                    <td
                      className="px-4 sm:px-6 py-4 text-gray-800 text-sm sm:text-base"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {car.name}
                    </td>
                    <td
                      className="px-4 sm:px-6 py-4 text-gray-600 text-sm sm:text-base"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {car.location || "N/A"}
                    </td>
                    <td
                      className="px-4 sm:px-6 py-4 text-gray-600 text-sm sm:text-base"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {car.carType}
                    </td>
                    <td
                      className="px-4 sm:px-6 py-4 text-green-500 text-sm sm:text-base"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      ${car.pricePerHour.toFixed(2)}
                    </td>
                    <td
                      className={`px-4 sm:px-6 py-4 ${
                        car.status === "available"
                          ? "text-green-500"
                          : "text-red-500"
                    } text-sm sm:text-base`}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {car.status}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <button
                        className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 text-sm sm:text-base"
                        onClick={() => handleModify(car._id!)}
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                        aria-label={`Edit ${car.name}`}
                      >
                        <MdModeEdit size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {cars.map((car) => (
              <CarCard
                key={car._id}
                car={car}
                onModify={handleModify}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}