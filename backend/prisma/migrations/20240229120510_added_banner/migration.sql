/*
  Warnings:

  - Added the required column `banner` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "banner" TEXT NOT NULL;
