import { FaXTwitter, FaTelegram, FaLinkedinIn, FaFacebookF, FaHouse, FaLocationDot } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import { MdOutlinePhone } from "react-icons/md";
import Container from "../components/layout/Container";
import OurFleet from "../components/ui/aboutUs/OurFleet";
import TeamSection from "../components/ui/aboutUs/teamSection/TeamSection";

const AboutUs = () => {
  return (
    <Container>
      {/* Company History */}
      <section className="bg-gray-100 py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8"
            style={{
              fontFamily: "'Poppins', sans-serif",
              background: "linear-gradient(90deg, #F59E0B, #D97706)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.05em",
              textShadow: "1.5px 1.5px 3px rgba(0, 0, 0, 0.3)",
            }}
          >
            Our Story
          </h2>
          <div className="max-w-3xl mx-auto text-gray-500 text-base md:text-lg space-y-4">
            <p style={{ fontFamily: "'Poppins', sans-serif" }}>
              Founded in 2005, DriveSpark began as a modest local rental service and has since evolved into a trusted leader in the car rental industry. Our fleet now boasts an extensive range of vehicles, from sleek compacts to luxurious SUVs, catering to every traveler's needs.
            </p>
            <p style={{ fontFamily: "'Poppins', sans-serif" }}>
              Our dedication to exceptional customer service and a reliable fleet has built a loyal community and earned us industry recognition. We continuously innovate, integrating cutting-edge technology to ensure a seamless and delightful rental experience.
            </p>
            <p style={{ fontFamily: "'Poppins', sans-serif" }}>
              Today, we uphold our commitment to excellence, making every journey safe, convenient, and memorable. Join us as we continue to drive the future of car rentals.
            </p>
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <OurFleet />

      {/* Mission and Values */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Our Mission"
                className="w-full h-80 object-cover rounded-2xl shadow-md"
                style={{ filter: "brightness(0.95)" }}
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/800x600?text=Image+Not+Found";
                }}
              />
            </div>
            <div className="lg:w-1/2 flex flex-col gap-6">
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  background: "linear-gradient(90deg, #F59E0B, #D97706)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "0.05em",
                  textShadow: "1.5px 1.5px 3px rgba(0, 0, 0, 0.3)",
                }}
              >
                Our Mission & Values
              </h2>
              <p
                className="text-gray-500 text-base md:text-lg"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                At DriveSpark, our mission is to empower every journey with freedom, reliability, and joy. We value integrity, innovation, and customer satisfaction, ensuring that every interaction reflects our commitment to excellence. Our team is driven by a passion for sustainable mobility and creating unforgettable experiences on the road.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* Contact Section */}
      <section className="bg-gray-100 py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Map */}
            <div className="lg:w-1/2">
              <div className="w-full h-80 rounded-2xl overflow-hidden shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.3420383605!2d-74.247896728125!3d40.69714939585013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1720767292885!5m2!1sen!2sus"
                  className="w-full h-full"
                  loading="lazy"
                  title="DriveSpark Location"
                ></iframe>
              </div>
            </div>
            {/* Contact Info */}
            <div className="lg:w-1/2 flex flex-col gap-6">
              <h2
                className="text-2xl md:text-3xl font-semibold text-zinc-800"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Get in Touch
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <FaHouse className="text-yellow-500 text-2xl" />
                  <p
                    className="text-gray-500 text-base"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    DriveSpark LTD, 1234 Broadway, Suite 567, New York, NY 10001, USA
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <TfiEmail className="text-yellow-500 text-2xl" />
                  <p
                    className="text-gray-500 text-base"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Email: support@DriveSpark.com
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <MdOutlinePhone className="text-yellow-500 text-2xl" />
                  <p
                    className="text-gray-500 text-base"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Phone: +1-800-555-1234
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <FaLocationDot className="text-yellow-500 text-2xl" />
                  <p
                    className="text-gray-500 text-base"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    New York, USA
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://twitter.com"
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-yellow-500 hover:text-red-600 focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
                  aria-label="Twitter"
                >
                  <FaXTwitter size={18} />
                </a>
                <a
                  href="https://telegram.org"
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-yellow-500 hover:text-red-600 focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
                  aria-label="Telegram"
                >
                  <FaTelegram size={18} />
                </a>
                <a
                  href="https://linkedin.com"
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-yellow-500 hover:text-red-600 focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={18} />
                </a>
                <a
                  href="https://facebook.com"
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-yellow-500 hover:text-red-600 focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default AboutUs;