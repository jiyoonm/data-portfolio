"use client";
import Link from "next/link";

import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];
  return (
    <nav className="sticky top-10 z-50 mx-auto text-center ">
      <div className=" bg-white shadow w-fit mx-auto px-3 py-2 rounded-3xl ">
        <ul className="flex space-x-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`px-4 py-1.5 rounded-2xl
                  ${
                    pathname === link.href
                      ? "bg-gray-200 text-black"
                      : "hover:bg-gray-100"
                  }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
