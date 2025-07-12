"use client"
import { useState } from "react";
import { FaBroom, FaHome, FaPhone, FaServicestack, FaBars } from "react-icons/fa";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  const menuItems = [
    { icon: <FaHome />, label: "Início", link: "#" },
    { icon: <FaServicestack />, label: "Serviços", link: "#" },
    { icon: <FaPhone />, label: "Contato", link: "#" },
  ];

  return (
    <div className={`flex h-screen ${open ? "w-64" : "w-20"} bg-green-600 text-white transition-all duration-300`}>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between px-4 py-5 border-b border-white/20">
          <div className="flex items-center gap-2">
            <FaBroom size={28} />
            {open && <span className="text-xl font-bold">CleanSite</span>}
          </div>
          <button onClick={() => setOpen(!open)}>
            <FaBars />
          </button>
        </div>

        <nav className="mt-4 flex-1">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="flex items-center gap-3 px-4 py-3 hover:bg-green-700 transition-colors"
            >
              {item.icon}
              {open && <span>{item.label}</span>}
            </a>
          ))}
        </nav>

        <div className="p-4 border-t border-white/20 text-sm text-center">
          {open && <p>&copy; 2025 CleanSite</p>}
        </div>
      </div>
    </div>
  );
}
