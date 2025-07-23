import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../AuthContext";

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <FaUserCircle className="text-3xl text-gray-600 hover:text-[#5A3EFF]" />
      </div>

      <div
        className={`absolute right-0 mt-2 w-48 bg-white shadow-sm border-b border-gray-200 rounded-md z-50 transform transition-all duration-200 ease-out origin-top-right ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        {isAuthenticated ? (
          <>
            <Link
              to="/profile"
              className="font-futura text-sm hover:bg-[#eeeaff] rounded-md block px-4 py-3 text-gray-800"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="font-futura w-full text-left text-sm hover:bg-[#eeeaff] rounded-md block px-4 py-3 text-gray-800 cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="font-futura text-sm hover:bg-[#eeeaff] rounded-md block px-4 py-3 text-gray-800"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="font-futura text-sm hover:bg-[#eeeaff] rounded-md block px-4 py-3 text-gray-800"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}