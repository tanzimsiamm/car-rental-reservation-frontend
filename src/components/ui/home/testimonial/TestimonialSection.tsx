import SliderBox from "./SliderBox";

export type TReviews = {
  id : number;
  user_img : string;
  user_name : string;
  user_position : string;
  description : string;
  rating : number;
}


const reviews = [
    {
      id:1,
      user_img: '/black-edition-audi-luxury-car-2.png',
      user_name: 'Caroline Willy',
      user_position : 'Senior Architecture',
      description :'I particularly appreciated the personalized approach of their agents, who took the time to understand my specific needs and preferences and worked tirelessly to find properties that met those requirements.',
      rating : 4.7
    },
    {
      id:2,
      user_img: '/red-edition-audi-luxury-car-2.png',
      user_name: 'Imtiaz Sarkar Shimul',
      user_position : 'Senior Architecture',
      description :'I particularly appreciated the personalized approach of their agents, who took the time to understand my specific needs and preferences and worked tirelessly to find properties that met those requirements.',
      rating : 4.3
    },
    {
      id:3,
      user_img: '/audi-4.png',
      user_name: 'Sawyer James',
      user_position : 'Senior Architecture',
      description :'I particularly appreciated the personalized approach of their agents, who took the time to understand my specific needs and preferences and worked tirelessly to find properties that met those requirements.',
      rating : 3.7
    },
    {
      id:4,
      user_img: '/acura-nsx-car-2.png',
      user_name: 'Harly Carlos',
      user_position : 'Senior Architecture',
      description :'I particularly appreciated the personalized approach of their agents, who took the time to understand my specific needs and preferences and worked tirelessly to find properties that met those requirements.',
      rating : 3.7
    },
    
  ]


const TestomonialSection = () => {

    return (
       <>

            <section id="testimonial-section"  className=" bg-[#171A21] p-8 lg:pb-20 rounded-lg">

            {/*slick slider  */}
            <SliderBox reviews={reviews} />

            </section>
       </>
    );
};

export default TestomonialSection;