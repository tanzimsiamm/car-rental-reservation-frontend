import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { MdModeEdit } from "react-icons/md";
import { useGetCarsQuery } from "../../../redux/features/car/carApi";
import { TCar } from "../../../types";
import UpdateCarModal from "../components/modal/UpdateCarModal";

export default function ManageReturnCars() {
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const { data, isLoading } = useGetCarsQuery({ status: "unavailable" });
  const [updateProductId, setUpdateProductId] = useState("");

  const cars: TCar[] = data?.data || [];

  return (
    <section className="max-w-[1500px] mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2
          className="text-3xl md:text-4xl font-bold"
          style={{
            fontFamily: "'Poppins', sans-serif",
            background: "linear-gradient(90deg, #F59E0B, #D97706)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
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

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <ClipLoader
              color="#F59E0B"
              loading={isLoading}
              size={60}
              aria-label="Loading Spinner"
              speedMultiplier={0.8}
            />
          </div>
        )}

        {!isLoading && !cars.length && (
          <div className="text-center py-12">
            <p
              className="text-gray-600 text-lg"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              No booked cars found.
            </p>
          </div>
        )}

        {cars.length > 0 && (
          <table className="min-w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-gradient-to-r from-yellow-500 to-red-600 text-white">
                <th
                  className="px-6 py-4 rounded-tl-xl text-left"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Image
                </th>
                <th
                  className="px-6 py-4 text-left"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Name
                </th>
                <th
                  className="px-6 py-4 text-left"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Location
                </th>
                <th
                  className="px-6 py-4 text-left"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Car Type
                </th>
                <th
                  className="px-6 py-4 text-left"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Price (1H)
                </th>
                <th
                  className="px-6 py-4 text-left"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Status
                </th>
                <th
                  className="px-6 py-4 rounded-tr-xl text-left"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr
                  key={car._id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <img
                      src={
                        car.images[0] ||
                        "https://via.placeholder.com/150?text=Car+Image"
                      }
                      alt={car.name}
                      className="w-16 h-16 object-contain rounded-full"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/150?text=Car+Image";
                      }}
                    />
                  </td>
                  <td
                    className="px-6 py-4 text-gray-800"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {car.name}
                  </td>
                  <td
                    className="px-6 py-4 text-gray-600"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {car.location || "N/A"}
                  </td>
                  <td
                    className="px-6 py-4 text-gray-600"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {car.carType}
                  </td>
                  <td
                    className="px-6 py-4 text-green-500"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    ${car.pricePerHour.toFixed(2)}
                  </td>
                  <td
                    className={`px-6 py-4 ${
                      car.status === "available"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {car.status}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
                      onClick={() => {
                        setUpdateProductId(car._id!);
                        setOpenUpdateModal(true);
                      }}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      <MdModeEdit size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
