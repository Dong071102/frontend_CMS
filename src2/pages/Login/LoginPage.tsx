import { useState } from 'react';
import Input from '../../components/Form/Input';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

import { AiOutlineUser, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import authService from '../../services/authServices';
import axios from 'axios';
const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleLogin = async () => {
    try {
      const userData = await authService.login(username, password);
      console.log("user data,", userData);
      alert("Login successful!");

    } catch (err) {
      console.log(err)
    }
  }
  const handleGoogleLogin = async () => {
    try {
      const { token, email, name } = await authService.loginWithGoogle();
      const apiURL = import.meta.env.VITE_API_BASE_URL;
      console.log("API URL:", apiURL);
      const response = await axios.post(`${apiURL}/auth/google-login`, { token, email, name });
      console.log("User data from backend:", response.data);
      navigate('/home');
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  return (
    <div className="font-[sans-serif] max-sm:px-4">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(13,149,92,0.3)] rounded-md">
          <div className="md:max-w-md w-full px-4 py-4">
            <form onSubmit={handleLogin}>
              <div className="mb-12">
                <h3 className="text-gray-800 text-3xl font-extrabold">Sign in</h3>
                <p className="text-sm mt-4 text-gray-800">Don't have an account <a onClick={(e) => e.preventDefault()} className="text-primary font-semibold hover:underline ml-1 whitespace-nowrap">Register here</a></p>
              </div>
              <div>
                <label className="text-gray-800 text-xs block mb-2">Email</label>
                <div className="relative flex items-center ">
                  <div className='flex-1'>
                    <Input
                      type="email"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-second pl-2 pr-8 py-3 outline-none " placeholder="Enter email"
                    />
                  </div>
                  <AiOutlineUser className="w-[18px] h-[18px] absolute right-2 text-gray-400" />
                </div>
              </div>
              <div className="mt-8">
                <label className="text-gray-800 text-xs block mb-2">Password</label>
                <div className="relative flex items-center">
                  <div className='flex-1'>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-second pl-2 pr-8 py-3 outline-none" placeholder="Enter password" />
                  </div>
                  {showPassword ? <AiOutlineEye className="w-[18px] h-[18px] absolute right-2 cursor-pointer text-gray-400"
                    onClick={() => {
                      setShowPassword(!showPassword)
                    }} /> : <AiOutlineEyeInvisible className="w-[18px] h-[18px] absolute right-2 cursor-pointer text-gray-400" onClick={() => {
                      setShowPassword(!showPassword)
                    }} />}
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-primary focus:ring-primary border-gray-300 rounded accent-primary" />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                    Remember me
                  </label>
                </div>
                <div>
                  <a href="jajvascript:void(0);" className="text-primary font-semibold text-sm hover:underline">
                    Forgot Password?
                  </a>
                </div>
              </div>

              <div className="mt-12">
                <Button
                  label={isSubmitting ? 'Logging In...' : 'Login'}
                  onClick={() => { }}
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-sm font-bold tracking-wide rounded-md text-white  bg-primary hover:bg-second focus:outline-none" />
              </div>
              <div className="my-4 flex items-center gap-4">
                <hr className="w-full border-gray-300" />
                <p className="text-sm text-gray-800 text-center">or</p>
                <hr className="w-full border-gray-300" />
              </div>
              <div className="space-x-6 flex justify-center">
                <button type="button" onClick={handleGoogleLogin} >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 inline" viewBox="0 0 512 512">
                    <path fill="#fbbd00"
                      d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                      data-original="#fbbd00" />
                    <path fill="#0f9d58"
                      d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                      data-original="#0f9d58" />
                    <path fill="#31aa52"
                      d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                      data-original="#31aa52" />
                    <path fill="#3c79e6"
                      d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                      data-original="#3c79e6" />
                    <path fill="#cf2d48"
                      d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                      data-original="#cf2d48" />
                    <path fill="#eb4132"
                      d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                      data-original="#eb4132" />
                  </svg>
                </button>

                <button type="button" className='w-32 h-20 bg-gray-400' onClick={handleGoogleLogin} >
                  Tạo tài khoản

                </button>
              </div>
            </form>
          </div>
          <div className="w-full h-full flex items-center bg-[#000842] rounded-xl ">
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
