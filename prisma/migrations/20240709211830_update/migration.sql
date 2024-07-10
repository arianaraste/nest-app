/*
  Warnings:

  - Added the required column `link` to the `Bookmarks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Bookmarks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Bookmarks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hash` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bookmarks" ADD COLUMN     "desc" TEXT,
ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "hash" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT;

-- AddForeignKey
ALTER TABLE "Bookmarks" ADD CONSTRAINT "Bookmarks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
