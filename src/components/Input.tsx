import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  className?: string;
}

export default function Input({
  label,
  name,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="mb-3">
      <label
        htmlFor={name}
        className="font-work block mb-1 text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        {...props}
        className={`font-work w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eeeaff] ${className}`}
      />
    </div>
  );
}
