

import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { TBooking } from "../../../pages/Booking";
import { useCreateBookingMutation } from "../../../redux/features/booking/bookingApi";


type TModalProps = {
  open : boolean,
  setOpen : React.Dispatch<React.SetStateAction<boolean>>,
  booking : TBooking 
}


export default function ConfirmBookingModal({ open, setOpen, booking} : TModalProps) {
    const [createBooking , {isLoading }] = useCreateBookingMutation();
    const navigate = useNavigate();


const handleConfirmBooking = async () => {
    const res = await createBooking(booking);
    if(res?.data?.success){
         toast.success('Booking has been confirmed!');
         setOpen(false)
         navigate('/cars')
    }else{
        toast.error('Something went wrong') 
    }
}

const { car, date,location,paymentMethod,phone, startTime ,user  } = booking;


  return (
    <section className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-50  bg-black/30 backdrop-blur-sm flex justify-center items-center overflow-y-auto px-4 md:px-0">  
       
       <div className="w-[400px] md:w-[600px] p-5 bg-white rounded-md relative" >

        {/* loading white layer  */}
      {isLoading && <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0 bg-white/80 rounded-md flex justify-center items-center"> 
        <ClipLoader
           color='#000002'
           loading={isLoading}
          //  cssOverride={override}
           size={60}
           aria-label="Loading Spinner"
           speedMultiplier={0.8} />
      </div>}


      <div className="bg-opacity-75 flex items-center justify-center ">
    {/* <!-- Modal Content --> */}
    <div className="bg-white w-full">
        {/* <!-- Modal Header --> */}
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Confirm Your Booking</h2>
            <button onClick={() => setOpen(!open)} className="text-gray-500 hover:bg-gray-300 text-4xl px-2">&times;</button>
        </div>

        {/* <!-- User Info --> */}
        <div className="flex items-center mb-4">
            <img src={user.image} alt="User Image" className="w-12 h-12 rounded-full mr-4 object-cover"/>
            <div>
                <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
            </div>
        </div>

        {/* <!-- Booking Date and Phone --> */}
        <div className="mb-4">
            <p className="text-sm text-gray-700"><span className="font-semibold">Date:</span> {date}</p>
            <p className="text-sm text-gray-700"><span className="font-semibold">Phone:</span> {phone}</p>
            <p className="text-sm text-gray-700"><span className="font-semibold">Location:</span> {location}</p>
        </div>

        {/* <!-- Car Info --> */}
        <div className="mb-4">
            <img src={car.images[0]} alt="Car Image" className="w-full h-40 object-cover rounded-lg mb-2"/>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Car: {car.name}</h3>
           
            <p className="text-sm text-gray-700"><span className="font-semibold">Features:</span>  {car.features.join(',')} </p>
            <p className="text-sm text-gray-700"><span className="font-semibold">Cost per Hour:</span> ${car.pricePerHour}</p>
            <p className="text-sm text-gray-700"><span className="font-semibold">Payment Method:</span> {paymentMethod}</p>
        </div>

        {/* <!-- Total Cost and Time --> */}
        <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-700"><span className="font-semibold">Start Time:</span> {startTime} </p>
            <p className="text-sm text-gray-700"><span className="font-semibold">Total Cost:</span> $0</p>
        </div>

        {/* <!-- Confirm Button --> */}
        <div className="text-right">
        <button onClick={handleConfirmBooking} className="px-8 text-sm lg:text-base mt-6 mr-3 py-2 md:py-2 font-semibold text-white rounded transition bg-blue-600 hover:bg-gray-800 "> Confirm</button>
        </div>
    </div>
</div>

</div>
       
       </section>
  )
}
