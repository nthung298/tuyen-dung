# Kế hoạch chuyển đổi dự án Tuyendung sang Next.js 14+ App Router

## Tổng quan

Chuyển đổi từ Vite + React sang **Next.js 14+ với App Router**, giữ nguyên Tailwind CSS + shadcn/ui, sử dụng Server Components + Server Actions.

## Cấu trúc file hiện tại và ánh xạ sang Next.js

```
src/
├── App.tsx                    → app/layout.tsx (root layout)
├── main.tsx                   → app/template.tsx
├── pages/
│   ├── Index.tsx              → app/page.tsx
│   ├── RecruitmentList.tsx    → app/tuyen-dung/page.tsx
│   ├── JobDetail.tsx          → app/tuyen-dung/[slug]/page.tsx
│   ├── AdminRecruitment.tsx   → app/quan-tri/page.tsx
│   └── NotFound.tsx           → app/not-found.tsx
├── components/layout/
│   ├── Header.tsx             → components/layout/Header.tsx
│   ├── Footer.tsx             → components/layout/Footer.tsx
│   └── PageBanner.tsx         → components/layout/PageBanner.tsx
└── components/
    ├── recruitment/           → components/recruitment/
    └── ui/                    → components/ui/ (giữ nguyên)
```

## Các bước thực hiện

### Bước 1: Thiết lập dự án Next.js mới
- Tạo package.json mới với dependencies Next.js
- Cấu hình next.config.js
- Cấu hình TypeScript (tsconfig.json)
- Thiết lập Tailwind CSS (tailwind.config.ts, postcss.config.js)

### Bước 2: Cấu hình Alias và Paths
- Cập nhật tsconfig.json với paths alias `@/*` tương thích Next.js
- Đảm bảo `@/*` trỏ đến `./src/*`

### Bước 3: Chuyển đổi Supabase Client
- Giữ nguyên cấu trúc supabase client
- Tạo server action functions cho CRUD operations
- Sử dụng `createServerClient` cho SSR

### Bước 4: Tạo Root Layout
- Tạo `app/layout.tsx` với:
  - HTML structure cho Next.js
  - Import fonts (Roboto, Roboto Slab)
  - ThemeProvider (next-themes)
  - Header và Footer components
  - Metadata cho SEO

### Bước 5: Chuyển đổi Pages

#### 5.1 Trang chủ (Index → app/page.tsx)
- Chuyển từ React component sang Next.js Server Component
- Sử dụng `Link` từ `next/link`
- Giữ nguyên logic hiển thị

#### 5.2 Danh sách tuyển dụng (RecruitmentList → app/tuyen-dung/page.tsx)
- Tạo dynamic route `/tuyen-dung`
- Chuyển filter logic sang Client Component (`'use client'`)
- Giữ pagination

#### 5.3 Chi tiết tin tuyển dụng (JobDetail → app/tuyen-dung/[slug]/page.tsx)
- Tạo dynamic route `/tuyen-dung/[slug]`
- Sử dụng `params` để lấy slug
- Chuyển modal sang Client Component

#### 5.4 Trang quản trị (AdminRecruitment → app/quan-tri/page.tsx)
- Tạo route `/quan-tri`
- Sử dụng Server Actions cho CRUD
- Giữ form handling với `'use client'`

#### 5.5 Not Found
- Tạo `app/not-found.tsx` cho 404 page

### Bước 6: Cập nhật Routing
- `/` → Trang chủ
- `/tuyen-dung` → Danh sách tin tuyển dụng
- `/tuyen-dung/[slug]` → Chi tiết tin tuyển dụng
- `/quan-tri` → Trang quản trị

### Bước 7: Xử lý Metadata và SEO
- Thêm metadata export cho mỗi page
- Cấu hình OpenGraph images
- Thiết lập robots.txt

### Bước 8: Testing và Build
- Chạy `npm run build` để kiểm tra lỗi
- Test tất cả các routes
- Đảm bảo responsive design hoạt động

## Các thay đổi chính cần lưu ý

1. **React Router → Next.js Routing**:
   - `<Link>` từ `react-router-dom` → `<Link>` từ `next/link`
   - `useParams` → `params` prop trong page component
   - `useNavigate` → `useRouter` từ `next/navigation`

2. **Client vs Server Components**:
   - Pages chính là Server Components (trừ khi cần state)
   - Components có interaction cần `'use client'`
   - Form handling với Server Actions

3. **Supabase**:
   - Sử dụng `createServerClient` cho cookies
   - Server Actions cho mutations
   - Giữ supabase-js client cho client-side queries

4. **CSS và Styling**:
   - Giữ nguyên tailwind.config.ts
   - Cần cập nhật index.css cho Next.js
   - Font loading với `next/font/google`

## Thời gian ước tính

Dự án có khoảng 15-20 files cần chuyển đổi, bao gồm:
- 5 pages chính
- 3 layout components
- 3 recruitment components
- 30+ UI components (giữ nguyên)
- Các file cấu hình

---

**Bạn có đồng ý với kế hoạch này không? Có muốn tôi điều chỉnh gì không?**
