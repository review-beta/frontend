import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import Input from "../components/Input";
import Logo from "../assets/reviewbeta-logo.svg";
import { NavLink } from 'react-router-dom';
import { useAuth } from "../AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post("login/", formData);
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      login(); // notify context
      navigate("/");
    } catch (err) {
      setError("Invalid username/email or password");
    }
  };

  return (
    <div className="fixed inset-0 w-full flex justify-center items-center text-black bg-gradient-to-b from-[#eeeaff] to-[#ffffff]">
      <div className="flex flex-col w-full max-w-[450px] justify-center items-center gap-4 mx-4">
        <NavLink to='/'>
          <img src={Logo} alt="Reviewbeta Logo" className="w-[160px]" />
        </NavLink>
        <div className="w-full space-y-8 mx-4 m-auto p-6 border rounded-sm shadow-sm bg-white border-gray-200">
          <h2 className="font-work w-full text-center text-sm tracking-[2px] font-medium mb-6">
            LOG IN TO YOUR ACCOUNT
          </h2>
          <form onSubmit={handleSubmit}>
            <Input
              label="Username or Email"
              name="identifier"
              type="text"
              value={formData.identifier}
              onChange={handleChange}
              required 
              className="lowercase"
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <button
              type="submit"
              className="font-work font-semibold w-full mt-1 bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 cursor-pointer"
            >
              Log in
            </button>
          </form>
          <NavLink to='/request-password-reset' className="flex justify-center text-sm items-center font-work text-[#5A3EFF] font-semibold">
            Forgot your password?
          </NavLink>
        </div>
          <NavLink to='/register' className="flex mt-8 justify-center text-sm items-center font-work text-[#5A3EFF] font-semibold">
            New to ReviewBeta? Sign up
          </NavLink>
      </div>
    </div>
  );
}
