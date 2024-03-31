import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import customFetch from "../utils/fetchApi";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://blog-deploy-afnh.onrender.com/api/auth/register",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );
      console.log(res.data);
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className=" mt-32 max-w-[30rem] mx-auto flex flex-col gap-12">
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="font-bold">
            User Name:
          </label>
          <input
            type="text"
            id="username"
            className="bg-gray-300 py-3 px-6 rounded-lg"
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="font-bold">
            E-mail:
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-300 py-3 px-6 rounded-lg"
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="font-bold">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-300 py-3 px-6 rounded-lg"
            onChange={handleChange}
            required
          />
        </div>
        <p className="text-red-600 text-xs">{error}</p>

        <button
          type="submit"
          className="bg-red-500 py-3 rounded-lg text-white text-xl"
          onClick={handleSubmit}
        >
          Register
        </button>
        <p>
          Already have an account ?{" "}
          <Link className="underline text-blue-700" to={"/login"}>
            Login
          </Link>
        </p>
      </form>
      <div className="w-full bg-black h-[0.1rem]"></div>

      <button className="bg-red-600 py-3 rounded-lg text-white text-xl">
        Google
      </button>
    </div>
  );
};

export default Register;
