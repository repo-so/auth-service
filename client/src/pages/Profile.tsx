import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);

  
  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/profile");
      setProfile(res.data);
    } catch (error) {
      setProfile(null);
    }
  };
  const fetchLessons = async () => {
    try {
      const res = await api.get("/auth/profile/lessons");
      setLessons(res.data);
    } catch (error) {
      setLessons([]);
    }
  };

  useEffect(() => {
  fetchProfile();
  fetchLessons();
}, []);

const subscribeToLesson = async (lessonId: string) => {
  try {
    await api.post(
      `auth/profile/lessons/${lessonId}/subscribe`,
      {},
      { withCredentials: true } //ensure cookies are sent
    );
    
    fetchLessons(); 
  } catch (error) {
    alert('Subscription failed.');
  }
};

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="p-6 flex justify-center flex-col items-center gap-6">
      <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>Your Profile</h1>
      <div className="bg-green-300 p-4 rounded max-w-xl">
        <p>Hi, {profile.email}!</p>
      </div>
      <div>
      <h2 className="text-white font-semibold" style={{ fontFamily: 'Manrope, sans-serif' }}>All lessons</h2>
      <div className="border-2 border-white p-4 pl-5.5 rounded-xl flex flex-wrap gap-4 max-w-[77rem]">
        {lessons.map(lesson => (
          <div key={lesson._id}
            className={`border-white border-2 rounded-lg p-4 mb-4 w-auto max-w-sm`}
          >
            <h3 className="text-white text-lg">{lesson.title}</h3>
            <p className="text-white/75 text-sm text-wrap">{lesson.description}</p>
            
            
            <button onClick={() => subscribeToLesson(lesson._id)} className={`py-1.5 px-4 rounded-lg cursor-pointer text-white font-semibold mt-1.5 ${lesson.subscribed ? 'bg-green-500' : 'bg-blue-500'}`} style={{ fontFamily: 'Manrope, sans-serif' }}>{lesson.subscribed ? 'Subscribed' : 'Subscribe'}</button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
