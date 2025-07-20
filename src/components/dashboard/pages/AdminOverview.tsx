import { useEffect, useState } from "react";
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
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const { data: statisticsData, isLoading } = useGetStatisticsQuery(undefined);
  const statistics: TStatistics = statisticsData?.data || {
    totalBookings: 0,
    availableCars: 0,
    totalRevenue: 0,
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#6B7280",
          font: { 
            family: "'Poppins', sans-serif",
            size: windowSize.width < 768 ? 10 : 12
          },
        },
      },
      tooltip: {
        titleFont: { 
          family: "'Poppins', sans-serif",
          size: windowSize.width < 768 ? 10 : 12
        },
        bodyFont: { 
          family: "'Poppins', sans-serif",
          size: windowSize.width < 768 ? 10 : 12
        },
      },
    },
    scales: {
      x: {
        grid: { color: "#E5E7EB" },
        ticks: { 
          color: "#6B7280", 
          font: { 
            family: "'Poppins', sans-serif",
            size: windowSize.width < 768 ? 10 : 12
          } 
        },
      },
      y: {
        grid: { color: "#E5E7EB" },
        ticks: { 
          color: "#6B7280", 
          font: { 
            family: "'Poppins', sans-serif",
            size: windowSize.width < 768 ? 10 : 12
          } 
        },
      },
    },
  };

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-12 w-full overflow-x-hidden">
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
          {/* Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Reusable Card */}
            {[
              {
                label: "Total Bookings",
                value: statistics.totalBookings,
                color: "text-red-600",
                icon: "https://cdn-icons-png.flaticon.com/512/3449/3449787.png",
              },
              {
                label: "Available Cars",
                value: statistics.availableCars,
                color: "text-green-500",
                icon: "https://cdn-icons-png.flaticon.com/512/7436/7436484.png",
              },
              {
                label: "Total Revenue",
                value: `$${statistics.totalRevenue.toFixed(2)}`,
                color: "text-yellow-500",
                icon: "https://cdn-icons-png.flaticon.com/512/3135/3135706.png",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-lg p-4 sm:p-6 text-center transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={card.icon}
                  alt={card.label}
                  className="mx-auto mb-4 w-14 h-14 sm:w-16 sm:h-16 object-contain"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://via.placeholder.com/64";
                  }}
                />
                <div
                  className={`text-3xl sm:text-4xl md:text-5xl font-bold ${card.color} mb-2`}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {card.value}
                </div>
                <div
                  className="text-sm sm:text-base text-gray-600 font-semibold"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {card.label}
                </div>
              </div>
            ))}
          </div>

          {/* Chart Section */}
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

            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 overflow-x-auto">
              <div className="min-w-[300px] w-full h-[300px] sm:h-[400px]">
                <Bar 
                  key={`${windowSize.width}-${windowSize.height}`}
                  data={data} 
                  options={options} 
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminOverview;