import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

interface Props {
  links: { label: string; path: string }[];
}

export default function MoreMenu({ links }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="font-futura px-3 py-2 rounded-full text-gray-700 hover:bg-[#eeeaff]"
      >
        More
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-white border rounded-xl shadow-lg min-w-[160px]">
          {links.map(link => (
            <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                `font-futura block w-full px-6 lg:px-3 py-2 rounded-[50px] cursor-pointer hover:bg-[#eeeaff] no-underline ${
                    isActive ? "bg-[#EFF6FF] text-[#3B82F6]" : ""
                }`
                }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}