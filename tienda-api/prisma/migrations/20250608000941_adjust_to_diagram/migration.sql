-- CreateTable
CREATE TABLE "Usuario" (
    "id" BIGSERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "rol" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Direccion" (
    "id" BIGSERIAL NOT NULL,
    "departamento" TEXT NOT NULL,
    "localidad" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,

    CONSTRAINT "Direccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario_Direccion" (
    "id" BIGSERIAL NOT NULL,
    "usuario_id" BIGINT NOT NULL,
    "direccion_id" BIGINT NOT NULL,

    CONSTRAINT "Usuario_Direccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orden_Compra" (
    "id" BIGSERIAL NOT NULL,
    "fecha_compra" TIMESTAMP(3) NOT NULL,
    "id_usuario_direccion" BIGINT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Orden_Compra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orden_Compra_Detalle" (
    "id" BIGSERIAL NOT NULL,
    "id_orden_compra" BIGINT NOT NULL,
    "id_producto" BIGINT NOT NULL,
    "id_talle" BIGINT NOT NULL,
    "id_precio_descuento" BIGINT NOT NULL,
    "id_imagen" BIGINT NOT NULL,
    "detalle" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Orden_Compra_Detalle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Producto" (
    "id" BIGSERIAL NOT NULL,
    "categoria_id" BIGINT NOT NULL,
    "nombre" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" BIGSERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Talle" (
    "id" BIGSERIAL NOT NULL,
    "numero" TEXT NOT NULL,

    CONSTRAINT "Talle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Precio" (
    "id" BIGSERIAL NOT NULL,
    "precio_compra" DOUBLE PRECISION NOT NULL,
    "precio_venta" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Precio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Precio_Descuento" (
    "id" BIGSERIAL NOT NULL,
    "descuento_id" BIGINT NOT NULL,
    "precio_id" BIGINT NOT NULL,

    CONSTRAINT "Precio_Descuento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Descuento" (
    "id" BIGSERIAL NOT NULL,
    "fecha_final" TIMESTAMP(3) NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "porcentaje" TEXT NOT NULL,

    CONSTRAINT "Descuento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Imagen" (
    "id" BIGSERIAL NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Imagen_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_Direccion_usuario_id_direccion_id_key" ON "Usuario_Direccion"("usuario_id", "direccion_id");

-- CreateIndex
CREATE INDEX "Orden_Compra_id_usuario_direccion_idx" ON "Orden_Compra"("id_usuario_direccion");

-- AddForeignKey
ALTER TABLE "Usuario_Direccion" ADD CONSTRAINT "Usuario_Direccion_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario_Direccion" ADD CONSTRAINT "Usuario_Direccion_direccion_id_fkey" FOREIGN KEY ("direccion_id") REFERENCES "Direccion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orden_Compra" ADD CONSTRAINT "Orden_Compra_id_usuario_direccion_fkey" FOREIGN KEY ("id_usuario_direccion") REFERENCES "Usuario_Direccion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orden_Compra_Detalle" ADD CONSTRAINT "Orden_Compra_Detalle_id_orden_compra_fkey" FOREIGN KEY ("id_orden_compra") REFERENCES "Orden_Compra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orden_Compra_Detalle" ADD CONSTRAINT "Orden_Compra_Detalle_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orden_Compra_Detalle" ADD CONSTRAINT "Orden_Compra_Detalle_id_talle_fkey" FOREIGN KEY ("id_talle") REFERENCES "Talle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orden_Compra_Detalle" ADD CONSTRAINT "Orden_Compra_Detalle_id_precio_descuento_fkey" FOREIGN KEY ("id_precio_descuento") REFERENCES "Precio_Descuento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orden_Compra_Detalle" ADD CONSTRAINT "Orden_Compra_Detalle_id_imagen_fkey" FOREIGN KEY ("id_imagen") REFERENCES "Imagen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Precio_Descuento" ADD CONSTRAINT "Precio_Descuento_descuento_id_fkey" FOREIGN KEY ("descuento_id") REFERENCES "Descuento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Precio_Descuento" ADD CONSTRAINT "Precio_Descuento_precio_id_fkey" FOREIGN KEY ("precio_id") REFERENCES "Precio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
