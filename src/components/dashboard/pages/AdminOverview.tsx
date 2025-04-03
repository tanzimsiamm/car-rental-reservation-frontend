
type TStatistics = {
    totalBookings : number,
    availableCars  : number,
    totalRevenue : number;
}

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetStatisticsQuery } from "../../../redux/features/booking/bookingApi";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminOverview = () => {
    const { data: statisticsData} = useGetStatisticsQuery(undefined);

    const statistics : TStatistics = statisticsData?.data || []

    const data = {
        labels: ["Total Bookings", "Available Cars", "Total Revenue"],
        datasets: [
          {
            label: "Statistics",
            data: [
              statistics.totalBookings,
              statistics.availableCars,
              statistics.totalRevenue,
            ],
            backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
            borderColor: ["#3b82f6", "#10b981", "#f59e0b"],
            borderWidth: 1,
          },
        ],
      };

      // Chart options including custom table border color
  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          color: "#565d6e", // Set your desired x-axis grid color
          borderColor: "#D1D5DB", // Set your desired x-axis border color
        },
        ticks: {
          color: "#D1D5DB", // Set x-axis labels color
        },
      },
      y: {
        grid: {
          color: "#565d6e", // Set your desired y-axis grid color
          borderColor: "#D1D5DB", // Set your desired y-axis border color
        },
        ticks: {
          color: "#D1D5DB", // Set y-axis labels color
        },
      },
    },
  };



  return (
    <div className="container mx-auto p-4 sm:p-8">
    <h2 className="text-3xl lg:text-4xl carter-one-regular text-center mb-8 text-gray-300 ">Statistics</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="card shadow-lg p-6 bg-[#171A21] text-center">
        <img src={'/PngItem_273860.png'} alt="Car" className="mx-auto mb-4 w-16 h-16 md:w-24 md:h-24 object-contain" />
        <div className="text-4xl md:text-6xl font-bold text-red-600 mb-2 md:mb-4">
          {statistics.totalBookings}
        </div>
        <div className="text-lg md:text-xl text-gray-400 font-semibold">Total Bookings</div>
      </div>
      <div className="card shadow-lg p-6 bg-[#171A21] text-center">
        <img
          src="/pngegg (18).png" // Example available cars icon
          alt="Available Cars"
          className="mx-auto mb-4 w-28 h-20 md:w-36 md:h-28 object-contain"
        />
        <div className="text-4xl md:text-6xl font-bold text-lime-500 mb-2 md:mb-4">
          {statistics.availableCars}
        </div>
        <div className="text-lg md:text-xl text-gray-400 font-semibold">Available Cars</div>
      </div>
      <div className="card shadow-lg p-6 bg-[#171A21] text-center">
        <img
          src="/profit.png" // Example revenue icon
          alt="Revenue"
          className="mx-auto mb-4 w-16 h-16 md:w-24 md:h-24"
        />
        <div className="text-4xl text-amber-500 md:text-6xl font-bold  mb-2 md:mb-4">
          ${statistics.totalRevenue?.toFixed(1)}
        </div>
        <div className="text-lg md:text-xl text-gray-400 font-semibold">Total Revenue</div>
      </div>
    </div>
    <div className="mt-8">
    <h2 className="text-3xl lg:text-4xl carter-one-regular text-center my-10 text-gray-300 ">Statistic Graph</h2>
      <div className="card shadow-lg p-4 md:p-6 bg-[#171A21] rounded-xl">
        <Bar data={data} options={options} />
      </div>
    </div>
  </div>
  );
};

export default AdminOverview;
