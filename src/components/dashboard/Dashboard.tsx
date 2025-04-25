import { Outlet } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { useAppSelector } from "../../redux/hooks";
import UserSidebar from "./components/UserSidebar";
import AdminSidebar from "./components/AdminSidebar";

interface User {
  name?: string;
  role?: "user" | "admin";
}

const Dashboard = () => {
  const user = useAppSelector((state) => state.auth.user) as User | null;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Drawer for Mobile */}
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col flex-1">
          {/* Page Content */}
          <section className="max-w-[1500px] mx-auto mt-16 lg:mt-8 px-4">
            <Outlet />
          </section>

          {/* Mobile Header */}
          <div className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center lg:hidden z-10">
            <label
              htmlFor="my-drawer-2"
              className="text-gray-700 hover:text-yellow-500 transition-all duration-300 cursor-pointer"
              aria-label="Toggle sidebar"
            >
              <MdOutlineMenu size={28} />
            </label>
            <h2
              className="text-xl font-bold"
              style={{
                fontFamily: "'Poppins', sans-serif",
                background: "linear-gradient(90deg, #F59E0B, #D97706)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "0.05em",
              }}
            >
              DriveSpark Control Panel
            </h2>
          </div>
        </div>

        {/* Sidebar */}
        <div className="drawer-side z-20">
          <label
            htmlFor="my-drawer-2"
            aria-label="Close sidebar"
            className="drawer-overlay bg-black/50"
          ></label>
          <div className="w-80 min-h-full bg-[#171A21] text-gray-300 pt-6 px-6 flex flex-col">
            {/* Profile Section */}
            <div className="pb-6 border-b border-gray-700">
              <p
                className="text-xl font-semibold"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  background: "linear-gradient(90deg, #F59E0B, #D97706)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {user?.name || "Guest"}
              </p>
              <p
                className="text-sm text-gray-400 capitalize"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {user?.role || "Role"}
              </p>
            </div>

            {/* Sidebar Navigation */}
            <ul className="menu pt-6 flex-1">
              {user?.role === "user" && <UserSidebar />}
              {user?.role === "admin" && <AdminSidebar />}
            </ul>

            {/* Sidebar Footer */}
            <div className="mt-auto pb-6">
              <p
                className="text-xs text-gray-500 text-center"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                DriveSpark © {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
