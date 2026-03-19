import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Info */}
          <div>
            <h3 className="font-serif font-bold text-lg text-primary-foreground mb-4">KHOA KIẾN TRÚC</h3>
            <p className="text-sm leading-relaxed text-footer-foreground/80">
              Trường Đại học Kiến trúc Hà Nội – Đào tạo kiến trúc sư hàng đầu Việt Nam từ năm 1969.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif font-semibold text-primary-foreground mb-4">Liên kết</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-accent transition-colors">Trang chủ</Link></li>
              <li><Link href="/" className="hover:text-accent transition-colors">Tuyển dụng</Link></li>
              <li><a href="https://hau.edu.vn" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Trang web Trường</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-semibold text-primary-foreground mb-4">Liên hệ</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
                <span>Km 10, Nguyễn Trãi, Thanh Xuân, Hà Nội</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-accent" />
                <span>(024) 3854 2521</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-accent" />
                <span>khoakientruc@hau.edu.vn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-footer-foreground/20 mt-8 pt-6 text-center text-xs text-footer-foreground/60">
          © 2026 Khoa Kiến Trúc – Trường Đại học Kiến trúc Hà Nội. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
