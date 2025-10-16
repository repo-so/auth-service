import { useNavigate } from 'react-router-dom';

export default function Home() {

    const navigate = useNavigate();

  const handleToRegister = () => {
    navigate('/register'); 
  };
  const handleToLogin = () => {
    navigate('/login'); 
  };
  
  return (
    
    <div className="relative w-full h-screen flex justify-center items-center">
      <div className="bg-[#2e2e2e]  w-[95%] h-[90%] flex justify-center  border-1 border-white/30 rounded-xl">
        <p className='absolute text-white text-xs' style={{ fontFamily: 'Manrope, sans-serif' }}>NextClass</p>
      <div className="flex flex-col justify-center ">

        <div className="flex flex-row m-3 items-center">
        <h1 className="text-white font-bold text-5xl" style={{ fontFamily: 'Manrope, sans-serif' }}>Register</h1>
        <button className="size-12 rounded-full bg-white/90 flex justify-center items-center mt-2 ml-2 cursor-pointer" onClick={handleToRegister}><p className="-rotate-45 text-xl">➔</p></button>
        </div>

        <div className="flex flex-row m-3">
        <h1 className="text-white font-bold text-5xl" style={{ fontFamily: 'Manrope, sans-serif' }}>Login</h1>
        <button className="size-12 rounded-full bg-white/90 flex justify-center items-center mt-2 ml-2 cursor-pointer" onClick={handleToLogin}><p className="-rotate-45 text-xl">➔ </p></button>
        </div>

      </div>
      </div>
    </div>
  );
}
