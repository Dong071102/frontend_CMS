import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Hello from "../../assets/IconHomePage/hello.png";
import LoginArt from "../../assets/IconHomePage/LoginArt.png";
import { FcGoogle } from "react-icons/fc";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [err, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate(); // Khai báo navigate

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(null);
    setLoading(false);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError(null);
    setLoading(false);
  };

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    // Giả lập quá trình đăng nhập thành công sau 1.0 giây
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard"); // Chuyển hướng đến dashboard
    }, 1500);
  };

  return (
    <div className="flex w-full h-screen my-4 overflow-hidden">
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div>
          <img className="w-[72%] p-3 mx-auto mb-[12%]" src={Hello} alt="Hello" />
          <form>
            <div className="mb-4">
              <span className="block text-left text-[#0C1421] mb-2">Email</span>
              <input
                placeholder="Example@email.com"
                id="email"
                className="w-full p-3 border border-[#D4D7E3] rounded-[100px] text-black bg-white"
                type="email"
                name="email"
                onChange={handleEmailChange}
                value={email}
              />
            </div>

            <div className="mb-4 relative">
              <span className="block text-left text-[#0C1421] mb-2">Mật khẩu</span>
              <input
                id="password"
                className="w-full p-3 border border-[#D4D7E3] rounded-[100px] text-black bg-white"
                type="password"
                name="password"
                placeholder="Ít nhất 8 kí tự ..."
                onChange={handlePasswordChange}
                value={password}
              />
              <a href="/" className="hover:underline cursor-pointer text-sm text-green-600 absolute right-0 mt-14">
                Quên mật khẩu?
              </a>
            </div>

            <button
              disabled={!email || !password}
              onClick={handleClick}
              className={`w-full p-3 mt-6 rounded-[100px] transition ${!email || !password ? "bg-gray-400 text-white cursor-not-allowed" : "bg-black text-white cursor-pointer"}`}
            >
              {loading ? "Đang xử lý..." : "Đăng nhập"}
            </button>

            <div className="flex items-center w-full my-4">
              <hr className="flex-1 border-t-2 border-[#CFDFE2]" />
              <p className="mx-4 text-black whitespace-nowrap">Hoặc</p>
              <hr className="flex-1 border-t-2 border-[#CFDFE2]" />
            </div>

            {/* Đăng nhập bằng Google */}
            <button
              onClick={handleClick}
              className="w-full p-3 rounded-[100px] bg-black text-white flex items-center justify-center gap-3 transition cursor-pointer"
            >
              <FcGoogle className="w-5 h-5" />
              <span className="text-base">Đăng nhập bằng Google</span>
            </button>

            <div className="flex justify-center items-center mt-4 text-gray-600">
              <p className="text-sm">Bạn chưa có tài khoản?</p>
              <a href="/register" className="cursor-pointer ml-1 text-green-600 text-sm hover:underline">
                Đăng ký
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden md:flex w-1/2 items-center justify-center">
        <img src={LoginArt} alt="Login Art" className="rounded-[2.5%] w-[80%] h-[94%] object-cover" />
      </div>
    </div>
  );
};

export default Login;
