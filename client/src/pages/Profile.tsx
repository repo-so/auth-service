import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/profile");
      setProfile(res.data);
    } catch (error) {
      setProfile(null);
    }
  };

  fetchProfile();
}, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Profile</h1>
      <pre className="bg-green-300 p-4 rounded">
        {JSON.stringify(profile, null, 2)}
      </pre>
    </div>
  );
}
