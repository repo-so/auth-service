import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { setAccessToken } from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

     if (!email || !password) {
    alert("Please fill out both email and password fields.");
    return; 
  }
    try {
      // Backend sends accessToken in JSON, refreshToken in HttpOnly cookie
      const { data } = await api.post("/auth/login", { email, password }, { withCredentials: true });
      // Save accessToken in memory (axios.ts)
      setAccessToken(data.accessToken);

      navigate("/profile");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
    <form onSubmit={handleSubmit} className="p-6 max-w-sm mx-auto space-y-4 border-1 border-gray-300 rounded-xl bg-[#2a2a2a]">
      <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Login</h1>

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

      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer font-semibold" style={{ fontFamily: 'Manrope, sans-serif' }} type="submit">
        Login
      </button>
    </form>
    </div>
  );
}
