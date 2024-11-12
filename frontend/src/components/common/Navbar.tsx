import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/logoDark.png";
import { IoIosArrowDropdown } from "react-icons/io";
import { WalletProvider } from '../../contexts/WalletContext'; // Adjust path as necessary
import WalletConnect from '../wallet/WalletConnect'; // Adjust path as necessary

// Creating subLinks for demonstration
const testSubLinks = [
  { title: "AI-ML", link: "/catalog/ai-ml" },
  { title: "DSA", link: "/catalog/dsa" },
];

// Main navigation links
const NavbarLinks = [
  { title: "Home", path: "/" },
  { title: "About Us", path: "/about" },
  { title: "Contact Us", path: "/contact" },
  { title: "Retrieve", path: "/download" },
];

const Navbar = () => (
  <WalletProvider>
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className="flex flex-row w-11/12 max-w-maxContent items-center justify-between">
        
        {/* Logo */}
        <div className='w-[12rem] h-[42px] rounded-md overflow-hidden'>
  <Link to="/">
    <img src={logo} loading="lazy" alt="Logo" className='object-cover w-full h-full' />
  </Link>
</div>

        

        {/* Navigation Links */}
        <nav>
          <ul className="flex flex-row gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="flex items-center gap-3 group relative">
                    <p>{link.title}</p>
                    <IoIosArrowDropdown />
                    <div className="invisible absolute z-10 top-full mt-2 flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-[70%] top-0 h-6 w-6 bg-richblack-5 rotate-45"></div>
                      {testSubLinks.map((subLink, index) => (
                        <Link to={subLink.link} key={index}>
                          <p>{subLink.title}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link to={link.path || "#"}>
                    <p>{link.title}</p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Wallet Connect / Cart Icon */}
        <div className="flex mx-2 items-center gap-4">
          <div className="App">
            <header>
              <WalletConnect />
            </header>
          </div>
        </div>

      </div>
    </div>
  </WalletProvider>
);

export default Navbar;
