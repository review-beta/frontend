import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CgMenuLeft } from "react-icons/cg";

import Logo from "../assets/reviewbeta-logo.svg";
import { navLinks } from "../config/nav";
import { useHideOnScroll } from "../hooks/useHideOnScroll";
import MobileDrawer from "./MobileDrawer";
import MoreMenu from "./MoreMenu";

export default function Header() {
  const navigate = useNavigate();
  const isHidden = useHideOnScroll();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const primaryLinks = navLinks.slice(0, 5);
  const moreLinks = navLinks.slice(5);

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-white border-b transition-transform duration-300 ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        {/* TOP ROW */}
        <div className="max-w-[1280px] mx-auto px-4 py-3 flex items-center justify-between">
          {/* Mobile Left */}
          <div className="flex items-center gap-3 md:hidden">
            <button onClick={() => setIsDrawerOpen(true)}>
              <CgMenuLeft className="text-2xl" />
            </button>
            <img src={Logo} alt="Logo" className="w-[110px]" />
          </div>

          {/* Desktop Left */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <img src={Logo} alt="Logo" className="w-[120px]" />

            <div className="w-px h-6 bg-[#E4E4E4] sm:block" />

            <nav className="flex items-center gap-2 text-sm">
              {primaryLinks.map(link => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `font-futura block whitespace-nowrap px-3 py-2 rounded-full cursor-pointer hover:bg-[#eeeaff] ${
                      isActive ? "bg-[#EFF6FF] text-[#3B82F6]" : "text-gray-700"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {moreLinks.length > 0 && <MoreMenu links={moreLinks} />}
            </nav>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search for deals, movies, events, restaurants"
              className="hidden lg:block font-work min-w-[240px] px-4 py-3 text-sm border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#eeeaff]"
            />

            <button
              onClick={() => navigate("/add-review")}
              className="bg-[#3B82F6] font-work text-sm md:text-md text-white px-4 py-2 rounded-[6px] font-medium hover:bg-blue-600 transition cursor-pointer"
            >
              Add Review
            </button>
          </div>
        </div>

        {/* MOBILE SEARCH */}
        <div className="lg:hidden px-4 pb-3">
          <input
            type="text"
            placeholder="Search for deals, movies, events, restaurants"
            className="w-full font-work px-4 py-3 text-sm border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#eeeaff]"
          />
          
        </div>
      </header>

      {/* DRAWER OUTSIDE HEADER */}
      <MobileDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}

