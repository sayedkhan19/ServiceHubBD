import React, { useContext } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';

const Register = () => {
  const {createUser} = useContext(AuthContext)
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    console.log({ name, email, photo, password });
    createUser(email,password)
    .then((result)=>{
      const user = result.user;
      console.log(user)
    })
    .catch(error=>{
      const errorCode = error.code;
      const errormessage = error.message;
      alert(errormessage);
    })

    // Optionally: Validate password here or trigger backend call
  };

  const handlePopUp = () => {
    // Add Google sign-up logic
    console.log('Google Signup Clicked');
  };

  return (
    <div className="min-h-screen bg-[#F2F8FC] flex items-center justify-center px-4">
      <title>Roommate || Register</title>
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">
          Register Your Account
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full"
              placeholder="Your full name"
              required
            />
          </div>

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
              placeholder="Create a strong password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
            <input
              type="text"
              name="photo"
              className="input input-bordered w-full"
              placeholder="Profile image link"
              required
            />
          </div>

          <button type="submit" className="btn btn-neutral w-full">
            Register
          </button>
        </form>

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
          Continue with Google
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?
          <NavLink to="/login" className="text-blue-500 font-semibold ml-1 hover:underline">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
