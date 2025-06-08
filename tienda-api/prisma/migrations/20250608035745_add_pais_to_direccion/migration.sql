/*
  Warnings:

  - Added the required column `pais` to the `Direccion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Direccion" ADD COLUMN     "pais" TEXT NOT NULL;
