/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { RiEditBoxLine } from "react-icons/ri";
import { toast } from "sonner";
import { useGetSingleUserQuery, useUpdateUserMutation } from "../../../redux/features/user/userApi";
import { useAppSelector } from "../../../redux/hooks";
import { TUser } from "../../../redux/features/authentication/authSlice";
import BookingHistory from "../components/BookingHistory";
import { RootState } from "../../../redux/store";


const UserOverview = () => {

    const [ open ,setOpen ] = useState(false);
    const state = useAppSelector((state: RootState) => state)
    const { data} = useGetSingleUserQuery(state.auth?.user?.email as string)
    const [ updateUser ] = useUpdateUserMutation();
   
    const user: TUser = data?.data || []

    const handleSubmit = async (e:any) => {
        e.preventDefault()
          const form = e.target;
        
        const updatedInfo = {
          name: form.name.value,
          address : form.address.value,
          image: form.image.value,
      }

      const res = await updateUser({
        userId :  user?._id as string,
        payload : updatedInfo
      })

      if(res?.data?.success){
        toast.success('Updated Successfully')
        setOpen(false)
      }
      else{
        toast.error('Something went wrong');
      }

    }

    return (
        <div className="p-4 lg:px-8 max-w-7xl mx-auto">

        <section className="flex justify-end items-center gap-1 font-play">
        
      
          {/* custom modal  */}
           {open && <section className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-50  backdrop-blur-sm flex justify-center items-center">
           
           <form className="w-[400px] md:w-[500px] p-7 bg-white rounded-lg" onSubmit={handleSubmit}>
    
            <div className="flex justify-center items-center">
              <img className="md:w-44 w-32 object-cover h-32 md:h-44 rounded-lg" src={user?.image} />
            </div>
    
    <div className="relative z-0 w-full mb-5 group">
        <input type="text"  id="floating_repeat_password" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" defaultValue={user?.name} placeholder=" " name='name' />
        <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Name </label>
        
    </div>
    <div className="relative z-0 w-full mb-5 group">
        <input type="text"  id="floating_repeat_password" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={user?.email} placeholder=" " name='email' />
        <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Email </label>
        
    </div>
    <div className="relative z-0 w-full mb-5 group">
        <input type="text"  id="floating_repeat_password" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" defaultValue={user?.address} placeholder=" " name='address' />
        <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Your Address </label>
        
    </div>
    
    
    <div className="mb-3">
        <label className="text-lg text-gray-600"> Change Photo </label>
          <input name="image" defaultValue={user?.image}
        className="relative m-0 block mt-1 w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-600 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
        type="text"
        id="formFileMultiple"
         />
        </div>
    
    
    
    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Update Changes</button>
    <button onClick={() => setOpen(!open)} className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mt-2 md:ml-3  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Close </button>
    </form>
           
           </section>
    }
        </section>
    
        <div className="p-8 bg-[#171A21] shadow mt-24 flex flex-col lg:flex-row">
          <div className="grid grid-cols-1 md:grid-cols-3">
           
            <div className="relative">
              <div className=" w-32 h-32 xl:w-48 xl:h-48 border-2 p-1   mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                    <img src={user?.image} className="w-full h-full rounded-full object-cover" />
              </div>
            </div>
        
          </div>
        
          <div className="mt-28  border-b pb-12">
            <h1 className="text-4xl font-medium text-gray-300">{user?.name} </h1>
            <p className="font-light text-gray-400 mt-3"> Address : <span className="text-blue-400">{user?.address}</span>  </p>

            <p className="mt-2 text-zinc-400 whitespace-nowrap"> User Id : zetge433dsfs4rbfkdf</p>
            <p className="mt-8 text-zinc-400"> Email - {user?.email}</p>
            <p className="mt-1 text-zinc-400 capitalize"> Role - {user?.role}</p>
          </div>

        
          <div className="mt-12 flex flex-col justify-center">
          
          <div  className="flex items-center gap-3 justify-center my-3">
          <button className="hover:underline inter-regular text-zinc-400" onClick={() => setOpen(!open)} > Update Your Profile </button>
          <RiEditBoxLine className="text-blue-500" size={25}/>
          </div>
            <p className="text-gray-400 text-center font-light lg:px-16">An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.</p>
            <button
          className="text-indigo-500 py-2 px-4  font-medium mt-4"
        >
          Show more
        </button>
          </div>
        
        </div>

        <BookingHistory/>
        </div>
    );
};

export default UserOverview;