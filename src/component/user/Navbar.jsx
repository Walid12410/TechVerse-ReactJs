import { Menu, X } from "lucide-react";
import { useState } from "react";
import LogoImage from "../../assets/image/logo.png";
import XImage from "../../assets/image/x.png";

const NavBar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About Us" },
    { href: "#services", label: "Services" },
    { href: "#projects", label: "Projects" },
    { href: "#pricing", label: "Pricing" },
    { href: "#contact", label: "Contact Us" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-2">
      <a href="#home" className="h-15 w-20 hidden md:block">
        <img src={LogoImage} alt="Tech Verse" className="object-fill text-white" />
      </a>

      <div className="flex items-center gap-4 ml-auto relative">
        <div className="relative">
          {isDropdownOpen ? (
            <img src={XImage} alt="Tech Verse" className="object-cover cursor-pointer w-10 h-10 mr-5 text-white" onClick={() => setDropdownOpen(false)}/>

          ) : (
            <Menu className="w-15 h-15 cursor-pointer text-white" onClick={() => setDropdownOpen(true)} />

          )}

          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 min-w-[180px] rounded z-10 flex flex-col items-end px-4 py-4 space-y-2 shadow-lg">
              {links.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setDropdownOpen(false)}
                  style={{ fontFamily: 'CelabRegular, sans-serif' }}
                  className="block text-center font-bold uppercase text-white text-lg tracking-wide hover:text-gray-300"
                >
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
