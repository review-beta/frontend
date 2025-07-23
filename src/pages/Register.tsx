import React, { useState } from "react";
import Input from "../components/Input"; 
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import Logo from "../assets/reviewbeta-logo.svg";
import { NavLink } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    gender: '',
    location: '',
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    const { username, email, password, confirm_password } = formData;
    if (!username || !email || !password || !confirm_password) {
      setError("Please fill all fields before proceeding.");
      return;
    }
    if (password !== confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    setError(""); // Clear error
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await API.post('register/', formData);
      setSuccess('Registration successful! You can now login.');
      navigate("/login");
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(JSON.stringify(err.response.data));
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

return (
    <div className="fixed inset-0 w-full flex justify-center items-center text-black bg-gradient-to-b from-[#eeeaff] to-[#ffffff]">
      <div className="flex flex-col w-full max-w-[450px] justify-center items-center gap-4 mx-4">
        <NavLink to='/'>
          <img src={Logo} alt="Reviewbeta Logo" className="w-[160px]" />
        </NavLink>
        <div className="w-full space-y-6 mx-4 m-auto p-6 border rounded-sm shadow-sm bg-white border-gray-200">
          <h2 className="font-work w-full text-center text-sm tracking-[2px] font-medium mb-6">
              CREATE YOUR ACCOUNT
          </h2>
          <form
            onSubmit={step === 2 ? handleSubmit : (e) => e.preventDefault()}
          >

            {step === 1 && (
              <>
                <Input label="Username" type="text" name="username" value={formData.username} onChange={handleChange} required className="lowercase" />
                <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required/>
                <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required/>
                <Input label="Confirm Password" type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} required />

                <button
                  type="button"
                  onClick={handleNext}
                  className="font-work font-semibold w-full mt-1 bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 cursor-pointer"
                >
                  Continue
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="flex justify-between gap-2">
                <Input label="First Name" type="text" name="first_name" value={formData.first_name} onChange={handleChange} required className="capitalize" />
                <Input label="Last Name" type="text" name="last_name" value={formData.last_name} onChange={handleChange} required className="capitalize" />
                </div>
                <Input label="Phone Number" type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} required/>

                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">Location</label>
                  <select name="location" value={formData.location} onChange={handleChange} required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  >
                    <option value="">Select Location</option>
                    <option value="nigeria">Nigeria</option>
                    <option value="ghana">Ghana</option>
                  </select>
                </div>

                <div className="flex justify-between gap-2">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="font-work font-semibold w-1/2 mt-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-md hover:bg-gray-300 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="font-work font-semibold w-1/2 mt-1 bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 cursor-pointer"
                  >
                    Register
                  </button>
                </div>
              </>
            )}

            {error && <p className="font-work text-sm text-red-500 mt-2">{error}</p>}
            {success && <p className="font-work text-sm text-green-500 mt-2">{success}</p>}
          </form>
        </div>
        <NavLink to='/login' className="flex mt-4 justify-center text-sm items-center font-work text-[#5A3EFF] font-semibold">
          Already have an account? Login
        </NavLink>
      </div>
    </div>
  );
}
