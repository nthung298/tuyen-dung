"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const navItems = [
  { label: "Trang chủ", path: "https://archihau.edu.vn/#/" },
  { label: "Giới thiệu", path: "https://archihau.edu.vn/#/about/" },
  { label: "Đào tạo", path: "https://archihau.edu.vn/#/dao-tao" },
  { label: "Hoạt động khoa", path: "https://archihau.edu.vn/#/hoat-dong-khoa" },
  { label: "Hợp tác - Kết nối", path: "https://archihau.edu.vn/#/hop-tac-ket-noi/" },
  { label: "Thông báo", path: "https://archihau.edu.vn/#/tin-tuc" },
  { label: "Tạp chí kiến trúc", path: "https://www.tapchikientruc.com.vn/" },
];

const Header = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const topbarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!topbarRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Nếu topbar không còn trong viewport → đã scroll
        setScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(topbarRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <header className="bg-header text-header-foreground shadow-lg z-50 transition-all duration-300">
      
      {/* Top bar */}
      <div
        ref={topbarRef}
        className={`bg-primary/90 border-b border-primary-foreground/10 transition-all duration-300 ${
          scrolled ? "h-0 opacity-0 overflow-hidden" : "h-auto opacity-100"
        }`}
      >
        <div className="container mx-auto px-4 py-1.5 flex justify-between items-center text-xs text-primary-foreground/80">
          <span>Trường Đại học Kiến trúc Hà Nội – Khoa Kiến Trúc</span>
          <span className="hidden sm:inline">
            📧 khoakientruc@hau.edu.vn | ☎ (024) 3854 2521
          </span>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={`px-[calc((100%-1400px)/2+16px)] bg-header mx-auto transition-all duration-300 ${
          scrolled ? "py-2 fixed top-0 right-0 left-0" : "py-4"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-14" : "h-20"
          }`}
        >
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/img/LOGO KKT 2025.svg"
              alt="Logo Khoa Kiến Trúc"
              className={`object-contain transition-all duration-300 ${
                scrolled ? "w-10 h-10" : "w-20 h-20"
              }`}
            />
            <div className="hidden sm:block">
              <div className="font-serif font-bold text-lg leading-tight">
                KHOA KIẾN TRÚC
              </div>
              <div className="text-[11px] text-primary-foreground/70 tracking-wide">
                ĐẠI HỌC KIẾN TRÚC HÀ NỘI
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  pathname === item.path ||
                  (item.path !== "/" && pathname?.startsWith(item.path))
                    ? "bg-accent text-accent-foreground"
                    : "text-primary-foreground/90 hover:bg-primary-foreground/10"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-primary-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 border-t border-primary-foreground/10 pt-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2 rounded text-sm font-medium transition-colors ${
                  pathname === item.path ||
                  (item.path !== "/" && pathname?.startsWith(item.path))
                    ? "bg-accent text-accent-foreground"
                    : "text-primary-foreground/90 hover:bg-primary-foreground/10"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;