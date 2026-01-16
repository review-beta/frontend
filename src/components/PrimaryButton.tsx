import React from "react";
import { useNavigate } from "react-router-dom"; // if using React Router

interface PrimaryButtonProps {
  text: string;
  link: string; // can be internal route or external URL
  external?: boolean; // optional, true if link is external
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ text, link, external = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (external) {
      window.open(link, "_blank"); // open in new tab
    } else {
      navigate(link); // internal navigation
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-[#3B82F6] font-work text-sm md:text-md text-white px-4 py-2 rounded-[6px] font-medium hover:bg-blue-600 transition cursor-pointer"
    >
      {text}
    </button>
  );
};

export default PrimaryButton;