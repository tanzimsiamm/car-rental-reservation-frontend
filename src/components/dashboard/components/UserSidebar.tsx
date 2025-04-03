import { FaHouse } from "react-icons/fa6";
import { VscTasklist } from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import { HiViewGrid } from "react-icons/hi";

const UserSidebar = () => {
  return (
    <>
      {/* <li>
       <NavLink to="/dashboard/manage-cars" className={({isActive})=> isActive? ' flex items-center p-2 text-amber-400 inter-regular  ': 'flex items-center p-2 text-gray-200 rounded-lg ' }>
       <FaCarAlt size={22} className="" />
          <span className="flex-1 ms-3 text-sm lg:text-base whitespace-nowrap">Manage Cars</span>
         
       </NavLink>
</li> */}

      <li>
        <NavLink
          to="/dashboard/user-overview"
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
          to="/dashboard/my-bookings"
          className={({ isActive }) =>
            isActive
              ? " flex items-center p-2 text-amber-400 inter-regular   "
              : "flex items-center p-2 text-gray-200 rounded-lg  "
          }
        >
          <VscTasklist size={22} className="" />
          <span className="flex-1 ms-3 text-sm lg:text-base whitespace-nowrap">
            MY Bookings
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

export default UserSidebar;
