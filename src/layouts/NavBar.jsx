import { NavLink } from 'react-router';
import { useContext } from 'react';
import logoImg from "../../src/assets/beauty.png";
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';


const NavBar = () => {
  const { logOut, user } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logout successful");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Logout failed");
      });
  };

  // Common links for both guest and logged-in users
  const commonLinks = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => isActive ? "font-bold border-b-2" : "font-semibold text-gray-500"}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/allservices" className={({ isActive }) => isActive ? "font-bold border-b-2" : "font-semibold text-gray-500"}>
         Services
        </NavLink>
      </li>
      
    </>
  );

  // Guest navigation
  const guestLinks = (
    <>
      {commonLinks}
      <li>
        <NavLink to="/login" className={({ isActive }) => isActive ? "font-bold border-b-2" : "font-semibold text-gray-500"}>
          Login
        </NavLink>
      </li>
    </>
  );

  
  const userLinks = (
    <>
      {commonLinks}
      <li tabIndex={0}>
        <details>
          <summary className="font-semibold text-gray-500">Dashboard</summary>
          <ul className="p-2 bg-base-100 rounded-md shadow-md z-10">
            <li>
              <NavLink to="/add-service" className={({ isActive }) => isActive ? "font-bold border-b-2" : "font-semibold text-gray-500"}>
                Add Service
              </NavLink>
            </li>
            <li>
              <NavLink to="/manage-service" className={({ isActive }) => isActive ? "font-bold border-b-2" : "font-semibold text-gray-500"}>
                Manage Service
              </NavLink>
            </li>
            <li>
              <NavLink to="/booked-services" className={({ isActive }) => isActive ? "font-bold border-b-2" : "font-semibold text-gray-500"}>
                Booked Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/service-to-do" className={({ isActive }) => isActive ? "font-bold border-b-2" : "font-semibold text-gray-500"}>
                Service To-Do
              </NavLink>
            </li>
          </ul>
        </details>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Mobile dropdown start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-20 p-2 shadow bg-base-100 rounded-box w-52">
            {user ? userLinks : guestLinks}
          </ul>
        </div>
        <div className='flex items-center gap-1'>
          <img className='h-10 w-10' src={logoImg} alt="logo" />
          <NavLink to="/" className="font-bold text-xl hidden lg:block">ServiceHubBD</NavLink>
        </div>
      </div>

      {/* Desktop nav links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {user ? userLinks : guestLinks}
        </ul>
      </div>

      {/* User avatar and logout */}
      <div className="navbar-end flex items-center gap-3">
        {user && (
          <>
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={user.photoURL || "https://i.ibb.co/2kRTPqR/default-user.png"}
              alt="User"
              title={user.displayName || "User"}
              onError={(e) => (e.currentTarget.src = "https://i.ibb.co/2kRTPqR/default-user.png")}
            />
            <button onClick={handleLogOut} className="btn btn-outline btn-sm">
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
