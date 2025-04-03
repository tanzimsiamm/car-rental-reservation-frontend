import Card from "./Card";


const services  = [
    {
        id : 1,
        title: 'Find Your Dream Car',
        description: 'We provide various types of houses from the cheapest to premium.',
        logo : '/car-2-svgrepo-com.svg'
    },
    {
        id : 2,
        title: 'Best Service Guarantee',
        description: 'We provide various types of cars from the cheapest to premium.',
        logo : '/star-fall-2-svgrepo-com.svg'
    },
    {
        id : 3,
        title: '100% Safe Transactions',
        description: 'We provide various types of cars from the cheapest to premium.',
        logo : '/verify-svgrepo-com (1).svg'
    },
]

const WhyChooseUs = () => {

    return (
       <>
         <div id="service-section" className=" my-14 md:my-16 lg:my-20 xl:my-24 pb-16">

         <h1 className="text-zinc-400 text-center text-3xl lg:text-5xl carter-one-regular my-2">Why Choose Us</h1>
     <p className="text-center text-sm md:text-lg max-w-[1040px] mx-auto text-zinc-400 mt-0 md:mt-2 mb-10 md:mb-16 lg:mb-20 font-play" >Experience the extraordinary with our range of signature products.  promising.</p>



            {/* flex container  */}
            <div className="flex flex-col md:flex-row gap-5 lg:gap-10 justify-between">

            {services?.map(service => <Card key={service.id} service={service}/>)}
            </div>
       
        </div>
       </>
    );
};

export default WhyChooseUs;
