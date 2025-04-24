const OurFleet = () => {
  const vehicles = [
    {
      title: "Compact Cars",
      description: "Nimble and efficient, ideal for urban exploration and easy parking.",
      image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "SUVs",
      description: "Roomy and versatile, perfect for family adventures and rugged terrains.",
      image: "https://images.unsplash.com/photo-1580273916550-ebd7c9907b7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Luxury Cars",
      description: "Unmatched elegance and comfort for a premium driving experience.",
      image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Convertibles",
      description: "Embrace the open road with our stylish and exhilarating convertibles.",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Pickup Trucks",
      description: "Robust and reliable, built for tough jobs and heavy-duty tasks.",
      image: "https://images.unsplash.com/photo-1586861915637-518d6e6e9f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Electric Cars",
      description: "Sustainable and innovative, drive the future with our electric vehicles.",
      image: "https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="bg-gray-100 py-12 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
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
            Discover Our Fleet
          </h2>
          <p
            className="mt-4 text-gray-500 text-base md:text-lg max-w-2xl mx-auto"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Browse our diverse collection of vehicles, crafted to enhance every journey, from daily commutes to epic road trips.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => (
            <div
              key={index}
              className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <figure className="relative">
                <img
                  src={vehicle.image}
                  alt={vehicle.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/800x600?text=Image+Not+Found";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </figure>
              <div className="p-6">
                <h3
                  className="text-xl font-semibold text-zinc-800 mb-2"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {vehicle.title}
                </h3>
                <p
                  className="text-gray-500 text-sm"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {vehicle.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurFleet;