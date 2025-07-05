import { Menu } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  // Animation variants for the dropdown
  const dropdownVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.25, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-2">
      <a href="#home" className="h-15 w-20 hidden md:block">
        <img src={LogoImage} alt="Tech Verse" className="object-fill text-white" />
      </a>

      <div className="flex items-center gap-4 ml-auto relative">
        <div className="relative">
          {isDropdownOpen ? (
            <img
              src={XImage}
              alt="Close Menu"
              className="object-cover cursor-pointer w-10 h-10 mr-5 text-white"
              onClick={() => setDropdownOpen(false)}
            />
          ) : (
            <Menu
              className="w-15 h-15 cursor-pointer text-white"
              onClick={() => setDropdownOpen(true)}
            />
          )}

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                className="absolute top-full right-0 mt-2 min-w-[180px] rounded z-10 flex flex-col items-end px-4 py-4 space-y-2 "
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {links.map(({ href, label }) => (
                  <button
                    key={href}
                    onClick={() => {
                      setDropdownOpen(false);
                      const targetId = href.replace("#", "");
                      const el = document.getElementById(targetId);
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    style={{ fontFamily: 'CelabRegular, sans-serif' }}
                    className="block text-center font-bold uppercase text-white text-lg tracking-wide hover:text-gray-300"
                  >
                    {label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
