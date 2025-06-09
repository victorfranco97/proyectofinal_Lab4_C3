/*
  Warnings:

  - Added the required column `updated_at` to the `Categoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Descuento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Direccion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Imagen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Orden_Compra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Orden_Compra_Detalle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Precio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Precio_Descuento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Talle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Usuario_Direccion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Categoria" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Descuento" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Direccion" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Imagen" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Orden_Compra" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Orden_Compra_Detalle" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Precio" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Precio_Descuento" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Producto" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Talle" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Usuario_Direccion" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Categoria_is_deleted_idx" ON "Categoria"("is_deleted");

-- CreateIndex
CREATE INDEX "Descuento_is_deleted_idx" ON "Descuento"("is_deleted");

-- CreateIndex
CREATE INDEX "Direccion_is_deleted_idx" ON "Direccion"("is_deleted");

-- CreateIndex
CREATE INDEX "Imagen_is_deleted_idx" ON "Imagen"("is_deleted");

-- CreateIndex
CREATE INDEX "Orden_Compra_is_deleted_idx" ON "Orden_Compra"("is_deleted");

-- CreateIndex
CREATE INDEX "Orden_Compra_Detalle_is_deleted_idx" ON "Orden_Compra_Detalle"("is_deleted");

-- CreateIndex
CREATE INDEX "Precio_is_deleted_idx" ON "Precio"("is_deleted");

-- CreateIndex
CREATE INDEX "Precio_Descuento_is_deleted_idx" ON "Precio_Descuento"("is_deleted");

-- CreateIndex
CREATE INDEX "Producto_is_deleted_idx" ON "Producto"("is_deleted");

-- CreateIndex
CREATE INDEX "Talle_is_deleted_idx" ON "Talle"("is_deleted");

-- CreateIndex
CREATE INDEX "Usuario_is_deleted_idx" ON "Usuario"("is_deleted");

-- CreateIndex
CREATE INDEX "Usuario_Direccion_is_deleted_idx" ON "Usuario_Direccion"("is_deleted");
