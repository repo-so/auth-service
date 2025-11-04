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
        <p className='absolute text-white text-5xl font-bold mt-10' style={{ fontFamily: 'Manrope, sans-serif' }}>NextClass</p>
      <div className="flex flex-col justify-center ">

      <div className='border-1 border-white p-5 rounded-xl flex gap-12'>
        <div className="flex flex-col m-3 items-center">
        <h1 className="text-white font-bold text-4xl" style={{ fontFamily: 'Manrope, sans-serif' }}>New Here?</h1>
        <button className=" rounded-lg bg-green-600 flex justify-center items-center mt-2 ml-2 cursor-pointer" onClick={handleToRegister}><p className="text-xl py-1.5 px-10 text-white font-semibold" style={{ fontFamily: 'Manrope, sans-serif' }}>Register</p></button>
        </div>

        <div className="flex flex-col m-3 items-center">
        <h1 className="text-white font-bold text-4xl" style={{ fontFamily: 'Manrope, sans-serif' }}>Already Registered?</h1>
        <button className=" rounded-lg bg-blue-600 flex justify-center items-center mt-2 ml-2 cursor-pointer" onClick={handleToLogin}><p className="py-1.5 px-10 text-xl text-white font-semibold" style={{ fontFamily: 'Manrope, sans-serif' }}>Login</p></button>
        </div>
      </div>

      </div>
      </div>
    </div>
  );
}
