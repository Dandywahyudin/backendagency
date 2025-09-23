/*
  Warnings:

  - Added the required column `slug` to the `Package` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `package` ADD COLUMN `image` VARCHAR(191) NULL,
    ADD COLUMN `slug` VARCHAR(191) NOT NULL;
