import { useState, useRef, useEffect } from "react";

const cities = [
  "Lagos",
  "Abuja",
  "Kano",
  "Ibadan",
  "Port Harcourt",
  "Benin City",
  "Maiduguri",
  "Zaria",
  "Aba",
  "Jos",
  "Ilorin",
  "Enugu",
  "Abeokuta",
  "Onitsha",
  "Warri",
  "Sokoto",
  "Osogbo",
  "Awka",
  "Yola",
  "Calabar",
  "Uyo",
  "Lokoja",
  "Makurdi",
  "Owerri",
  "Bauchi",
  "Katsina",
  "Akure",
  "Minna",
  "Gombe",
  "Abakaliki"
];


export default function CustomDropdown() {
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (city: string) => {
    setSelected(city);
    setOpen(false);
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
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex rounded-md mb-1.5 text-left focus:outline-none justify-between items-center cursor-pointer"
      >
        <span className="font-futura text-[#5A3EFF] whitespace-nowrap">{selected || "Your City"}</span>
        <svg
          className={`w-4 h-4 ml-2 transform transition-transform duration-200 text-[#5A3EFF] ${
            open ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul className="absolute z-10 w-full min-w-[160px] mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto text-left">
          {cities.map((city, index) => (
            <li
              key={index}
              onClick={() => handleSelect(city)}
              className={`text-[16px] px-4 py-2 cursor-pointer hover:bg-[#eeeaff] ${
                selected === city ? "bg-[#eeeaff] font-medium" : ""
              }`}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
