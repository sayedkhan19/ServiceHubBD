import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';

const Login = () => {
  const {signIn,googlePopUp,setUser} = useContext(AuthContext);
   const navigate = useNavigate();
    const location = useLocation();
    const from = location.state || "/";
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log({ email, password });
    signIn(email,password)
    .then(result=>{
      const user = result.user;
      navigate(from)
      console.log(user)
    })
    .catch(error=>{
      console.log(error)
    })
  };

  const handlePopUp = () => {
    googlePopUp()
        .then((result) => {
          const user = result.user;
          setUser(user);
          navigate(location.state ? location.state : "/");
          toast.success("Login with Google successful!");
        })
        .catch((error) => {
          console.error(error);
          toast.error(error.message);
        });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F8FC] px-4">
      <title>Login</title>
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">Login to Your Account</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full"
              placeholder="Enter your password"
              required
            />
            <div className="text-right mt-1">
              <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-neutral w-full mt-4"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don't have an account?
          <Link to="/register" className="text-pink-500 font-semibold hover:underline ml-1">
            Register
          </Link>
        </p>

        <div className="divider">or</div>

        <button
          onClick={handlePopUp}
          className="btn w-full bg-white text-black border border-gray-300 hover:shadow-md"
        >
          <svg
            aria-label="Google logo"
            width="20"
            height="20"
            viewBox="0 0 512 512"
            className="mr-2"
          >
            <g>
              <path d="M0 0h512v512H0z" fill="#fff" />
              <path fill="#EA4335" d="M113 309l-18 67-65-1a208 208 0 0 1 0-187h1l58 11 25 56a126 126 0 0 0 0 54z" />
              <path fill="#34A853" d="M113 203l-25-56-58-11a208 208 0 0 1 290-77l-48 55a126 126 0 0 0-159 89z" />
              <path fill="#FBBC05" d="M423 210h-195v72h112c-7 40-43 67-87 67a96 96 0 0 1 0-192c25 0 47 9 63 24l47-47a160 160 0 1 0-111 273c85 0 157-58 157-160 0-10-1-20-3-29z" />
              <path fill="#4285F4" d="M512 256a256 256 0 1 1-512 0 256 256 0 0 1 512 0z" fillOpacity="0" />
            </g>
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
