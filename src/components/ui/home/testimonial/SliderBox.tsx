import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";
import { TReviews } from "./TestimonialSection";

function SliderBox({ reviews }: { reviews: TReviews[] }) {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    infinite: true,
    speed: 900,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul className="flex justify-center gap-2 mt-4">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-2 h-2 bg-yellow-500 rounded-full hover:bg-red-600 cursor-pointer transition-all duration-300"></div>
    ),
  };

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <div className="autoplay-slider w-full relative">
      <Slider ref={sliderRef} {...settings}>
        {reviews.map((review) => (
          <div key={review.id} className="px-4">
            <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl flex flex-col md:flex-row gap-6 lg:gap-8 p-6 md:p-8 mx-auto max-w-5xl">
              {/* Content part */}
              <div className="md:w-[60%] flex flex-col justify-center gap-4">
                <p
                  className="text-center md:text-left text-lg lg:text-xl text-gray-500"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    lineHeight: 1.5,
                  }}
                >
                  "{review.description}"
                </p>
                <div className="flex space-x-1 justify-center md:justify-start">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill={
                        star <= Math.round(review.rating)
                          ? "#F59E0B"
                          : "#D1D5DB"
                      }
                    >
                      <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" />
                    </svg>
                  ))}
                </div>
                <h2
                  className="text-xl lg:text-2xl font-semibold text-zinc-800 text-center md:text-left"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {review.user_name}
                </h2>
                <p
                  className="text-sm lg:text-base text-gray-500 text-center md:text-left"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {review.user_position}
                </p>
              </div>

              {/* Image part */}
              <div className="md:w-[40%] flex justify-center items-center">
                <img
                  src={review.user_img}
                  alt={`${review.user_name}'s profile`}
                  className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full object-cover shadow-md"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom buttons for slick slider */}
      <div className="flex items-center gap-4 absolute bottom-[-60px] left-1/2 transform -translate-x-1/2">
        <button
          onClick={handlePrev}
          className="rounded-full p-3 bg-white/90 backdrop-blur-sm shadow-md text-yellow-500 hover:bg-red-600 hover:text-white focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
          aria-label="Previous review"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="rounded-full p-3 bg-white/90 backdrop-blur-sm shadow-md text-yellow-500 hover:bg-red-600 hover:text-white focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
          aria-label="Next review"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default SliderBox;
