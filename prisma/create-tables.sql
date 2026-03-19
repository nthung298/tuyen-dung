-- Tạo bảng Jobs cho module tuyển dụng
-- Chạy lệnh này trong MySQL database của bạn

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
  `createdAt` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_slug` (`slug`),
  INDEX `idx_department` (`department`),
  INDEX `idx_deadline` (`deadline`)
);

-- Tạo bảng Applications cho hồ sơ ứng tuyển
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

-- Sau khi tạo bảng, chạy lệnh sau để Prisma nhận diện:
-- npx prisma db pull
