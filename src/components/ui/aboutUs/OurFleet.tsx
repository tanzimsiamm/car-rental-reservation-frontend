

const OurFleet = () => {
    return (
        <div className="container mx-auto px-4 py-12">
  <div className="text-center mb-10">
  <h2 className="text-3xl lg:text-4xl carter-one-regular text-center text-gray-300 ">Our Fleet</h2>
    <p className=" mt-2 text-gray-400 lg:text-lg">Explore a wide variety of vehicles we have to offer for every journey.</p>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div className="card bg-[#171A21] shadow-xl">
      <figure>
        <img src="/pngegg (122).png" alt="Compact Car" className="w-full h-48 object-contain"/>
      </figure>
      <div className="card-body">
        <h3 className="card-title text-zinc-300">Compact Cars</h3>
        <p className=" text-gray-400">Perfect for city driving, our compact cars are fuel-efficient and easy to park.</p>
      </div>
    </div>

    <div className="card bg-[#171A21] shadow-xl">
      <figure>
        <img src="/pngegg (19).png" alt="SUV" className="w-full h-48 object-contain"/>
      </figure>
      <div className="card-body">
        <h3 className="card-title text-zinc-300">SUVs</h3>
        <p className=" text-gray-400">Spacious and comfortable, ideal for family trips and outdoor adventures.</p>
      </div>
    </div>

    <div className="card bg-[#171A21] shadow-xl">
      <figure>
        <img src="/pngimg.com - mercedes_PNG80204.png" alt="Luxury Car" className="w-full h-48 object-contain"/>
      </figure>
      <div className="card-body">
        <h3 className="card-title text-zinc-300">Luxury Cars</h3>
        <p className=" text-gray-400">Experience the best in comfort and style with our premium luxury cars.</p>
      </div>
    </div>

    <div className="card bg-[#171A21] shadow-xl">
      <figure>
        <img src="/blue-chevrolet-camaro-zl1-convertible-car.png" alt="Convertible" className="w-full h-48 object-contain"/>
      </figure>
      <div className="card-body">
        <h3 className="card-title text-zinc-300">Convertibles</h3>
        <p className=" text-gray-400">Feel the wind in your hair with our sleek and stylish convertibles.</p>
      </div>
    </div>

    <div className="card bg-[#171A21] shadow-xl">
      <figure>
        <img src="/kindpng_1716516.png" alt="Pickup Truck" className="w-full h-48 object-contain"/>
      </figure>
      <div className="card-body">
        <h3 className="card-title text-zinc-300">Pickup Trucks</h3>
        <p className=" text-gray-400">Powerful and durable, our pickup trucks are ready for any heavy-duty task.</p>
      </div>
    </div>

    <div className="card bg-[#171A21] shadow-xl">
      <figure>
        <img src="/pngwing.com (50).png" alt="Electric Car" className="w-full h-48 object-contain"/>
      </figure>
      <div className="card-body">
        <h3 className="card-title text-zinc-300">Electric Cars</h3>
        <p className=" text-gray-400">Join the green revolution with our eco-friendly electric vehicles.</p>
      </div>
    </div>
  </div>
</div>

    );
};

export default OurFleet;