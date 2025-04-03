// import { useState } from "react";
// import { FiSearch } from "react-icons/fi";

// const SearchBar = () => {
//   const [location, setLocation] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle search logic based on location, startDate, and endDate
//     console.log({ location, startDate, endDate });
//   };

//   return (
//     <form
//       onSubmit={handleSearch}
//       className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-8 w-full max-w-3xl bg-white bg-opacity-20 p-4 rounded-lg"
//     >
    

//      {/* Location Input */}
//       <div className="w-full">
//         <label className="text-white block mb-2">Enter Location</label>
//         <input
//           type="text"
//           placeholder="pick up location"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           className="w-full px-4 py-2 rounded-md text-black focus:outline-none"
//         />
//       </div>
//       {/* Pick-up Date */}
//       <div className="w-full">
//         <label className="text-white block mb-2">Pick-up Date</label>
//         <input
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           className="w-full px-4 py-2 rounded-md text-black focus:outline-none"
//         />
//       </div>

//       {/* Drop-off Date */}
//       <div className="w-full">
//         <label className="text-white block mb-2">Drop-off Date</label>
//         <input
//           type="date"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//           className="w-full px-4 py-2 rounded-md text-black focus:outline-none"
//         />
//       </div>

//       {/* Search Button */}
//       <button
//         type="submit"
//         className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center space-x-2 transition"
//       >
//         <FiSearch className="w-5 h-5" />
//         <span>Search</span>
//       </button>
//     </form>
//   );
// };

// export default SearchBar;
