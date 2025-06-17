import React from 'react';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import logoImg from "../../assets/beauty.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col gap-6">

        {/* Top Centered Links */}
        <div className="flex justify-center flex-wrap gap-6 text-sm font-medium">
          <a href="#" className="hover:text-white transition">Support</a>
          <a href="#" className="hover:text-white transition">Contact</a>
          <a href="#" className="hover:text-white transition">Help Center</a>
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
        </div>

        {/* Middle Row: Logo and Social Icons */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Name */}
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Logo" className="h-10 w-10 object-contain rounded-full" />
            <span className="text-xl font-semibold">ServiceHubBD</span>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-blue-500 transition"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-blue-400 transition"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="text-center text-sm text-gray-400 mt-4">
          © {new Date().getFullYear()} ServiceHubBD. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
