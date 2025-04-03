import Headroom from "react-headroom";
import { HiOutlineMenu } from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { toast } from "sonner";
import { MdDarkMode } from "react-icons/md";
import { MdBrightness5 } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { logout } from "../../../redux/features/authentication/authSlice";
import Container from "../Container";


type TModalProps = {
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
  isDark: boolean;
};

export default function Navbar({ isDark, setDark }: TModalProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(logout());
    toast.success("Logout Successfully!");
    navigate("/");
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={`cursor-pointer inter-thin text-[15[px]]  px-4 py-[3px] text-gray-300  transition hover:text-gray-400 border-b-gray-400`}
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/cars"
          className={`cursor-pointer inter-thin text-[15[px]]  px-4 py-[3px] text-gray-300  transition hover:text-gray-400 border-b-gray-400`}
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
            className={`cursor-pointer inter-thin text-[15[px]]  px-4 py-[3px] text-gray-300  transition hover:text-gray-400 border-b-gray-400`}
          >
            Dashboard
          </NavLink>
        </li>
      )}

      <li>
        <NavLink
          to="/about-us"
          className={`cursor-pointer inter-thin text-[15[px]]  px-4 py-[3px] text-gray-300  transition hover:text-gray-400 border-b-gray-400`}
        >
          About Us
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/sign-up"
          className={`cursor-pointer inter-thin text-[15[px]]  px-4 py-[3px] text-gray-300  transition hover:text-gray-400 border-b-gray-400`}
        >
          Sign Up
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      {/* <DrawerNav/> */}

      <Headroom>
        <div className={`${isDark ? " bg-[#000209]" : "bg-gray-50"}`}>
          <Container>
            <section
              className={`flex justify-between md:pt-2  h-16 md:h-[90px]  ${
                isDark ? "bg-[#000209]" : "bg-gray-50"
              }`}
            >
              {/* logo section  */}
              <div className="flex items-center gap-1">
                {/* <img src='/6201330c4babde0004ca47f.png' className="w-24 md:w-32 lg:w-40 opacity-90"/> */}
                <h3 className="text-amber-500 carter-one-regular text-2xl md:text-3xl">
                  ZipCar
                </h3>
              </div>

              {/* nav menu section  */}
              <ul
                id="nav-menu-list"
                className="hidden lg:flex items-center lg:text-[15px] xl:text-base  lg:gap-3 xl:gap-6 menu-horizontal px-1"
              >
                {navLinks}
              </ul>

              <div className="flex items-center justify-center  gap-2 z-50">
                {/* cart  */}
                <div className="mr-3 md:mr-5 rounded-full text-xl md:text-[22px] lg:text-2xl text-black flex gap-5 md:gap-6 items-center">
                  <span>
                    {" "}
                    <HiMagnifyingGlass className="text-gray-300" />
                  </span>
                  {isDark ? (
                    <span onClick={() => setDark(!isDark)}>
                      {" "}
                      <MdBrightness5 className="text-gray-300 cursor-pointer" />
                    </span>
                  ) : (
                    <span onClick={() => setDark(!isDark)}>
                      {" "}
                      <MdDarkMode className="text-gray-300 cursor-pointer" />
                    </span>
                  )}

                  <div className="dropdown dropdown-end flex items-center justify-center gap-2 z-50">
                    {!user && (
                      <Link to={"/sign-up"}>
                        {" "}
                        <button className=" px-8 text-sm mr-3 py-2 md:py-2 xl:py-3 font-semibold text-white rounded-xl transition bg-white/20 hover:bg-gray-800 whitespace-nowrap">
                          Sign Up
                        </button>
                      </Link>
                    )}

                    <div className="z-30 w-9 md:w-10 rounded-full p-[2px] ">
                      {user && (
                        <img
                          tabIndex={0}
                          src={
                            user?.image ||
                            "https://i.ibb.co/Ttgtb82/pngwing-com-15.png"
                          }
                          className="dropdown w-9 h-7 md:w-8 md:h-8 object-cover cursor-pointer rounded-lg border border-zinc-400 p-[1px]"
                        />
                      )}

                      {user && (
                        <ul
                          tabIndex={0}
                          className={`dropdown-content p-2 shadow bg-zinc-100 rounded w-52 `}
                        >
                          {user && (
                            <li className="text-lg p-2 border-b rounded text-zinc-800 flex items-center gap-2">
                              {" "}
                              {user?.name || "User"}{" "}
                              <img
                                tabIndex={0}
                                src={
                                  user?.image ||
                                  "https://i.ibb.co/Ttgtb82/pngwing-com-15.png"
                                }
                                className="w-8 h-8 object-cover rounded-full border border-gray-300 p-[1px]"
                              />
                            </li>
                          )}

                          <li
                            className="text-base inter-regular cursor-pointer transition-all text-zinc-800 p-1 rounded hover:underline"
                            onClick={logoutUser}
                          >
                            {" "}
                            Log out
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                {/* label for open daisy ui drawer that component has another file  */}
                <label
                  htmlFor="my-drawer"
                  className={`lg:hidden text-xl md:text-2xl text-zinc-200`}
                >
                  <HiOutlineMenu />{" "}
                </label>
                {/* <DrawNavbar /> */}
              </div>
            </section>
          </Container>
        </div>
      </Headroom>
    </>
  );
}
