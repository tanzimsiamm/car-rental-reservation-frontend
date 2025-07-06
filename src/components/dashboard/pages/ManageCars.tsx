import { useState } from "react";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";
import {
  useDeleteCarMutation,
  useGetCarsQuery,
} from "../../../redux/features/car/carApi";
import { TCar } from "../../../types";
import CreateCarModal from "../components/modal/CreateCarModal";
import UpdateCarModal from "../components/modal/UpdateCarModal";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { BsCarFrontFill } from "react-icons/bs";

export default function ManageCars() {
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const { data, isLoading, isError, refetch } = useGetCarsQuery(undefined);
  const [deleteCarFromDB] = useDeleteCarMutation();
  const [updateProductId, setUpdateProductId] = useState("");

  const cars: TCar[] = data?.data || [];

  const deleteProduct = async (carId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#F59E0B",
      cancelButtonColor: "#D97706",
      confirmButtonText: "Yes, delete it!",
      backdrop: `
        rgba(245, 158, 11, 0.2)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `,
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteCarFromDB(carId).unwrap();
        if (response.success) {
          await Swal.fire({
            title: "Deleted!",
            text: "Car has been deleted.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete car.",
          icon: "error",
        });
      }
    }
  };

  const handleRefresh = () => {
    refetch();
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Data refreshed",
      showConfirmButton: false,
      timer: 1000,
      toast: true,
    });
  };

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="text-center p-6 bg-red-50 rounded-lg max-w-md">
          <h3 className="text-xl font-semibold text-red-600 mb-2">
            Failed to load cars
          </h3>
          <p className="text-gray-600 mb-4">
            There was an error fetching the car data. Please try again.
          </p>
          <button
            onClick={refetch}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-[1800px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="text-center sm:text-left">
          <h2
            className="text-2xl sm:text-3xl font-bold flex items-center justify-center sm:justify-start gap-2"
            style={{
              fontFamily: "'Poppins', sans-serif",
              background: "linear-gradient(90deg, #F59E0B, #D97706)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <BsCarFrontFill className="inline" /> Manage Cars
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {cars.length} {cars.length === 1 ? "car" : "cars"} in inventory
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleRefresh}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-1 text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
          <button
            onClick={() => setOpenCreateModal(true)}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <FiPlus className="text-lg" />
            <span>Add New Car</span>
          </button>
        </div>
      </div>

      {openCreateModal && (
        <CreateCarModal
          open={openCreateModal}
          setOpen={setOpenCreateModal}
        />
      )}
      {openUpdateModal && (
        <UpdateCarModal
          carId={updateProductId}
          open={openUpdateModal}
          setOpen={setOpenUpdateModal}
        />
      )}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16">
            <ClipLoader
              color="#F59E0B"
              loading={isLoading}
              size={50}
              aria-label="Loading Spinner"
              speedMultiplier={0.8}
            />
            <p className="mt-4 text-gray-500">Loading car inventory...</p>
          </div>
        )}

        {!isLoading && !cars.length && (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-yellow-50 rounded-full flex items-center justify-center mb-4">
              <BsCarFrontFill className="text-3xl text-yellow-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-1">
              No cars found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-4">
              Your car inventory is empty. Add your first car to get started.
            </p>
            <button
              onClick={() => setOpenCreateModal(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
            >
              <FiPlus /> Add Car
            </button>
          </div>
        )}

        {cars.length > 0 && (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-yellow-500 to-yellow-600">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider rounded-tl-xl"
                      >
                        Car Details
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-right text-xs font-semibold text-white uppercase tracking-wider rounded-tr-xl"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cars.map((car) => (
                      <tr
                        key={car._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-16 w-16">
                              <img
                                className="h-full w-full object-cover rounded-lg"
                                src={
                                  car.images[0] ||
                                  "https://via.placeholder.com/150?text=Car+Image"
                                }
                                alt={car.name}
                                onError={(e) => {
                                  e.currentTarget.src =
                                    "https://via.placeholder.com/150?text=Car+Image";
                                }}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {car.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 capitalize">
                            {car.carType}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            ${car.pricePerHour.toFixed(2)}/hr
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              car.status === "available"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {car.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => {
                                setUpdateProductId(car._id!);
                                setOpenUpdateModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <FiEdit2 />
                            </button>
                            <button
                              onClick={() => deleteProduct(car._id!)}
                              className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tablet View */}
            <div className="hidden md:block lg:hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                {cars.map((car) => (
                  <div
                    key={car._id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-4">
                      <div className="flex items-start">
                        <img
                          className="h-20 w-20 object-cover rounded-lg mr-4"
                          src={
                            car.images[0] ||
                            "https://via.placeholder.com/150?text=Car+Image"
                          }
                          alt={car.name}
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://via.placeholder.com/150?text=Car+Image";
                          }}
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {car.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {car.carType}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                              ${car.pricePerHour.toFixed(2)}/hr
                            </span>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                car.status === "available"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {car.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 flex justify-end space-x-2">
                      <button
                        onClick={() => {
                          setUpdateProductId(car._id!);
                          setOpenUpdateModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                      >
                        <FiEdit2 size={14} /> Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(car._id!)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center gap-1"
                      >
                        <FiTrash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden">
              <div className="divide-y divide-gray-200">
                {cars.map((car) => (
                  <div key={car._id} className="p-4">
                    <div className="flex items-start">
                      <img
                        className="h-14 w-14 object-cover rounded-lg mr-3"
                        src={
                          car.images[0] ||
                          "https://via.placeholder.com/150?text=Car+Image"
                        }
                        alt={car.name}
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/150?text=Car+Image";
                        }}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-gray-900">
                            {car.name}
                          </h3>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setUpdateProductId(car._id!);
                                setOpenUpdateModal(true);
                              }}
                              className="text-blue-600"
                              title="Edit"
                            >
                              <FiEdit2 size={16} />
                            </button>
                            <button
                              onClick={() => deleteProduct(car._id!)}
                              className="text-red-600"
                              title="Delete"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {car.carType}
                        </p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          <span className="px-1.5 py-0.5 text-xs rounded-full bg-green-100 text-green-800">
                            ${car.pricePerHour.toFixed(2)}/hr
                          </span>
                          <span
                            className={`px-1.5 py-0.5 text-xs rounded-full ${
                              car.status === "available"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {car.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}