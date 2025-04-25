import { useState, useEffect } from "react";
import Headroom from "react-headroom";
import { HiOutlineMenu } from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { logout } from "../../../redux/features/authentication/authSlice";
import Container from "../Container";
import DrawNavbar from "./DrawNavbar";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let closeTimeout: NodeJS.Timeout | null = null;

  const handleMouseEnter = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 150);
  };

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".dropdown-container")) {
      setIsDropdownOpen(false);
    }
  };

  const logoutUser = () => {
    try {
      dispatch(logout());
      toast.success("Logout Successfully!");
      navigate("/");
      setIsDropdownOpen(false);
    } catch (error) {
      toast.error("Failed to log out");
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      if (closeTimeout) {
        clearTimeout(closeTimeout);
      }
    };
  }, []);

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-[15px] px-4 py-2 transition-all ${
              isActive
                ? "text-yellow-500 border-b-2 border-yellow-500 font-semibold"
                : "text-zinc-800 hover:text-yellow-500"
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
            `text-[15px] px-4 py-2 transition-all ${
              isActive
                ? "text-yellow-500 border-b-2 border-yellow-500 font-semibold"
                : "text-zinc-800 hover:text-yellow-500"
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
              `text-[15px] px-4 py-2 transition-all ${
                isActive
                  ? "text-yellow-500 border-b-2 border-yellow-500 font-semibold"
                  : "text-zinc-800 hover:text-yellow-500"
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
            `text-[15px] px-4 py-2 transition-all ${
              isActive
                ? "text-yellow-500 border-b-2 border-yellow-500 font-semibold"
                : "text-zinc-800 hover:text-yellow-500"
            }`
          }
        >
          About Us
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      <DrawNavbar />
      <Headroom>
        <div className="bg-gray-100">
          <Container>
            <section className="flex justify-between items-center h-16 md:h-[90px]">
              <NavLink to="/" className="flex items-center gap-2">
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
                    className="text-2xl md:text-3xl italic"
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
                    Drive
                    <span>
                      <span
                        style={{
                          fontWeight: 950,
                          textShadow: "2.5px 2.5px 4px rgba(0, 0, 0, 0.3)",
                          WebkitTextStroke: "0.5px #D97706",
                        }}
                      >
                        S
                      </span>
                      park
                    </span>
                  </h3>
                </div>
              </NavLink>

              <ul className="hidden lg:flex items-center text-[15px] gap-6">
                {navLinks}
              </ul>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-4">
                  {!user ? (
                    <Link to="/sign-up">
                      <button
                        className="px-6 py-2 text-sm font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-all duration-300"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        Sign Up
                      </button>
                    </Link>
                  ) : (
                    <div
                      className="relative dropdown-container"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <img
                        src={
                          user?.image ||
                          "https://i.ibb.co/Ttgtb82/pngwing-com-15.png"
                        }
                        className="w-9 h-9 object-cover cursor-pointer rounded-full border border-gray-300"
                        alt={`${user?.name || "User"}'s avatar`}
                        aria-label="User profile"
                        tabIndex={0}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setIsDropdownOpen(!isDropdownOpen);
                          }
                        }}
                      />
                      <ul
                        className={`absolute right-0 top-10 w-52 bg-white shadow-lg rounded-lg p-2 transition-all duration-200 z-[1000] ${
                          isDropdownOpen
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 translate-y-2 pointer-events-none"
                        }`}
                        role="menu"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <li
                          className="text-base p-2 border-b text-zinc-800 flex items-center gap-2"
                          role="menuitem"
                        >
                          {user?.name || "User"}
                          <img
                            src={
                              user?.image ||
                              "https://i.ibb.co/Ttgtb82/pngwing-com-15.png"
                            }
                            className="w-8 h-8 object-cover rounded-full border border-gray-300"
                            alt={`${user?.name || "User"}'s avatar`}
                          />
                        </li>
                        <li
                          className="text-base text-zinc-800 p-2 rounded hover:bg-gray-200 cursor-pointer transition-all duration-200"
                          onClick={logoutUser}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              logoutUser();
                            }
                          }}
                          role="menuitem"
                          tabIndex={0}
                        >
                          Log out
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                <label
                  htmlFor="my-drawer"
                  className="lg:hidden text-2xl text-zinc-800 cursor-pointer"
                  aria-label="Open mobile menu"
                >
                  <HiOutlineMenu />
                </label>
              </div>
            </section>
          </Container>
        </div>
      </Headroom>
    </>
  );
}