import { useState } from "react";
import { RiEditBoxLine } from "react-icons/ri";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "../../../redux/features/user/userApi";
import { useAppSelector } from "../../../redux/hooks";
import { TUser } from "../../../redux/features/authentication/authSlice";
import BookingHistory from "../components/BookingHistory";
import { RootState } from "../../../redux/store";

type UpdateFormData = {
  name: string;
  address: string;
};

const UpdateProfileModal = ({
  user,
  open,
  setOpen,
}: {
  user: TUser;
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const updatedInfo: UpdateFormData = {
      name: formData.get("name") as string,
      address: formData.get("address") as string,
    };

    if (!updatedInfo.name.trim()) {
      toast.error("Name is required");
      return;
    }

    try {
      const res = await updateUser({
        userId: user._id as string,
        payload: updatedInfo,
      }).unwrap();

      if (res.success) {
        toast.success("Profile updated successfully");
        setOpen(false);
      } else {
        toast.error(res.message || "Failed to update profile");
      }
    } catch {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg"
      >
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">
            Name
          </label>
          <input
            type="text"
            defaultValue={user?.name}
            name="name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300 font-poppins"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">
            Email
          </label>
          <input
            type="email"
            value={user?.email}
            name="email"
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed font-poppins"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">
            Address
          </label>
          <input
            type="text"
            defaultValue={user?.address}
            name="address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300 font-poppins"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 focus:ring-2 focus:ring-yellow-500 transition-all duration-300 flex justify-center items-center font-poppins disabled:opacity-70"
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={20} />
            ) : (
              "Update Changes"
            )}
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            disabled={isLoading}
            className="w-full bg-gray-600 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 focus:ring-2 focus:ring-yellow-500 transition-all duration-300 font-poppins disabled:opacity-70"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

const UserOverview = () => {
  const [open, setOpen] = useState(false);
  // Select only the user email from the auth slice
  const userEmail = useAppSelector((state: RootState) => state.auth?.user?.email);
  const { data, isLoading, error } = useGetSingleUserQuery(userEmail as string, {
    skip: !userEmail, // Skip query if userEmail is undefined
  });

  const user: TUser = data?.data || {};

  if (error) {
    return (
      <div className="max-w-[1500px] mx-auto px-4 py-12 text-center">
        <h2 className="text-red-500 text-xl font-poppins">
          Error loading user data
        </h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-[1500px] mx-auto px-4 py-12 flex justify-center">
        <ClipLoader color="#F59E0B" size={60} />
      </div>
    );
  }

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-12">
      <UpdateProfileModal user={user} open={open} setOpen={setOpen} />

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-600 font-poppins">
              {user?.name || "Guest"}
            </h1>
            <p className="mt-2 text-gray-600 font-poppins">
              <strong>Address:</strong>{" "}
              <span className="text-blue-500">
                {user?.address || "Not provided"}
              </span>
            </p>
            <p className="mt-2 text-gray-600 font-poppins">
              <strong>Email:</strong> {user?.email || "Not available"}
            </p>
            <p className="mt-2 text-gray-600 capitalize font-poppins">
              <strong>Role:</strong> {user?.role || "Unknown"}
            </p>
            <button
              onClick={() => setOpen(true)}
              className="mt-6 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-yellow-500 transition-all duration-300 font-poppins"
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