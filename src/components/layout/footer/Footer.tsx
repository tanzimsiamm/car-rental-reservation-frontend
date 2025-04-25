import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
  FaPinterestP,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="pt-12 mt-32 bg-gray-100">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-12 gap-8 pb-12">
        {/* Brand Section */}
        <div className="space-y-6 col-span-12 md:col-span-6 lg:col-span-4">
          <div className="flex items-center gap-2">
            <h2
              className="text-3xl lg:text-4xl font-bold"
              style={{
                fontFamily: "'Poppins', sans-serif",
                background: "linear-gradient(90deg, #F59E0B, #D97706)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              DriveSpark
            </h2>
          </div>
          <p className="text-gray-500 text-sm lg:text-base">
            DriveSpark New York (Main Branch)
            <br />
            1234 Broadway, Suite 567,
            <br />
            New York, NY 10001, USA
          </p>
          <div className="flex gap-4 text-yellow-500 text-2xl">
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="hover:text-red-600 transition-colors"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="hover:text-red-600 transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href="https://x.com"
              aria-label="Twitter"
              className="hover:text-red-600 transition-colors"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="hover:text-red-600 transition-colors"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://pinterest.com"
              aria-label="Pinterest"
              className="hover:text-red-600 transition-colors"
            >
              <FaPinterestP />
            </a>
          </div>
        </div>

        {/* About Section */}
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <h2
            className="text-zinc-800 font-semibold text-lg mb-5"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            About
          </h2>
          <div className="flex flex-col gap-3 text-gray-500 text-sm">
            <span className="cursor-pointer hover:text-yellow-500 transition-colors">
              Shipping Policy
            </span>
            <span className="cursor-pointer hover:text-yellow-500 transition-colors">
              Returns Policy
            </span>
            <span className="cursor-pointer hover:text-yellow-500 transition-colors">
              Terms and Conditions
            </span>
            <span className="cursor-pointer hover:text-yellow-500 transition-colors">
              Privacy Policy
            </span>
          </div>
        </div>

        {/* Services Section */}
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <h2
            className="text-zinc-800 font-semibold text-lg mb-5"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Services
          </h2>
          <div className="flex flex-col gap-3 text-gray-500 text-sm">
            <span className="cursor-pointer hover:text-yellow-500 transition-colors">
              Luxury Cars
            </span>
            <span className="cursor-pointer hover:text-yellow-500 transition-colors">
              Economy Cars
            </span>
            <span className="cursor-pointer hover:text-yellow-500 transition-colors">
              SUVs
            </span>
            <span className="cursor-pointer hover:text-yellow-500 transition-colors">
              Electric Vehicles
            </span>
          </div>
        </div>

        {/* Contact Section */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <h2
            className="text-zinc-800 font-semibold text-lg mb-5"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Have Questions?
          </h2>
          <div className="flex flex-col gap-3 text-sm">
            <span className="text-yellow-500 cursor-pointer hover:text-red-600 transition-colors">
              +1-800-555-1234
            </span>
            <span className="text-yellow-500 cursor-pointer hover:text-red-600 transition-colors">
              support@DriveSpark.com
            </span>
            <p className="text-gray-500 font-medium">
              Dedicated Customer Support
            </p>
            <p className="text-gray-500 text-xs">
              Mon-Fri: 8AM-8PM
              <br />
              Sat-Sun: 10AM-6PM
            </p>
          </div>
        </div>

        {/* Payments Section */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <h2
            className="text-zinc-800 font-semibold text-lg mb-5"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Accepted Payments
          </h2>
          <div className="flex flex-wrap gap-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
              alt="Visa payment method"
              className="h-10 object-contain"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
              alt="MasterCard payment method"
              className="h-10 object-contain"
            />
            <img
              src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg"
              alt="PayPal payment method"
              className="h-10 object-contain"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a3/American_Express_logo_%282015%29.svg"
              alt="American Express payment method"
              className="h-10 object-contain"
            />
          </div>
        </div>
      </section>

      <div className="text-center py-8 border-t border-gray-200">
        <p
          className="text-gray-500 text-sm"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Copyright © 2025 DriveSpark Ltd. All rights reserved.
        </p>
      </div>
    </div>
  );
}
