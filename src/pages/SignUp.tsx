import { Link, useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { toast } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useSignUpMutation } from "../redux/features/authentication/authApi";
import { useLoginMutation } from "../redux/features/authentication/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/authentication/authSlice";
import { jwtDecode } from "jwt-decode";

interface TJwtDecoded {
  role: string;
  [key: string]: any;
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [signUp] = useSignUpMutation();
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmWithPassword] = useState(false);

  const password = watch("password");

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);

    const finalData = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      phone: data.phone,
      address: data.address,
      role: "user",
    };

    try {
      const signUpResult: any = await signUp(finalData);

      if (signUpResult?.error) {
        toast.error(
          signUpResult.error.data?.message ||
            "Something went wrong during sign up."
        );
      } else if (signUpResult?.data?.success) {
        const loginResult: any = await login({
          email: data.email,
          password: data.password,
        });

        if (loginResult?.error) {
          toast.error(
            loginResult.error.data?.message ||
              "Something went wrong during login after sign up."
          );
          navigate("/login");
        } else if (loginResult?.data?.success) {
          const userImage = loginResult?.data?.data?.image;
          const name = loginResult?.data?.data?.name;
          const decoded: TJwtDecoded = jwtDecode(loginResult.data.token);
          dispatch(
            setUser({
              user: { ...decoded, image: userImage, name },
              token: loginResult.data.token,
            })
          );

          toast.success("Signed Up Successfully");
          const role = decoded?.role;
          navigate(
            role === "user"
              ? "/dashboard/user-overview"
              : "/dashboard/admin-overview"
          );
        } else {
          toast.error(
            loginResult?.data?.message ||
              "Unexpected error occurred during login after sign up!"
          );
          navigate("/login");
        }
      } else {
        toast.error(
          signUpResult?.data?.message ||
            "Unexpected error occurred during sign up!"
        );
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
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
          Create an Account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 3, message: "At least 3 characters" },
              })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmWithPassword(!showConfirmPassword)}
                className="absolute right-3 top-2"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
                validate: (value) =>
                  value.length >= 7 || "Phone number must be at least 7 digits",
              })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phone.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              {...register("address", {
                required: "Address is required",
                minLength: {
                  value: 5,
                  message: "Address must be at least 5 characters",
                },
              })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter your address"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">
                {errors.address.message as string}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("terms", {
                required: "You must agree to the Terms & Conditions",
              })}
              className="h-4 w-4"
            />
            <label className="text-sm">
              I agree to the{" "}
              <a
                href="/terms"
                target="_blank"
                className="text-yellow-600 underline"
              >
                Terms & Conditions
              </a>
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-xs mt-1">
              {errors.terms.message as string}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700"
          >
            {loading ? <ClipLoader size={20} color="#fff" /> : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-500 font-medium underline">
            Log In
          </Link>
        </p>
      </div>
    </section>
  );
}
