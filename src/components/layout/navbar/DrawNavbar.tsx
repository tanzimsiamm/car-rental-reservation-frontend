import { AiOutlineClose } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";

const DrawNavbar = () => {
  const user = useAppSelector((state) => state.auth.user);

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block px-4 py-3 text-[15px] font-semibold transition-all ${
              isActive
                ? "text-yellow-500 border-l-4 border-yellow-500"
                : "text-zinc-800 hover:text-yellow-500 hover:bg-white"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/cars"
          className={({ isActive }) =>
            `block px-4 py-3 text-[15px] font-semibold transition-all ${
              isActive
                ? "text-yellow-500 border-l-4 border-yellow-500"
                : "text-zinc-800 hover:text-yellow-500 hover:bg-white"
            }`
          }
        >
          Cars
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to={
              user.role === "user"
                ? "/dashboard/user-overview"
                : "/dashboard/admin-overview"
            }
            className={({ isActive }) =>
              `block px-4 py-3 text-[15px] font-semibold transition-all ${
                isActive
                  ? "text-yellow-500 border-l-4 border-yellow-500"
                  : "text-zinc-800 hover:text-yellow-500 hover:bg-white"
              }`
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            `block px-4 py-3 text-[15px] font-semibold transition-all ${
              isActive
                ? "text-yellow-500 border-l-4 border-yellow-500"
                : "text-zinc-800 hover:text-yellow-500 hover:bg-white"
            }`
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/sign-up"
          className={({ isActive }) =>
            `block px-4 py-3 text-[15px] font-semibold transition-all ${
              isActive
                ? "text-yellow-500 border-l-4 border-yellow-500"
                : "text-zinc-800 hover:text-yellow-500 hover:bg-white"
            }`
          }
        >
          Sign Up
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="drawer z-40">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="p-4 w-64 min-h-full bg-gray-100">
          {/* Close button */}
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="flex justify-end p-2"
          >
            <AiOutlineClose className="text-zinc-800" size={21} />
          </label>

          {/* Logo */}
          <NavLink to="/">
          <div className="flex items-center gap-2 mt-2 mb-6">
            <div className="flex items-center gap-1">
              <svg
                className="w-8 h-8 text-amber-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 13H5v2a2 2 0 002 2h10a2 2 0 002-2v-2zM7 17v2m10-2v2m-5-6V7a3 3 0 00-3-3H9a3 3 0 00-3 3v6h12z"
                />
              </svg>
              <h3
                className="text-2xl italic"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 900,
                  background: "linear-gradient(90deg, #F59E0B, #D97706)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "0.05em",
                  textShadow: "1.5px 1.5px 3px rgba(0, 0, 0, 0.2)",
                }}
              >
                Car
                <span>
                  <span
                    style={{
                      fontWeight: 950,
                      textShadow: "2.5px 2.5px 4px rgba(0, 0, 0, 0.3)",
                      WebkitTextStroke: "0.5px #D97706",
                    }}
                  >
                    R
                  </span>
                  ent
                </span>
              </h3>
            </div>
          </div>
          </NavLink>

          {/* Navigation links */}
          <ul className="flex flex-col gap-2">{navLinks}</ul>
        </div>
      </div>
    </div>
  );
};

export default DrawNavbar;