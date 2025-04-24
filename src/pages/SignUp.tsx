/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { toast } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useSignUpMutation } from "../redux/features/authentication/authApi";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [signUp] = useSignUpMutation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch("password");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    const result: any = await signUp({
      ...data,
      role: "user",
    });

    if (result?.error?.data?.message) {
      toast.error("Email is already registered");
      setLoading(false);
      return;
    } else if (result?.data?.success) {
      toast.success("Registered Successfully! Please Login");
      navigate("/login");
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
          Create an Account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300 bg-white"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Name cannot exceed 20 characters",
                },
              })}
            />
            {errors.name && typeof errors.name.message === "string" && (
              <p
                className="text-red-500 text-xs mt-1"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {errors.name.message}
              </p>
            )}
          </div>

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
                placeholder="Create a password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300 bg-white"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,8}$/,
                    message:
                      "Password must include 1 uppercase, 1 lowercase, 1 number, 1 special character, and be 6-8 characters long",
                  },
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

          {/* Confirm Password */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300 bg-white"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) => value === password || "Passwords do not match",
                })}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && typeof errors.confirmPassword.message === "string" && (
              <p
                className="text-red-500 text-xs mt-1"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300 bg-white"
              {...register("phoneNumber", {
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Please enter a valid phone number",
                },
              })}
            />
            {errors.phoneNumber && typeof errors.phoneNumber.message === "string" && (
              <p
                className="text-red-500 text-xs mt-1"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
              {...register("terms", {
                required: "You must agree to the Terms & Conditions",
              })}
            />
            <label
              className="text-sm text-gray-700"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              I agree to the{" "}
              <a
                href="/terms"
                target="_blank"
                className="text-yellow-500 hover:text-red-600 underline"
              >
                Terms & Conditions
              </a>
            </label>
          </div>
          {errors.terms && typeof errors.terms.message === "string" && (
            <p
              className="text-red-500 text-xs mt-1"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {errors.terms.message}
            </p>
          )}

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
              "Sign Up"
            )}
          </button>
        </form>

        {/* Sign In Link */}
        <p
          className="text-center text-sm text-gray-500 mt-4"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-yellow-500 hover:text-red-600 font-semibold underline"
          >
            Log In
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