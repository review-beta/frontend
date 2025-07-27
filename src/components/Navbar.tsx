import { NavLink } from 'react-router-dom';

const navItems = [
  { label: "For you", path: "/" },
  { label: "Deals", path: "/deals" },
  { label: "Movies", path: "/movies" },
  { label: "Dining", path: "/dining" },
  { label: "Events", path: "/events" },
  { label: "Hangouts", path: "/hangouts" },
];

export default function Navbar() {
  return (
    <ul className="flex flex-col md:flex-row text-sm font-medium text-gray-700 list-none gap-4 pl-0">
      {navItems.map((item) => (
        <li key={item.path}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `font-futura block w-full px-6 lg:px-3 py-2 rounded-[50px] cursor-pointer hover:bg-[#eeeaff] no-underline ${
                isActive ? "bg-[#eeeaff] text-[#5A3EFF]" : ""
              }`
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
