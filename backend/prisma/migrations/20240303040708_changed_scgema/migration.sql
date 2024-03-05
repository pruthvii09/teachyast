/*
  Warnings:

  - You are about to drop the column `teacher` on the `Course` table. All the data in the column will be lost.
  - Added the required column `desc` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "teacher",
ADD COLUMN     "desc" TEXT NOT NULL,
ADD COLUMN     "user" TEXT NOT NULL;
