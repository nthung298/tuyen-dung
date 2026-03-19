# Kế hoạch chuyển đổi từ Supabase sang Prisma

## Tổng quan

Chuyển đổi từ Supabase sang **Prisma** với database **MySQL** (đã có sẵn), giữ nguyên Next.js 14+ App Router, Tailwind CSS + shadcn/ui.

> **⚠️ QUAN TRỌNG**: Database đã tồn tại với các bảng dữ liệu khác. Tuyệt đối KHÔNG động vào dữ liệu hiện có.

## Thông tin Database

- **Database**: MySQL
- **Connection**: `mysql://archihau1_archi_hau:Z0C41wIx8imOKhTGcJl9Ulsk@103.130.216.169:3306/archihau1_archi_hau`

## Các bước thực hiện

### Bước 1: Cài đặt Prisma và dependencies
- Cài đặt `prisma` và `@prisma/client` 
- Khởi tạo Prisma với `npx prisma init`

### Bước 2: Cấu hình Prisma Schema (Database đã có sẵn)
- Sử dụng `npx prisma db pull` để introspect database hiện tại (KHÔNG tạo migration)
- Tạo `prisma/schema.prisma` với models:
  - `Job` - Tin tuyển dụng
  - `Application` - Hồ sơ ứng tuyển
- Chạy `npx prisma generate` để tạo Prisma Client

### Bước 3: Cập nhật biến môi trường
- Thêm `DATABASE_URL` vào `.env`
- Loại bỏ các biến Supabase

### Bước 4: Tạo Prisma Client
- Tạo `src/lib/prisma.ts` để khởi tạo Prisma Client singleton

### Bước 5: Tạo Server Actions cho CRUD
- Tạo `src/app/actions.ts` với các functions:
  - `getJobs()` - Lấy danh sách tin tuyển dụng
  - `getJobBySlug(slug)` - Lấy chi tiết tin theo slug
  - `createJob(data)` - Tạo tin tuyển dụng mới
  - `updateJob(id, data)` - Cập nhật tin tuyển dụng
  - `deleteJob(id)` - Xóa tin tuyển dụng
  - `submitApplication(data)` - Nộp hồ sơ ứng tuyển
  - `getApplications()` - Lấy danh sách hồ sơ (admin)

### Bước 6: Cập nhật Pages để sử dụng Prisma
- Cập nhật `app/tuyen-dung/page.tsx` - Sử dụng Server Action
- Cập nhật `app/tuyen-dung/[slug]/page.tsx` - Sử dụng Server Action
- Cập nhật `app/quan-tri/page.tsx` - Sử dụng Server Actions cho CRUD

### Bước 7: Loại bỏ Supabase
- Xóa thư mục `src/integrations/supabase/`
- Xóa dependencies Supabase trong `package.json`:
  - `@supabase/ssr`
  - `@supabase/supabase-js`
- Cập nhật `.env` - Loại bỏ Supabase variables

### Bước 8: Chuẩn bị dữ liệu
- **KHÔNG chạy prisma migrate** (để bảo toàn dữ liệu hiện có)
- Nếu cần tạo bảng mới, sử dụng raw SQL hoặc để user tạo thủ công
- Hoặc sử dụng `prisma db push` một lần duy nhất (cẩn thận!)

### Bước 9: Testing và Build
- Chạy `npm run build` để kiểm tra lỗi
- Test tất cả các chức năng CRUD

---

## Danh sách files cần tạo mới

1. `prisma/schema.prisma` - Prisma schema
2. `src/lib/prisma.ts` - Prisma client singleton
3. `src/app/actions.ts` - Server Actions cho CRUD

## Danh sách files cần xóa

1. `src/integrations/supabase/browser.ts`
2. `src/integrations/supabase/server.ts`
3. `src/integrations/supabase/types.ts`
4. `supabase/config.toml`

## Danh sách files cần sửa

1. `.env` - Cập nhật biến môi trường
2. `package.json` - Loại bỏ Supabase dependencies
3. `app/tuyen-dung/page.tsx` - Sử dụng Prisma qua Server Actions
4. `app/tuyen-dung/[slug]/page.tsx` - Sử dụng Prisma qua Server Actions
5. `app/quan-tri/page.tsx` - Sử dụng Prisma qua Server Actions
6. `components/recruitment/ApplicationModal.tsx` - Gọi Server Action để nộp hồ sơ

---

## Mermaid Diagram - Luồng dữ liệu

```mermaid
graph TD
    A[Client Components] -->|gọi Server Actions| B[src/app/actions.ts]
    B -->|sử dụng| C[Prisma Client]
    C -->|truy vấn| D[MySQL Database]
    
    E[Pages] -->|Server Components| B
    
    style A fill:#e1f5fe
    style B fill:#fff3e0
    style C fill:#e8f5e9
    style D fill:#fce4ec
```

## Mermaid Diagram - Kiến trúc mới

```mermaid
graph TD
    subgraph "Trước khi migration"
        A[Supabase] --> B[Client]
    end
    
    subgraph "Sau khi migration"
        C[Prisma] --> D[MySQL]
        D --> E[Server Actions]
        E --> F[Next.js Pages]
    end
```

---

## Tạo bảng trong Database (nếu cần)

Vì database đã tồn tại, bạn cần tạo các bảng mới bằng SQL thủ công. Chạy các lệnh sau trong MySQL:

```sql
-- Tạo bảng Jobs
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` VARCHAR(191) PRIMARY KEY,
  `slug` VARCHAR(191) NOT NULL UNIQUE,
  `title` VARCHAR(255) NOT NULL,
  `department` VARCHAR(255) NOT NULL,
  `jobType` ENUM('full-time', 'part-time', 'contract') NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `responsibilities` JSON,
  `requirements` JSON,
  `benefits` JSON,
  `deadline` DATE NOT NULL,
  `contactEmail` VARCHAR(255),
  `createdAt` DATE NOT NULL,
  INDEX `idx_slug` (`slug`),
  INDEX `idx_department` (`department`),
  INDEX `idx_deadline` (`deadline`)
);

-- Tạo bảng Applications
CREATE TABLE IF NOT EXISTS `applications` (
  `id` VARCHAR(191) PRIMARY KEY,
  `jobId` VARCHAR(191) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `cvFile` VARCHAR(500),
  `coverLetter` TEXT,
  `submittedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_jobId` (`jobId`),
  INDEX `idx_email` (`email`)
);
```

Sau khi tạo bảng, chạy `npx prisma db pull` để Prisma nhận diện các bảng mới.

---

**Bạn có đồng ý với kế hoạch này không? Có muốn tôi điều chỉnh gì không?**
