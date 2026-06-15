-- Database Schema for Yayasan Silih Asah Silih Asih Silih Asuh

CREATE DATABASE IF NOT EXISTS `silihasah_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `silihasah_db`;

-- 1. Table structure for donations
CREATE TABLE IF NOT EXISTS `donations` (
  `id` VARCHAR(50) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `amount` INT NOT NULL,
  `program` VARCHAR(100) NOT NULL,
  `payment_method` VARCHAR(50) NOT NULL,
  `status` ENUM('SUCCESS', 'PENDING', 'FAILED') NOT NULL DEFAULT 'PENDING',
  `message` TEXT NULL,
  `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_donations_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Table structure for volunteers
CREATE TABLE IF NOT EXISTS `volunteers` (
  `id` VARCHAR(50) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `interest_area` VARCHAR(50) NOT NULL,
  `status` ENUM('APPROVED', 'PENDING', 'REJECTED') NOT NULL DEFAULT 'PENDING',
  `motivation` TEXT NULL,
  `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_volunteers_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Table structure for programs
CREATE TABLE IF NOT EXISTS `programs` (
  `id` VARCHAR(50) NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `target` BIGINT NOT NULL DEFAULT 0,
  `raised` BIGINT NOT NULL DEFAULT 0,
  `is_active` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Table structure for settings (Configurations stored in DB)
CREATE TABLE IF NOT EXISTS `settings` (
  `key_name` VARCHAR(100) NOT NULL,
  `value_text` TEXT NULL,
  PRIMARY KEY (`key_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed initial programs data
INSERT INTO `programs` (`id`, `title`, `target`, `raised`) VALUES
('asah', 'Beasiswa Pintar Silih Asah', 150000000, 94500000),
('asih', 'Pangan Lansia Silih Asih', 80000000, 68200000),
('asuh', 'Pos Sehat Ibu & Anak Silih Asuh', 100000000, 45000000)
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`);

-- Seed initial settings data (Default Midtrans Sandbox configuration)
INSERT INTO `settings` (`key_name`, `value_text`) VALUES
('midtrans_server_key', 'SB-Mid-server-xxxxxxxxx'),
('midtrans_client_key', 'SB-Mid-client-yyyyyyyyy'),
('midtrans_environment', 'sandbox')
ON DUPLICATE KEY UPDATE `key_name`=`key_name`;
