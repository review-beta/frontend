import { NavLink } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import Logo from "../assets/reviewbeta-logo.svg";
import { navLinks } from "../config/nav";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60" onClick={onClose}>
      <aside
        className="w-72 bg-white h-full p-4"
        onClick={e => e.stopPropagation()}
      >
        <img src={Logo} alt="Logo" className="w-[120px] mb-6" />

        <nav className="flex flex-col gap-3">
          {navLinks.map(link => (
            <NavLink
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={({ isActive }) =>
                `font-futura block w-full px-6 lg:px-3 py-2 rounded-[50px] cursor-pointer text-[14px] text-gray-700 hover:bg-[#eeeaff] no-underline ${
                    isActive ? "bg-[#EFF6FF] text-[#3B82F6]" : ""
                }`
                }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button className="w-full flex gap-2 items-center my-6 justify-center hover:text-red-500" onClick={onClose} >
            <IoMdCloseCircle />
            <button className="font-work font-medium text-gray-500 uppercase">
                Close
            </button>
        </button>
      </aside>
    </div>
  );
}