import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../../assets/logo.svg"; 

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF9E3] pt-4">
      <header className="p-4">
        <div className="flex items-center justify-between md:justify-start relative">
          {/* Logo */}
          <div className="flex items-center gap-2 mr-4">
            <img src={logo} alt="Solara logo" className="w-8 h-8" />
            <span className="text-xl font-semibold text-[#f97316]">SOLARA</span>
          </div>

          {/* Center Nav (Desktop only) */}
          <nav className="hidden md:flex items-center justify-center flex-1 gap-10">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-medium hover:text-orange-600 ${
                  isActive ? "text-orange-600" : "text-black"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/HeatAlert"
              className={({ isActive }) =>
                `font-medium hover:text-orange-600 ${
                  isActive ? "text-orange-600" : "text-black"
                }`
              }
            >
              Heat Alert
            </NavLink>

            <NavLink
              to="/Tips"
              className={({ isActive }) =>
                `font-medium hover:text-orange-600 ${
                  isActive ? "text-orange-600" : "text-black"
                }`
              }
            >
              Tailored Tips
            </NavLink>
          </nav>

          {/* Track Water Button (Desktop only) */}
          <div className="hidden md:block ml-auto">
            <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-full">
              Track water consumption
            </button>
          </div>

          {/* Hamburger Icon (Mobile only) */}
          <button className="md:hidden ml-auto" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <nav className="flex flex-col gap-4 mt-4 md:hidden">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-medium hover:text-orange-600 ${
                  isActive ? "text-orange-600" : "text-black"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/HeatAlert"
              className={({ isActive }) =>
                `font-medium hover:text-orange-600 ${
                  isActive ? "text-orange-600" : "text-black"
                }`
              }
            >
              Heat Alert
            </NavLink>

            <NavLink
              to="/Tips"
              className={({ isActive }) =>
                `font-medium hover:text-orange-600 ${
                  isActive ? "text-orange-600" : "text-black"
                }`
              }
            >
              Tailored Tips
            </NavLink>
            <div className="flex justify-end">
                <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-full">
                    Track water consumption
                </button>
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
