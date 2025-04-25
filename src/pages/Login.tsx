/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { ClipLoader } from "react-spinners";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useLoginMutation } from "../redux/features/authentication/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/authentication/authSlice";

interface TJwtDecoded {
  role: string;
  [key: string]: any;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    const res: any = await login({
      email: data.email,
      password: data.password,
    });

    if (res?.error?.data?.message === "user not exist") {
      toast.error("Incorrect Email");
    } else if (res?.error?.data?.message === "Password incorrect") {
      toast.error("Incorrect Password");
    } else if (res?.data?.success) {
      const userImage = res?.data?.data?.image;
      const name = res?.data?.data?.name;
      const decoded: TJwtDecoded = jwtDecode(res.data.token);
      dispatch(
        setUser({
          user: { ...decoded, image: userImage, name },
          token: res.data.token,
        })
      );

      toast.success("Logged In Successfully");
      const role = decoded?.role;
      navigate(
        role === "user"
          ? "/dashboard/user-overview"
          : "/dashboard/admin-overview"
      );
    }
    setLoading(false);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 mx-auto">
        <h1
          className="text-3xl md:text-4xl font-bold text-center mb-8"
          style={{
            fontFamily: "'Poppins', sans-serif",
            background: "linear-gradient(90deg, #F59E0B, #D97706)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "0.05em",
          }}
        >
          Log in here
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300 bg-white"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email",
                },
              })}
            />
            {errors.email && typeof errors.email.message === "string" && (
              <p
                className="text-red-500 text-xs mt-1"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300 bg-white"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {errors.password && typeof errors.password.message === "string" && (
              <p
                className="text-red-500 text-xs mt-1"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 focus:ring-2 focus:ring-yellow-500 transition-all duration-300 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {loading ? (
              <ClipLoader
                color="#ffffff"
                loading={loading}
                size={25}
                aria-label="Loading Spinner"
                speedMultiplier={0.8}
              />
            ) : (
              "Log In"
            )}
          </button>
        </form>

        {/* Sign Up Link */}
        <p
          className="text-center text-sm text-gray-500 mt-4"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            className="text-yellow-500 hover:text-red-600 font-semibold underline"
          >
            Sign Up
          </Link>
        </p>

        {/* Footer Links */}
        <div className="mt-6 flex justify-center gap-4 text-sm">
          <p
            className="text-gray-500 hover:text-yellow-500 transition-all duration-300"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Privacy Policy
          </p>
          <p
            className="text-gray-500 hover:text-yellow-500 transition-all duration-300"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Terms of Service
          </p>
        </div>
      </div>
    </section>
  );
}
