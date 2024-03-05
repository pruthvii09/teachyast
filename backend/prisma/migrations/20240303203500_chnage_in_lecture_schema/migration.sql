-- DropForeignKey
ALTER TABLE "Lecture" DROP CONSTRAINT "Lecture_id_fkey";

-- AddForeignKey
ALTER TABLE "Lecture" ADD CONSTRAINT "Lecture_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
