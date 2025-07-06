// src/components/root/Root.tsx
import { Outlet } from "react-router-dom";
import Navbar from "../layout/navbar/Navbar";
import Footer from "../layout/footer/Footer";
import ScrollToTop from "../dashboard/ScrollToTop";

const Root = () => {
  return (
    <div className="bg-gray-100 px-4 sm:px-6 lg:px-8">
      <ScrollToTop /> 
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Root;
