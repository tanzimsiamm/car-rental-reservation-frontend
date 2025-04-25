import { FaHouse } from "react-icons/fa6";
import { VscTasklist } from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import { HiViewGrid } from "react-icons/hi";

const UserSidebar = () => {
  return (
    <ul className="space-y-2">
      <li>
        <NavLink
          to="/dashboard/user-overview"
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
          to="/dashboard/my-bookings"
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
            My Bookings
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

export default UserSidebar;
