import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';



const backendUrl = import.meta.env.VITE_BACKEND_URL

const Login = ({settoken}) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  
  

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/user/admin`, {
        email,
        password,
      });

      if (response.data.success) {
         console.log(response.data.token)
           settoken(response.data.token);
           toast.success("Login successful!");
      } else {
         toast.error("Login failed!");
      }

    } catch (error) {
      console.error("Error during login:", error.response?.data || error.message);
      alert("Server error. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex mt-[200px] justify-center bg-white">
      <form onSubmit={onSubmitHandler} className="w-80 space-y-4">
        <h2 className="text-center text-3xl font-serif font-medium mb-6 border-b border-black inline-block pb-1">
          LOGIN —
        </h2>

        <input
          onChange={(e) => setemail(e.target.value)}
          type="email"
          placeholder="Email"
          className="w-full border border-gray-400 px-4 py-2 outline-none"
          required
        />
        <input
          onChange={(e) => setpassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-full border border-gray-400 px-4 py-2 outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 hover:bg-gray-800 cursor-pointer transition duration-200"
        >
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default Login;
