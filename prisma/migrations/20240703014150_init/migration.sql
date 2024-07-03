/*
  Warnings:

  - A unique constraint covering the columns `[pathname]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pathname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `photoUrl` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "pathname" TEXT NOT NULL,
ALTER COLUMN "photoUrl" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_pathname_key" ON "User"("pathname");
