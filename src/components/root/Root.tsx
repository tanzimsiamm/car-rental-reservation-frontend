import { Outlet } from "react-router-dom";
import { createContext, useState } from "react";
import Navbar from "../layout/navbar/Navbar";
import Footer from "../layout/footer/Footer";


export const ThemeContext = createContext(true)

const Root = () => {
    const [ isDark , setDark ] = useState(true);

    return (
        <ThemeContext.Provider value={isDark}> 
            <div className={`${isDark? 'bg-[#212433]' : 'bg-white'}`}>
            
            <Navbar isDark={isDark} setDark={setDark} />
                    <div className={`${isDark? 'bg-[#212433]' : 'bg-white'}`}>
                    <Outlet/>
                    </div>
            <Footer/>
            </div>
        </ThemeContext.Provider>
    );
};

export default Root;