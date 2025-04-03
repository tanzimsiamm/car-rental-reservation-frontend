import { NavLink } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { FaCarAlt } from "react-icons/fa";
import { VscTasklist } from "react-icons/vsc";
import { GiReturnArrow } from "react-icons/gi";
import { HiViewGrid } from "react-icons/hi";

const AdminSidebar = () => {
  return (
    <>
      <li>
        <NavLink
          to="/dashboard/admin-overview"
          className={({ isActive }) =>
            isActive
              ? "flex items-center p-2 text-amber-400 inter-regular"
              : "flex items-center p-2 text-gray-200 rounded-lg "
          }
        >
          <HiViewGrid size={22} className="" />
          <span className="flex-1 ms-3 text-sm lg:text-base whitespace-nowrap">
            Overview
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/manage-cars"
          className={({ isActive }) =>
            isActive
              ? " flex items-center p-2 text-amber-400 inter-regular  "
              : "flex items-center p-2 text-gray-200 rounded-lg "
          }
        >
          <FaCarAlt size={22} className="" />
          <span className="flex-1 ms-3 text-sm lg:text-base whitespace-nowrap">
            Manage Cars
          </span>
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard/manage-bookings"
          className={({ isActive }) =>
            isActive
              ? " flex items-center p-2 text-amber-400 inter-regular   "
              : "flex items-center p-2 text-gray-200 rounded-lg  "
          }
        >
          <VscTasklist size={22} className="" />
          <span className="flex-1 ms-3 text-sm lg:text-base whitespace-nowrap">
            Manage Bookings
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/manage-return-cars"
          className={({ isActive }) =>
            isActive
              ? " flex items-center p-2 text-amber-400 inter-regular   "
              : "flex items-center p-2 text-gray-200 rounded-lg  "
          }
        >
          <GiReturnArrow size={22} className="" />
          <span className="flex-1 ms-3 text-sm lg:text-base whitespace-nowrap">
            Manage Return Cars
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/manage-users"
          className={({ isActive }) =>
            isActive
              ? " flex items-center p-2 text-amber-400 inter-regular   "
              : "flex items-center p-2 text-gray-200 rounded-lg  "
          }
        >
          <FiUsers size={22} className="" />
          <span className="flex-1 ms-3 text-sm lg:text-base whitespace-nowrap">
            Manage Users
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? " flex items-center p-2 text-amber-400 inter-regular  "
              : "flex items-center p-2 text-gray-200 rounded-lg "
          }
        >
          <FaHouse size={22} className="" />
          <span className="flex-1 ms-3 text-sm lg:text-base whitespace-nowrap">
            {" "}
            Home{" "}
          </span>
        </NavLink>
      </li>
    </>
  );
};

export default AdminSidebar;
