/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { RiEditBoxLine } from "react-icons/ri";
import { toast } from "sonner";
import { useGetSingleUserQuery, useUpdateUserMutation } from "../../../redux/features/user/userApi";
import { useAppSelector } from "../../../redux/hooks";
import { TUser } from "../../../redux/features/authentication/authSlice";
import BookingHistory from "../components/BookingHistory";
import { RootState } from "../../../redux/store";

const UserOverview = () => {
  const [open, setOpen] = useState(false);
  const state = useAppSelector((state: RootState) => state);
  const { data } = useGetSingleUserQuery(state.auth?.user?.email as string);
  const [updateUser] = useUpdateUserMutation();

  const user: TUser = data?.data || {};

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.target;

    const updatedInfo = {
      name: form.name.value,
      address: form.address.value,
    };

    const res = await updateUser({
      userId: user?._id as string,
      payload: updatedInfo,
    });

    if (res?.data?.success) {
      toast.success("Updated Successfully");
      setOpen(false);
    } else {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-12">
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="mb-5">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Name
              </label>
              <input
                type="text"
                defaultValue={user?.name}
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              />
            </div>

            <div className="mb-5">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Email
              </label>
              <input
                type="email"
                value={user?.email}
                name="email"
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              />
            </div>

            <div className="mb-5">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Address
              </label>
              <input
                type="text"
                defaultValue={user?.address}
                name="address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Update Changes
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
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col gap-6">
          <div>
            <h1
              className="text-3xl lg:text-4xl font-bold"
              style={{
                fontFamily: "'Poppins', sans-serif",
                background: "linear-gradient(90deg, #F59E0B, #D97706)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {user?.name || "Guest"}
            </h1>
            <p
              className="mt-2 text-gray-600"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <strong>Address:</strong>{" "}
              <span className="text-blue-500">{user?.address || "Not provided"}</span>
            </p>
            <p
              className="mt-2 text-gray-600"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <strong>Email:</strong> {user?.email || "Not available"}
            </p>
            <p
              className="mt-2 text-gray-600 capitalize"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <strong>Role:</strong> {user?.role || "Unknown"}
            </p>
            <button
              onClick={() => setOpen(true)}
              className="mt-6 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <RiEditBoxLine size={20} />
              Update Profile
            </button>
          </div>
        </div>
      </div>

      <BookingHistory />
    </div>
  );
};

export default UserOverview;