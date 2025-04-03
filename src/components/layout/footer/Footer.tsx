import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";


export default function Footer() {
    
  return (
  
     <div className="pt-8 mt-32 bg-[#171A21]">
        <section className="max-w-[1400px] mx-auto px-4 md:px-7 xl:px-3 grid grid-cols-12 gap-8 pb-8">

            <div className="space-y-5 col-span-12 md:col-span-4 lg:col-span-5 xl:col-span-3">
           {/* logo section  */}
    <div className="flex items-center gap-1" >
    <h2 className={`text-amber-500 carter-one-regular text-2xl lg:text-3xl xl:text-4xl whitespace-nowrap `}>ZipCar </h2>
    </div>
            <p className="text-zinc-400">Zipcar Dhaka (Main branch)<br/> 90/1 Motijheel City Centre Level 25-B-1,<br/> Lift 26 Dhaka 1000, Bangladesh</p>

            <div className="flex gap-4 text-zinc-400 text-2xl">
              <a href="/"> <FaFacebookF/> </a>
              <a href="/">  <FaInstagram/> </a>
              <a href="/">  <FaXTwitter/> </a>
              <a href="/">  <FaLinkedinIn/> </a>
              <a href="/">  <FaPinterestP/> </a>
            </div>
            </div>


            <div className="col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-2">
            <h2 className="text-gray-400 font-semibold text-xl mb-5">About</h2>

            <div className="flex flex-col gap-3 text-slate-700/70 ">
            <span className="font-medium text-gray-400  hover:text-amber-500 cursor-pointer">Shipping Policy</span>
            <span className="font-medium text-gray-400  hover:text-amber-500 cursor-pointer">Returns Policy</span>
            <span className="font-medium text-gray-400  hover:text-amber-500 cursor-pointer">Terms and Conditions</span>
            <span className="font-medium text-gray-400  hover:text-amber-500 cursor-pointer">Privacy Policy</span>
           
            </div>
            </div>


            <div className= "col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-2">
            <h2 className="text-gray-400 font-semibold text-xl mb-5">Categories</h2>

            <div className="flex flex-col gap-3 text-slate-700/70 ">
            <span className="font-medium text-gray-400  hover:text-amber-500 cursor-pointer">Activewear</span>
            <span className="font-medium text-gray-400  hover:text-amber-500 cursor-pointer">Dresses</span>
            <span className="font-medium text-gray-400  hover:text-amber-500 cursor-pointer">Tent and Bags</span>
            <span className="font-medium text-gray-400  hover:text-amber-500 cursor-pointer">Shoes and Shoes</span>
           
            </div>
            </div>


            <div className=" col-span-12 md:col-span-12 lg:col-span-9 xl:col-span-2">
            <h2 className="text-gray-400 font-semibold text-xl mb-5">Have Questions?</h2>

            <div className="flex flex-col gap-2">
            <span className=" text-amber-500 text-lg cursor-pointer">+88-09617-111-888</span>
            <span className=" text-amber-500 text-lg cursor-pointer">sales@flightexpert.com</span>
            <span className=" text-gray-400 font-medium text-[15px]  cursor-pointer">Dedicated Customer Support</span>
            <span className=" text-gray-400 text-xs  cursor-pointer">Sat-Thurs: 9AM-9PM <br/>
Friday/Govt. Holidays: 10AM-6PM</span>
           
            </div>
            </div>


            <div className="col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-3 md:px-24 md:py-5 xl:p-0">
            <h2 className="text-gray-400 font-semibold text-xl mb-5">Accepted Payments</h2>
                <img src="/bank-logo.a775fd7b.webp" className=" lg:w-full xl:w-80"/>
            </div>


        </section>

        <div className="text-center py-10"> <h2 className="text-gray-500 font-semibold text-md mb-3">Copyright @2024 FEBD Ltd. All rights reserved by ZipCar</h2></div>
    </div>
 
  )
}
