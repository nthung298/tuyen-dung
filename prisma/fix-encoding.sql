-- Fix charset for the jobs table
ALTER TABLE `jobs` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Fix charset for the applications table
ALTER TABLE `applications` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
