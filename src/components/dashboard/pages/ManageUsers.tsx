import { useState } from "react";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";
import { MdModeEdit } from "react-icons/md";
import { useDeleteUserMutation, useGetUsersQuery } from "../../../redux/features/user/userApi";
import { TUser } from "../../../redux/features/authentication/authSlice";
import UpdateUserModal from "../components/modal/UpdateUserModal";

export default function ManageUsers() {
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const { data, isLoading } = useGetUsersQuery(undefined);
  const [deleteUserFromDB] = useDeleteUserMutation();
  const [updateUserEmail, setUpdateUserEmail] = useState("");

  const users: TUser[] = data?.data || [];

  const deleteUser = async (userId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#F59E0B",
      cancelButtonColor: "#D97706",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const response = await deleteUserFromDB(userId).unwrap();
      if (response.success) {
        Swal.fire({
          title: "Deleted!",
          text: "User has been deleted.",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete user.",
          icon: "error",
        });
      }
    }
  };

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

        {!isLoading && !users.length && (
          <div className="text-center py-12">
            <p
              className="text-gray-600 text-lg"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              No users found.
            </p>
          </div>
        )}

        {users.length > 0 && (
          <table className="min-w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-gradient-to-r from-yellow-500 to-red-600 text-white">
                <th
                  className="px-6 py-4 rounded-tl-xl text-left"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Name
                </th>
                <th
                  className="px-6 py-4 text-left"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Email
                </th>
                <th
                  className="px-6 py-4 text-left"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Role
                </th>
                <th
                  className="px-6 py-4 text-left"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Modify
                </th>
                <th
                  className="px-6 py-4 rounded-tr-xl text-left"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                >
                  <td
                    className="px-6 py-4 text-gray-800"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {user.name}
                  </td>
                  <td
                    className="px-6 py-4 text-gray-600"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {user.email}
                  </td>
                  <td
                    className="px-6 py-4 text-green-500"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {user.role}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
                      onClick={() => {
                        setUpdateUserEmail(user.email!);
                        setOpenUpdateModal(true);
                      }}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      <MdModeEdit size={20} />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300"
                      onClick={() => deleteUser(user._id!)}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      Delete
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