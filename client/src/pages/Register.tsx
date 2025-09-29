import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <form onSubmit={handleSubmit} className="p-6 max-w-sm mx-auto space-y-4">
      <h1 className="text-xl font-bold">Register</h1>

      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button className="bg-green-500 text-white px-4 py-2 rounded">
        Register
      </button>
    </form>
  );
}
