import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

     if (!email || !password) {
    alert("Please fill out both email and password fields");
    return;
  }
    try {
      // Backend will hash password + store user
      await api.post("/auth/register", { email, password });

      // After successful register, send user to login page
      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
    <form onSubmit={handleSubmit} className="p-6 max-w-sm mx-auto space-y-4 border-1 border-gray-300 rounded-xl bg-[#2a2a2a]">
      <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Register</h1>

      <input 
        type="email"
        placeholder="Email"
        className="outline-1 outline-white p-2 w-full rounded-sm text-white"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="outline-1 outline-white p-2 w-full rounded-sm text-white"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 cursor-pointer font-semibold" style={{ fontFamily: 'Manrope, sans-serif' }} type="submit">
        Register
      </button>
    </form>
    </div>
  );
}
