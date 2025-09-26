/*
  Warnings:

  - Added the required column `features` to the `Package` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `package` ADD COLUMN `features` JSON NOT NULL;
