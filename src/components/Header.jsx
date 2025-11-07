import { useState } from "react";
import logoImg from "../assets/logo.png"; // adjust path

const navItems = [
  { label: "HOME", href: "/" },
  { label: "PRIVACY", href: "#" },
  { label: "TERMS OF SERVICE", href: "#" },
  { label: "CONTACT", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 w-full flex justify-center py-4 fixed backdrop-blur-md">
      <div className="w-full max-w-6xl flex items-center lg:px-0 px-4">
        <div className="flex py-2 justify-between items-center w-full">
          {/* Logo */}
          <a href="/" className="lg:flex hidden">
            <img src={logoImg.src} alt="Logo" width={295} height={65} />
          </a>
          <a href="/" className="flex lg:hidden">
            <img src={logoImg.src} alt="Logo" width={150} height={65} />
          </a>

          {/* Desktop nav */}
          <nav className="lg:flex hidden items-center gap-8 text-sm">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-orange-500 transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Contact button for desktop */}
        <a href="/contact" className="pl-20 lg:flex hidden">
          <button className="cursor-pointer text-sm font-bold px-5 py-1 rounded-full border-2 text-nowrap hover:text-orange-500 transition-colors duration-300">
            Contact Sales
          </button>
        </a>

        <div className="relative lg:hidden">
          <button
            // onClick={() => setMenuOpen(!menuOpen)}
            // className="flex flex-col gap-1 cursor-pointer p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            data-testid="mobile-menu-button"
          >
            <div className="flex flex-col gap-1 cursor-pointer p-4">
               <span className="w-6 h-0.5 bg-orange-500"></span>
              <span className="w-6 h-0.5 bg-orange-500"></span>
              <span className="w-6 h-0.5 bg-orange-500"></span>
            </div>         
          </button>

          {/* Dropdown menu */}
          {menuOpen && (
            // <div className="absolute right-0 w-48 bg-white rounded-lg shadow-lg flex flex-col text-lg overflow-hidden transition-all duration-300">
            <div
              className="absolute right-0 w-48 bg-white rounded-lg shadow-lg flex flex-col text-lg overflow-hidden transition-all duration-300"
              data-testid="mobile-menu"
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
