import { useState } from "react"
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";
import { MdModeEdit } from "react-icons/md";
import { useDeleteUserMutation, useGetUsersQuery } from "../../../redux/features/user/userApi";
import { TUser } from "../../../redux/features/authentication/authSlice";
import UpdateUserModal from "../components/modal/UpdateUserModal";


export default function ManageUsers() {
  
    const [openUpdateModal, setOpenUpdateModal ] = useState<boolean>(false);
    const { data, isLoading } = useGetUsersQuery(undefined);
    const [ deleteUserFromDB ] = useDeleteUserMutation()
    const [updateUserEmail, setUpdateUserEmail ] = useState('')

    const users: TUser[] = data?.data || []


    // delete a product 
    const deleteUser = (userId: string) => {
    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"

}).then( async (result) => {
  if (result.isConfirmed) {
   const response = await deleteUserFromDB(userId).unwrap()
   if(response.success){
    Swal.fire({
      title: "Deleted!",
      text: "User has been deleted.",
      icon: "success"
    });
   }

  }
});
    }

  return (
   <section className="max-w-[1300px] mx-auto px-4 my-2 md:my-6 lg:my-10 mb-10 font-prompt"> 


   <div className="flex justify-center items-center mb-3">
   <h2 className="text-2xl md:text-4xl carter-one-regular text-zinc-300 ">ALL Users</h2>
   </div>

   <div className="text-right mb-7">
  



   {/* update product modal  */}
   {openUpdateModal && <UpdateUserModal userEmail={updateUserEmail} open={openUpdateModal} setOpen={setOpenUpdateModal}/>}
    
   </div>


<div className="flex flex-col ">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table
          className="min-w-full text-center text-sm inter-regular dark:border-neutral-500">
          <thead className=" inter-regular ">
            <tr className="bg-amber-600 h-8 text-white/95 text-[12px] md:text-base ">
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 border-zinc-600 rounded-l-2xl">
               Image
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 border-zinc-600">
              Name
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 border-zinc-600">
            Email
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 border-zinc-600">
           Role
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 border-zinc-600">
           Status
              </th>
             
              
              <th scope="col" className="border-r px-6 py-0 md:py-2 lg:py-4 border-zinc-600"> Action </th>
            
             
            </tr>
          </thead>
          <tbody className="relative">

          {isLoading && <ClipLoader
           color='#FBBF24'
           loading={isLoading}
          className="absolute top-14 left-2/4"
           size={60}
           aria-label="Loading Spinner"
           speedMultiplier={0.8} />}
          
          {users?.map(user =>  <tr key={user._id} className="border-b ">
              <td
                className="whitespace-nowrap border-r px-6 py-4 font-medium border-zinc-500 flex items-center justify-center">
                <img src={user.image} className="w-[52px] h-[52px] md:w-16 md:h-16 object-contain rounded-3xl" />
              </td>
              <td
                className=" border-r font-medium text-sm md:text-lg  text-zinc-400 text-start md:text-center px-6 py-4 border-zinc-500">
                {user.name}
              </td>

              <td
                className=" border-r font-medium text-sm md:text-lg  text-zinc-400 text-start md:text-center px-6 py-4 border-zinc-500">
                {user.email}
              </td>

              <td
                className="whitespace-nowrap font-medium text-lime-500 text-sm md:text-lg border-r px-6 py-4 border-zinc-500">
                {user.role}
              </td>
             
              
              
              <td className="whitespace-nowrap font-medium border-r text-sm md:text-lg  px-6 py-4 border-zinc-500">
             
              <button className={`bg-blue-600 p-1 px-2 md:py-2 md:px-4 text-white rounded font-semibold transition-all hover:bg-blue-700 text-[12px] md:text-base `}
             onClick={() => {
              setUpdateUserEmail(user.email!)
              setOpenUpdateModal(true)
              }} > 
            <MdModeEdit/></button>
    
               </td>

              <td className="whitespace-nowrap font-medium  text-sm md:text-lg  px-6 py-4 border-zinc-500">

             {/* delete product  */}
             <button className={`bg-red-600 p-1 px-2 md:py-2 md:px-4 text-white rounded font-semibold transition-all hover:bg-red-700 text-[12px] md:text-base `}
             onClick={() => deleteUser(user._id!)} > 
             Delete </button>
    
               </td>
            
            </tr>)}
         
          </tbody>
        </table>
        {!users?.length && <p className="text-xl text-center mt-44 text-gray-500"> No Users </p>}
      </div>
    </div>
  </div>
</div>

   </section>
  )
}

