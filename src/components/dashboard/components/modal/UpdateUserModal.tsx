/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { useEffect } from "react";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "../../../../redux/features/user/userApi";
import { TUser } from "../../../../redux/features/authentication/authSlice";

type TModalProps = {
  userEmail: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UpdateUserModal({
  open,
  setOpen,
  userEmail,
}: TModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();
  const {
    data,
    isLoading: dataLoading,
    isSuccess,
  } = useGetSingleUserQuery(userEmail);
  const user: TUser = data?.data;

  useEffect(() => {
    if (isSuccess && user) {
      reset({
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      });
    }
  }, [reset, user, isSuccess]);

  const onSubmit = async (data: any) => {
    const userData: Partial<TUser> = {
      name: data.name,
      email: data.email,
      role: data.role,
      image: data.image,
    };

    try {
      const response = await updateUser({
        userId: user._id!,
        payload: userData,
      }).unwrap();

      if (response?.success) {
        setOpen(false);
        toast.success("User updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update user");
      console.error(error);
    }
  };

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md md:max-w-lg bg-white rounded-2xl p-8 shadow-lg relative"
      >
        {(dataLoading || updateLoading) && (
          <div className="absolute inset-0 bg-white/80 rounded-2xl flex justify-center items-center">
            <ClipLoader
              color="#F59E0B"
              loading={dataLoading || updateLoading}
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
          Update User
        </h2>

        {user && (
          <div className="flex justify-center mb-6">
            <img
              src={
                user.image || "https://via.placeholder.com/150?text=User+Image"
              }
              alt={user.name}
              className="w-32 h-32 object-cover rounded-xl"
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/150?text=User+Image";
              }}
            />
          </div>
        )}

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300"
            {...register("name", { required: "Name is required" })}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">
              {errors.name.message as string}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">
              {errors.email.message as string}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Role
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300"
            {...register("role", { required: "Role is required" })}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && (
            <span className="text-red-500 text-sm">
              {errors.role.message as string}
            </span>
          )}
        </div>

        <div className="mb-6">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Image URL
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300"
            {...register("image", { required: "Image URL is required" })}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          />
          {errors.image && (
            <span className="text-red-500 text-sm">
              {errors.image.message as string}
            </span>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-yellow-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            disabled={dataLoading || updateLoading}
          >
            Modify
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
