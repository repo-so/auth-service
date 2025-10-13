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
    <div className="p-6">
      <h1 className="text-xl font-bold">Profile</h1>
      <pre className="bg-green-300 p-4 rounded">
        {JSON.stringify(profile, null, 2)}
      </pre>
      <div>
      <h2>All lessons</h2>
      <div className="border-1 border-amber-400 p-4 rounded">
        {lessons.map(lesson => (
          <div key={lesson._id}
            className={` ${lesson.subscribed ? 'subscribed' : ''}`}
          >
            <h3>{lesson.title}</h3>
            <p>{lesson.description}</p>
            
            
            <button onClick={() => subscribeToLesson(lesson._id)} className={`p-3 rounded-lg cursor-pointer ${lesson.subscribed ? 'bg-green-500' : 'bg-blue-500'}`} >{lesson.subscribed ? 'Subscribed' : 'Subscribe'}</button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
