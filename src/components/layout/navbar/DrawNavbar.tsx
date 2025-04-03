
import { AiOutlineClose } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";


const DrawNavbar = () => {
  const user = useAppSelector(state => state.auth.user)

  const navLinks = <>
  <li ><NavLink to='/' className={`cursor-pointer font-semibold  px-4 py-[3px] text-gray-300  hover:border-b-[1px] border-b-gray-400 rounded`} >Home</NavLink></li>
  
  <li ><NavLink to='/cars' className={`cursor-pointer font-semibold  px-4 py-[3px] text-gray-300  hover:border-b-[1px] border-b-gray-400 rounded`} >Cars</NavLink></li>

  <li ><NavLink to='/sign-up' className={`cursor-pointer font-semibold  px-4 py-[3px] text-gray-300  hover:border-b-[1px] border-b-gray-400 rounded`} >Sign Up</NavLink></li>

  <li ><NavLink to={user?.role === 'user'? '/dashboard/user-overview' : '/dashboard/admin-overview' } className={`cursor-pointer font-semibold  px-4 py-[3px] text-gray-300  hover:border-b-[1px] border-b-gray-400 rounded`} >Dashboard</NavLink></li>


  <li ><NavLink to='/about-us' className={`cursor-pointer font-semibold  px-4 py-[3px] text-gray-300  hover:border-b-[1px] border-b-gray-400 rounded`} >About Us</NavLink></li>

 
  
 </>

    return (
        <>
          {/* daisy ui drawer  */}
    <div className="drawer z-40 ">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
   
  <div className="drawer-side">
    {/* close button for drawer outside  */}
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

    <div className={`menu p-4 w-64 min-h-full bg-[#232636]`}>
   {/* Drawer content here */}

      {/* close button inside drawer  */}
      <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay flex justify-end p-2"><AiOutlineClose size={21}/> </label>

      <div className="flex items-center gap-2 mt-2 mb-6">
      <div className="flex items-center gap-1" >
      <h3 className="text-amber-500 carter-one-regular text-2xl">ZipCar</h3>
</div>
    </div>
    
    <div className="flex flex-col gap-4">
     {navLinks}
    </div>

    </div>
  </div>
</div>
        </>
    );
};

export default DrawNavbar;