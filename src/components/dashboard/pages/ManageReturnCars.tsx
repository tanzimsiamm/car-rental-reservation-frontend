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
  <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3 transition-all duration-200 hover:shadow-lg">
    <div className="flex items-center gap-3">
      <img
        src={car.images[0] || "https://via.placeholder.com/150?text=Car+Image"}
        alt={car.name}
        className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src =
            "https://via.placeholder.com/150?text=Car+Image";
        }}
      />
      <div className="flex-1 min-w-0">
        <h3
          className="text-gray-800 font-semibold text-sm sm:text-base truncate"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {car.name}
        </h3>
        <p
          className="text-gray-600 text-xs sm:text-sm truncate"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {car.carType}
        </p>
      </div>
    </div>
    <div className="flex justify-between items-center">
      <p
        className="text-gray-600 text-xs sm:text-sm truncate max-w-[120px]"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {car.location || "N/A"}
      </p>
      <p
        className="text-green-500 text-xs sm:text-sm font-medium whitespace-nowrap"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        ${car.pricePerHour.toFixed(2)} / hr
      </p>
    </div>
    <div className="flex justify-between items-center">
      <p
        className={`text-xs sm:text-sm font-medium whitespace-nowrap ${
          car.status === "available" ? "text-green-500" : "text-red-500"
        }`}
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {car.status}
      </p>
      <button
        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        onClick={() => onModify(car._id!)}
        aria-label={`Edit ${car.name}`}
      >
        <MdModeEdit size={18} className="sm:w-5 sm:h-5" />
      </button>
    </div>
  </div>
));

const SkeletonLoader = () => (
  <div className="space-y-4">
    {[...Array(4)].map((_, index) => (
      <div
        key={index}
        className="bg-white rounded-xl shadow-md p-4 animate-pulse"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-200 rounded-lg"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="flex justify-between mb-2">
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    ))}
  </div>
);

export default function ManageReturnCars() {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updateProductId, setUpdateProductId] = useState("");
  const { data, isLoading } = useGetCarsQuery({ status: "unavailable" });
  const cars: TCar[] = data?.data || [];

  const handleModify = useCallback((carId: string) => {
    setUpdateProductId(carId);
    setOpenUpdateModal(true);
  }, []);

  return (
    <section className="max-w-[1500px] mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-10">
      <div className="text-center mb-6 sm:mb-8">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2"
          style={{
            fontFamily: "'Poppins', sans-serif",
            background: "linear-gradient(90deg, #F59E0B, #D97706)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Manage Booked Cars
        </h2>
        <p
          className="text-gray-600 text-sm sm:text-base"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          View and manage all currently booked vehicles
        </p>
      </div>

      {openUpdateModal && (
        <UpdateCarModal
          carId={updateProductId}
          open={openUpdateModal}
          setOpen={setOpenUpdateModal}
        />
      )}

      {isLoading ? (
        <>
          <div className="hidden sm:block">
            <SkeletonLoader />
          </div>
          <div className="sm:hidden flex justify-center py-8">
            <ClipLoader color="#F59E0B" size={40} />
          </div>
        </>
      ) : cars.length === 0 ? (
        <div className="text-center py-12">
          <p
            className="text-gray-600 text-base sm:text-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            No booked cars found.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-yellow-500 to-red-600 text-white">
                    <th className="px-4 py-3 text-left rounded-tl-xl">Image</th>
                    <th className="px-4 py-3 text-left">Car Details</th>
                    <th className="px-4 py-3 text-left">Location</th>
                    <th className="px-4 py-3 text-left">Price</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left rounded-tr-xl">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((car) => (
                    <tr
                      key={car._id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-4 py-3">
                        <img
                          src={
                            car.images[0] || "https://via.placeholder.com/150"
                          }
                          alt={car.name}
                          className="w-12 h-12 object-cover rounded-lg"
                          loading="lazy"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-semibold text-gray-800">
                            {car.name}
                          </p>
                          <p className="text-gray-600 text-sm">{car.carType}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {car.location || "N/A"}
                      </td>
                      <td className="px-4 py-3 text-green-500 font-medium">
                        ${car.pricePerHour.toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            car.status === "available"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {car.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleModify(car._id!)}
                          className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                          <MdModeEdit size={18} />
                          <span>Edit</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile/Tablet Grid View */}
          <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cars.map((car) => (
              <CarCard key={car._id} car={car} onModify={handleModify} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
