/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link, useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { toast } from "sonner";
import { useSignUpMutation } from "../redux/features/authentication/authApi";


// const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const imageUploadApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`


export default function SignUp() {
  const { register, handleSubmit, formState: {errors}} = useForm();
  const [ loading , setLoading ] = useState(false)
  const [ signUp] = useSignUpMutation();
 
 
    const navigate = useNavigate();


    const onSubmit = async (data: FieldValues) => {
      setLoading(true)

     const result : any = await signUp({
      ...data,
      role :'user',
     })

     console.log(result)

     if(result?.error?.data?.message){
      toast.error('Email is already exist')
      setLoading(false)
      return;
     }
     else if(result?.data?.success)
      toast.success('Registered Successfully! Please Login')
      navigate('/login');
    }


  return (
    <div className="hero h-[700px] md:h-[750px] px-4 ">
    <div className="hero-content flex-col w-full gap-0">

    <div className="text-center lg:text-left pt-5 rounded-l-lg">
        <h1 className="text-[27px] lg:text-[36px] text-white/90 text-center mb-4 carter-one-regular"> Create New Account !</h1>
      </div>

      <div className="rounded flex-shrink-0 w-full max-w-2xl  bg-black/20">
        <div className= " p-6 lg:p-10">


        <form onSubmit={handleSubmit(onSubmit)} className="text-white">
            
          <div className="form-control">
            <label className="label">
              <span className="">Name</span>
            </label>
            <input type="text" placeholder="Name" className="input border border-zinc-600 focus:border-zinc-400 bg-transparent  " {...register('name',{required: true, minLength: 3, maxLength: 20})} />
            <span className="text-red-400 font-semibold text-sm p-1"> {errors.name?.type === 'required' && 'Name is required'} {errors.name?.type === 'minLength' && 'Name Must Have 3 Characters'} {errors.name?.type === 'maxLength' && 'Name Maximum 20 Characters'}  </span>
          </div>


          <div className="form-control">
            <label className="label">
              <span className="">Email</span>
            </label>
            <input type="email" placeholder="Email" className="input border border-zinc-600 focus:border-zinc-400  bg-transparent " {...register('email', {required: true, pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} />

            <span className="text-red-400 font-semibold text-sm p-1">{errors.email?.type === 'required' && 'Email is required'} {errors.email?.type === 'pattern' && 'Please input a valid email'}</span>
          </div>


          <div className="form-control">
            <label className="label">
              <span className="">Password</span>
            </label>
            <input type="text" placeholder="Password" className="input border border-zinc-600 focus:border-zinc-400  bg-transparent " {...register('password', {required: true, pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,8}$/ })} />

            <span className="text-red-400 font-semibold text-sm p-1"> {errors.password?.type === 'required' && 'Password is required'} {errors.password?.type === 'pattern' && 'Min 1 uppercase letter, 1 lowercase letter, 1 special character, 1 number, min 6 characters, max 8 characters.'} </span>


            <div>
                <h4 className="text-sm font-semibold text-amber-400"> Already Have An Account? <Link to='/login'> <span className="text-white/80 underline"> Login</span></Link> </h4>
            </div>
          
          </div>

          <div className="form-control">
            <label className="label">
              <span className="">Photo URL</span>
            </label>
            <input type="text" placeholder="Photo URL" className="input border border-zinc-600 focus:border-zinc-400 bg-transparent  " {...register('image',{required: true})} />
            <span className="text-red-400 font-semibold text-sm p-1"> {errors.image?.type === 'required' && 'Image is required'}  </span>
          </div>


          <div className="form-control mt-6">
            <button className="bg-zinc-700 py-2 px-3 text-zinc-200 rounded font-bold transition-all flex justify-center items-center hover:bg-zinc-600 text-sm md:text-base" type="submit"> {loading? <ClipLoader
           color='#ffffff'
           loading={loading}
          className=""
           size={25}
           aria-label="Loading Spinner"
           speedMultiplier={0.8} /> : 'Sign Up '} 
     </button>
          </div>
        </form>


        </div>
      </div>
    </div>
  </div>
  )
}
