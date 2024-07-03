/*
  Warnings:

  - You are about to drop the column `pathname` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_pathname_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "pathname";
