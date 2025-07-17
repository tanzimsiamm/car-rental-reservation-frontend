/* eslint-disable @typescript-eslint/no-explicit-any */
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

type TStatistics = {
  totalBookings: number;
  availableCars: number;
  totalRevenue: number;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminOverview = () => {
  const { data: statisticsData, isLoading } = useGetStatisticsQuery(undefined);
  const statistics: TStatistics = statisticsData?.data || {
    totalBookings: 0,
    availableCars: 0,
    totalRevenue: 0,
  };

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
        backgroundColor: ["#F59E0B", "#10B981", "#D97706"],
        borderColor: ["#F59E0B", "#10B981", "#D97706"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#6B7280",
          font: { family: "'Poppins', sans-serif" },
        },
      },
      tooltip: {
        titleFont: { family: "'Poppins', sans-serif" },
        bodyFont: { family: "'Poppins', sans-serif" },
      },
    },
    scales: {
      x: {
        grid: { color: "#E5E7EB" },
        ticks: { color: "#6B7280", font: { family: "'Poppins', sans-serif" } },
      },
      y: {
        grid: { color: "#E5E7EB" },
        ticks: { color: "#6B7280", font: { family: "'Poppins', sans-serif" } },
      },
    },
  };

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-12">
      <h2
        className="text-3xl md:text-4xl font-bold text-center mb-12"
        style={{
          fontFamily: "'Poppins', sans-serif",
          background: "linear-gradient(90deg, #F59E0B, #D97706)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Admin Statistics
      </h2>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bookings Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center transition-transform duration-300 hover:scale-105">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3449/3449787.png"
                alt="Total Bookings Icon"
                className="mx-auto mb-4 w-16 h-16 object-contain"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://via.placeholder.com/64";
                }}
              />
              <div
                className="text-4xl md:text-5xl font-bold text-red-600 mb-2"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {statistics.totalBookings}
              </div>
              <div
                className="text-lg text-gray-600 font-semibold"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Total Bookings
              </div>
            </div>

            {/* Available Cars Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center transition-transform duration-300 hover:scale-105">
              <img
                src="https://cdn-icons-png.flaticon.com/512/7436/7436484.png"
                alt="Available Cars Icon"
                className="mx-auto mb-4 w-20 h-16 object-contain"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://via.placeholder.com/64";
                }}
              />
              <div
                className="text-4xl md:text-5xl font-bold text-green-500 mb-2"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {statistics.availableCars}
              </div>
              <div
                className="text-lg text-gray-600 font-semibold"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Available Cars
              </div>
            </div>

            {/* Total Revenue Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center transition-transform duration-300 hover:scale-105">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135706.png"
                alt="Total Revenue Icon"
                className="mx-auto mb-4 w-16 h-16 object-contain"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://via.placeholder.com/64";
                }}
              />
              <div
                className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                ${statistics.totalRevenue.toFixed(2)}
              </div>
              <div
                className="text-lg text-gray-600 font-semibold"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Total Revenue
              </div>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="mt-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-center mb-8"
              style={{
                fontFamily: "'Poppins', sans-serif",
                background: "linear-gradient(90deg, #F59E0B, #D97706)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Statistics Overview
            </h2>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <Bar data={data} options={options} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminOverview;
