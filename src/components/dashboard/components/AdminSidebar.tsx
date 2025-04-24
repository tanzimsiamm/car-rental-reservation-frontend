import { NavLink } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { FaCarAlt } from "react-icons/fa";
import { VscTasklist } from "react-icons/vsc";
import { GiReturnArrow } from "react-icons/gi";
import { HiViewGrid } from "react-icons/hi";

const AdminSidebar = () => {
  return (
    <ul className="space-y-2">
      <li>
        <NavLink
          to="/dashboard/admin-overview"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg transition-all duration-300 ${
              isActive
                ? "bg-yellow-500/10 text-yellow-500"
                : "text-gray-300 hover:bg-gray-700/50 hover:text-yellow-400"
            }`
          }
        >
          <HiViewGrid size={24} />
          <span
            className="flex-1 ms-4 text-sm lg:text-base whitespace-nowrap"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Overview
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/manage-cars"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg transition-all duration-300 ${
              isActive
                ? "bg-yellow-500/10 text-yellow-500"
                : "text-gray-300 hover:bg-gray-700/50 hover:text-yellow-400"
            }`
          }
        >
          <FaCarAlt size={24} />
          <span
            className="flex-1 ms-4 text-sm lg:text-base whitespace-nowrap"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Manage Cars
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/manage-bookings"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg transition-all duration-300 ${
              isActive
                ? "bg-yellow-500/10 text-yellow-500"
                : "text-gray-300 hover:bg-gray-700/50 hover:text-yellow-400"
            }`
          }
        >
          <VscTasklist size={24} />
          <span
            className="flex-1 ms-4 text-sm lg:text-base whitespace-nowrap"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Manage Bookings
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/manage-return-cars"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg transition-all duration-300 ${
              isActive
                ? "bg-yellow-500/10 text-yellow-500"
                : "text-gray-300 hover:bg-gray-700/50 hover:text-yellow-400"
            }`
          }
        >
          <GiReturnArrow size={24} />
          <span
            className="flex-1 ms-4 text-sm lg:text-base whitespace-nowrap"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Manage Return Cars
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/manage-users"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg transition-all duration-300 ${
              isActive
                ? "bg-yellow-500/10 text-yellow-500"
                : "text-gray-300 hover:bg-gray-700/50 hover:text-yellow-400"
            }`
          }
        >
          <FiUsers size={24} />
          <span
            className="flex-1 ms-4 text-sm lg:text-base whitespace-nowrap"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Manage Users
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg transition-all duration-300 ${
              isActive
                ? "bg-yellow-500/10 text-yellow-500"
                : "text-gray-300 hover:bg-gray-700/50 hover:text-yellow-400"
            }`
          }
        >
          <FaHouse size={24} />
          <span
            className="flex-1 ms-4 text-sm lg:text-base whitespace-nowrap"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Home
          </span>
        </NavLink>
      </li>
    </ul>
  );
};

export default AdminSidebar;