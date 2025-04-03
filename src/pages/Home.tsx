import Banner from "../components/ui/home/banner/Banner";
import FeaturedCars from "../components/ui/home/FeaturedCars";
import TestomonialSection from "../components/ui/home/testimonial/TestimonialSection";
import WhyChooseUs from "../components/ui/home/whyChooseUs/WhyChooseUs";


const Home = () => {
    return (
        <>
         <Banner/> 
         <FeaturedCars/>
         <WhyChooseUs/>
         <TestomonialSection/>
        </>
    );
};

export default Home;