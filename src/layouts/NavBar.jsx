
import { NavLink } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { useContext } from 'react';

const NavBar = () => {
  const {logOut,user} = useContext(AuthContext);
  
  const links = 
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/"}>Service</NavLink>
      </li>
      {!user && (
  <>
    <li>
      <NavLink className={({ isActive }) => (isActive ? "border-2 font-bold" : "font-semibold text-gray-500")} to={"/login"}>Login</NavLink>
    </li>
    <li>
      <NavLink className={({ isActive }) => (isActive ? "border-2 font-bold" : "font-semibold text-gray-500")} to={"/register"}>Signup</NavLink>
    </li>
  </>
)}
    </>

    const handleLogOut = ()=>{
     logOut()
     .then(result=>{
      console.log(result)
     })
     .catch(error=>{
      console.log(error)
     })
  }
    return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
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
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          <div className='mx-2'>
          
            {user && (
              <img
                className="rounded-full w-10 h-10 object-cover cursor-pointer"
                src={user.photoURL || "https://i.ibb.co/2kRTPqR/default-user.png"}
                alt="user profile"
                title={user.displayName || "User"}
                onError={(e) =>
                  (e.currentTarget.src = "https://i.ibb.co/2kRTPqR/default-user.png")
                  

                }
              />
            )}
            

          
        </div>
          {
              user ? <NavLink to={'/login'} onClick={handleLogOut} className='btn'>Log out</NavLink> : <NavLink to={"/login"} className='btn'>Login</NavLink>
            }
        </div>
      </div>
    </div>
  );
};

export default NavBar;