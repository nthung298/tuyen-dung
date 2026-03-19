import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="font-serif text-6xl md:text-8xl font-bold text-primary mb-4">404</h1>
      <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Không tìm thấy trang</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
      </p>
      <Link href="/">
        <Button>Về trang chủ</Button>
      </Link>
    </div>
  );
}
