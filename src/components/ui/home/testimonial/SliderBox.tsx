
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsArrowLeft } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import { useRef } from 'react';
import { TReviews } from './TestimonialSection';




function SliderBox({ reviews } : { reviews : TReviews[]}) {
  
  // get slider reference for custom buttons
  const sliderRef = useRef<Slider>(null)
 
  const settings = {
    infinite: true, 
    speed: 900, 
    autoplay: true, 
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1, 
    arrows: false
  };

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };


  return (
    <div className=" autoplay-slider w-full relative">
       
      <Slider ref={sliderRef} {...settings}>

       {reviews.map(review => {
        return (
          <>
           <div className={`shadow-2xl rounded-lg flex flex-col md:flex-row gap-3 md:gap-6 lg:gap-8 xl:gap-10 `}>

             {/* content part  */}
          <div className='md:w-[70%] flex flex-col justify-center gap-2 lg:gap-3 py-2'>

          <h1 className="text-zinc-400 text-2xl lg:text-3xl xl:text-4xl carter-one-regular my-10">Our Client's Reviews & Testimonials</h1>
    

          <h4 style={{lineHeight: 1.4}} className={`text-center md:text-left md:text-base lg:text-xl  xl:text-xl inter-normal text-zinc-300 `}>{review.description}</h4>

          {/* rating  */}
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className='w-6 cursor-pointe' viewBox="0 0 24 24" fill="#F59E0B">
                    <path 
                        d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" 
                        fill={ star <= review.rating ? "#F59E0B" :"#94a3b8" } />
                </svg>
            ))}
        </div>
   

          <h2 className={`text-xl md:text-base lg:text-lg xl:text-2xl text-zinc-300 inter-medium`}> {review.user_name} </h2>
             <h4 className={`text-xs lg:text-sm xl:text-base text-zinc-400`}> {review.user_position} </h4>
          </div>

           {/* image part  */}
           <div  className="mx-auto w-80 h-72 lg:w-[420px] lg:h-80 xl:w-[720px] xl:h-96 ">
                <img src={review.user_img} className="rounded-full w-full h-full object-contain" />
             </div>

        </div>
          </>
        )
       })}
        
      </Slider>

{/* custom button for slick slider  */}
      <div className='flex items-center gap-3 absolute bottom-[5%] md:bottom-[12%] left-[30%] md:right-[10%]'>

      <div  onClick={()=> handlePrev()} className={`rounded-l-full text-xl md:text-2xl lg:text-4xl px-3 py-1 cursor-pointer text-zinc-400`}> <BsArrowLeft/> </div>
      <div onClick={() => handleNext()}   className={`rounded-r-full text-xl md:text-2xl lg:text-4xl px-3 py-1 cursor-pointer  text-zinc-400`}> <BsArrowRight/> </div>
      </div>
    </div>
  );
}

export default SliderBox;