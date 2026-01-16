import React from "react";
import Logo from "../assets/reviewbeta-logo.svg";
import { FaLocationDot } from "react-icons/fa6";
import Navbar from "./Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

import { useState } from "react";
import UserDropdown from "./UserDropdown";
import { CgMenuRight } from "react-icons/cg";
import { IoMdCloseCircle } from "react-icons/io";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block font-futura w-full px-6 py-2 lg:px-3 rounded-[50px] cursor-pointer text-gray-700 w-full hover:bg-[#eeeaff] no-underline ${
    isActive ? "bg-[#eeeaff] text-[#5A3EFF]" : ""
  }`;

const Header: React.FC = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200 px-3 py-2">
      <nav className="navbar max-w-[100%] mx-auto px-4 sm:px-6 lg:px-8 h-auto py-2 flex flex-wrap items-center justify-center md:justify-between">
        {/* Left side: Logo + Location */}
        <div className="flex items-center space-x-4">
          <NavLink to='/'>
            <img src={Logo} alt="Reviewbeta Logo" className="w-[120px]" />
          </NavLink>

          <div className="w-px h-6 bg-[#E4E4E4] sm:block" />

          {/* <div className="gap-1 pr-4 py-2 items-center sm:flex flex">
            <FaLocationDot className="text-2xl text-gray-600 cursor-pointer hover:text-red-500 h-5" />
            <span className="text-gray-700 font-medium">Nigeria</span>
          </div> */}

          {/* Right side: Hamburger icon for mobile */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsSideNavOpen(true)}
              className="text-2xl text-gray-700"
            >
              <CgMenuRight />
            </button>
          </div>

          {/* Desktop-only section: navbar + search + login */}
          <div className="nav-links hidden md:flex items-center gap-4">
            <Navbar />
          </div>
        </div>

        <div className="right-nav hidden md:flex items-center gap-4">
          <input
            type="text"
            placeholder="Search for deals, movies, events, restaurants"
            className="font-work w-[320px] px-3 py-3 text-sm border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#eeeaff]"
          />

          <UserDropdown />
        </div>
      </nav>

      {/* Side Nav Overlay */}
      {isSideNavOpen && (
        <div className={`fixed inset-0 z-50 bg-black/60 shadow-md transform transition-transform duration-300 ${
          isSideNavOpen ? "translate-x-0" : "-translate-x-full"}`} onClick={() => setIsSideNavOpen(false)}>
          <div
            className="w-72 bg-white h-full shadow-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-2 items-center my-2 justify-start" onClick={() => setIsSideNavOpen(false)}>
              <img src={Logo} alt="District Logo" className="w-[120px]" />
            </div>

            <input
              type="text"
              placeholder="Search for deals, movies, events, restaurants"
              className="font-work w-full my-4 px-3 py-3 text-sm border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#eeeaff]"
            />

            <Navbar />

            <ul className="space-y-4 mt-4 text-sm">
              {isAuthenticated ? (
                <>
                  <li>
                    <NavLink to="/profile" className={navLinkClass}>
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <button onClick={handleLogout}
                      className="font-futura px-6 lg:px-2 py-2 rounded-[50px] cursor-pointer hover:bg-[#eeeaff] text-left text-gray-700 w-full"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/login" className={navLinkClass}>
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/register" className={navLinkClass}>
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

            <div className="flex gap-2 items-center my-6 justify-center hover:text-red-500" onClick={() => setIsSideNavOpen(false)}>
              <IoMdCloseCircle className="text-gray-500 text-2xl" />
              <button className="font-work font-medium text-gray-500 uppercase"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;