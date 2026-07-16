"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, Heart } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState("light");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Check system preference or localStorage
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const menuItems = [
    { name: "Beranda", href: "/" },
    { name: "Tentang Kami", href: "/tentang" },
    { name: "Program", href: "/program" },
    { name: "Donasi", href: "/donasi" },
    { name: "Kontak", href: "/kontak" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-panel shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2">
            <div className="bg-brand-emerald-600 dark:bg-brand-emerald-700 p-2 rounded-full text-white shadow-md">
              <Heart className="h-6 w-6 fill-current animate-pulse" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight text-brand-emerald-950 dark:text-brand-emerald-100 block leading-tight">
                Silih Asah Silih Asih Silih Asuh
              </span>
              <span className="text-xs text-brand-amber-600 dark:text-brand-amber-500 font-semibold uppercase tracking-wider block">
                SA 3
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`font-semibold text-sm transition-colors duration-200 ${
                      isActive
                        ? "text-brand-emerald-750 dark:text-brand-emerald-400 border-b-2 border-brand-emerald-600 pb-1"
                        : "text-gray-700 hover:text-brand-emerald-750 dark:text-gray-300 dark:hover:text-brand-emerald-400"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-4 border-l border-gray-200 dark:border-gray-800 pl-6">
              {/* Dark/Light Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-500 hover:text-brand-emerald-700 dark:text-gray-400 dark:hover:text-brand-emerald-500 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200"
                aria-label="Toggle Theme"
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </button>

              {/* Action Button */}
              <Link
                href="/donasi"
                className="bg-brand-emerald-700 hover:bg-brand-emerald-800 dark:bg-brand-emerald-600 dark:hover:bg-brand-emerald-700 text-white font-semibold py-2.5 px-5 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                Donasi Sekarang
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 hover:text-brand-emerald-700 dark:text-gray-400 dark:hover:text-brand-emerald-500 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-brand-emerald-700 dark:hover:text-brand-emerald-500 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-screen opacity-100 visible"
            : "max-h-0 opacity-0 invisible overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-zinc-950 shadow-lg border-t border-gray-100 dark:border-zinc-900">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-brand-emerald-750 bg-brand-emerald-50 dark:text-brand-emerald-450 dark:bg-zinc-900"
                    : "text-gray-700 hover:text-brand-emerald-750 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-brand-emerald-400 dark:hover:bg-zinc-900"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          <div className="pt-4 pb-2 border-t border-gray-100 dark:border-zinc-900 px-3">
            <Link
              href="/donasi"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-brand-emerald-700 dark:bg-brand-emerald-600 text-white font-semibold py-3 px-4 rounded-full shadow-md transition-all duration-200"
            >
              Donasi Sekarang
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
