import { useState, useCallback, memo } from "react";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";
import { MdModeEdit } from "react-icons/md";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../../redux/features/user/userApi";
import { TUser } from "../../../redux/features/authentication/authSlice";
import UpdateUserModal from "../components/modal/UpdateUserModal";

interface UserCardProps {
  user: TUser;
  onModify: (email: string) => void;
  onDelete: (id: string) => void;
}

const UserCard = memo(({ user, onModify, onDelete }: UserCardProps) => (
  <div className="bg-white rounded-xl shadow-md p-4 sm:p-5 flex flex-col gap-3 sm:gap-4 transition-transform duration-200 hover:scale-[1.02]">
    <div className="flex items-center gap-3 sm:gap-4">
      <div>
        <h3
          className="text-gray-800 font-semibold text-base sm:text-lg"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {user.name}
        </h3>
        <p
          className="text-gray-600 text-sm sm:text-base"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {user.email}
        </p>
      </div>
    </div>
    <div className="flex justify-between items-center">
      <p
        className="text-green-500 text-sm sm:text-base font-medium"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {user.role}
      </p>
    </div>
    <div className="flex gap-2 sm:gap-3">
      <button
        className="flex-1 bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 text-sm sm:text-base flex justify-center items-center"
        onClick={() => onModify(user.email!)}
        style={{ fontFamily: "'Poppins', sans-serif" }}
        aria-label={`Edit ${user.name}`}
      >
        <MdModeEdit size={18} className="sm:text-xl" />
      </button>
      <button
        className="flex-1 bg-red-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-semibold hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all duration-300 text-sm sm:text-base"
        onClick={() => onDelete(user._id!)}
        style={{ fontFamily: "'Poppins', sans-serif" }}
        aria-label={`Delete ${user.name}`}
      >
        Delete
      </button>
    </div>
  </div>
));

const SkeletonLoader = () => (
  <div className="animate-pulse space-y-4 px-4 sm:px-6 md:px-0">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3"
      >
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 h-8 bg-gray-200 rounded-lg"></div>
          <div className="flex-1 h-8 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    ))}
  </div>
);

export default function ManageUsers() {
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [updateUserEmail, setUpdateUserEmail] = useState<string>("");
  const { data, isLoading } = useGetUsersQuery(undefined);
  const [deleteUserFromDB] = useDeleteUserMutation();
  const users: TUser[] = data?.data || [];

  const handleDelete = useCallback(
    async (userId: string) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#F59E0B",
        cancelButtonColor: "#D97706",
        confirmButtonText: "Yes, delete it!",
        buttonsStyling: true,
      });

      if (result.isConfirmed) {
        try {
          const response = await deleteUserFromDB(userId).unwrap();
          if (response.success) {
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted successfully.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        } catch {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete user. Please try again.",
            icon: "error",
            confirmButtonColor: "#F59E0B",
          });
        }
      }
    },
    [deleteUserFromDB]
  );

  const handleModify = useCallback((email: string) => {
    setUpdateUserEmail(email);
    setOpenUpdateModal(true);
  }, []);

  return (
    <section className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
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
          Manage Users
        </h2>
      </div>

      {openUpdateModal && (
        <UpdateUserModal
          userEmail={updateUserEmail}
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

      {!isLoading && !users.length && (
        <div className="text-center py-12">
          <p
            className="text-gray-600 text-base sm:text-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            No users found.
          </p>
        </div>
      )}

      {!isLoading && users.length > 0 && (
        <>
          <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-lg">
            <table className="min-w-full text-sm text-gray-700">
              <thead>
                <tr className="bg-gradient-to-r from-yellow-500 to-red-600 text-white">
                  {["Name", "Email", "Role", "Modify", "Delete"].map(
                    (header, index) => (
                      <th
                        key={header}
                        className={`px-4 sm:px-6 py-4 text-left ${
                          index === 0
                            ? "rounded-tl-xl"
                            : index === 4
                            ? "rounded-tr-xl"
                            : ""
                        }`}
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td
                      className="px-4 sm:px-6 py-4 text-gray-800 text-sm sm:text-base"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {user.name}
                    </td>
                    <td
                      className="px-4 sm:px-6 py-4 text-gray-600 text-sm sm:text-base"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {user.email}
                    </td>
                    <td
                      className="px-4 sm:px-6 py-4 text-green-500 text-sm sm:text-base"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {user.role}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <button
                        className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 text-sm sm:text-base"
                        onClick={() => handleModify(user.email!)}
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                        aria-label={`Edit ${user.name}`}
                      >
                        <MdModeEdit size={20} />
                      </button>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <button
                        className="bg-red-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all duration-300 text-sm sm:text-base"
                        onClick={() => handleDelete(user._id!)}
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                        aria-label={`Delete ${user.name}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {users.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                onModify={handleModify}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}