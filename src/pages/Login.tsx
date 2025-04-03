/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { useLoginMutation } from "../redux/features/authentication/authApi";
import { useAppDispatch } from "../redux/hooks";
import { TJwtDecoded } from "../routes/AdminProtected";
import { setUser } from "../redux/features/authentication/authSlice";


export default function Login() {

  const [ login, ] = useLoginMutation();
  const navigate = useNavigate();
  const [ errors, setErrors] = useState({emailError: '', passwordError: ''})
  const dispatch = useAppDispatch();


    const handleLogin = async (e: any) => {
        e.preventDefault();

        const form  = new FormData(e.target);
        const email = form.get('email')
        const password = form.get('password')


        const res : any = await login({ email, password})

        if(res?.error?.data?.message === 'user not exist'){
          setErrors({...errors, emailError: 'Incorrect Email'})
        }
        else if(res?.error?.data?.message === 'Password incorrect'){
          setErrors({...errors, passwordError: 'Incorrect Password'})
        }
       else if(res?.data?.success){
        const userImage = res?.data?.data?.image;
        const name = res?.data?.data?.name;
        // decode the jwt token 
        const decoded : TJwtDecoded = jwtDecode(res.data.token);
        dispatch(setUser({
          user : { ...decoded, image : userImage, name },
          token : res.data.token
        }))

        toast.success('Logged In Successfully')
        const role = decoded?.role;
        role === 'user'? navigate('/dashboard/user-overview')  :  navigate('/dashboard/admin-overview')
        
       }
    }

  return(
    <div className="hero h-[600px] pb-32 md:pb-0 md:h-[600px] px-4 ">

    <div className="hero-content flex-col w-full">

      <div className="text-center lg:text-left">
        <h1 className="text-3xl lg:text-4xl text-white/90  px-24 py-3 font-bold text-center carter-one-regular">Login now!</h1>
      </div>

      <div className="rounded-md flex-shrink-0 w-full max-w-2xl shadow-2xl bg-black/30">
        <div className="p-10">


        <form onSubmit={handleLogin} className="text-white">

          <div className="form-control">
            <label className="label">
              <span className="">Email</span>
            </label>
            <input onChange={() => setErrors({emailError:'', passwordError: ''})}  type="email" placeholder="Email" className="input border border-zinc-600 focus:border-zinc-400 bg-transparent  " name="email" />
            {errors?.emailError && <span className="text-red-600"> {errors?.emailError} </span>}
          </div>


          <div className="form-control">
            <label className="label">
              <span className="">Password</span>
            </label>
            <input  onChange={() => setErrors({emailError:'', passwordError: ''})} type="text" placeholder="Password" className="input border border-zinc-600 focus:border-zinc-400 bg-transparent " name="password" />
            {errors?.passwordError && <span className="text-red-600"> {errors?.passwordError}</span>}
          

            <div className="mt-3">
                <h4 className="text-sm font-semibold text-amber-400"> Don't Have An Account? <Link to='/sign-up'> <span className="text-zinc-200  underline"> Sign Up </span></Link> </h4>
            </div>

          </div>
          <div className="form-control mt-6">
            <button className="bg-zinc-600 py-2 px-3 text-gray-100 rounded font-semibold transition-all hover:bg-zinc-700 text-sm md:text-base" type="submit"> Login </button>
          </div>
        </form>


        </div>
      </div>
    </div>
  </div>
  )
}
