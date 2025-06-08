import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanDatabase() {
  try {
    console.log('Borrando todos los registros...');
    await prisma.$transaction([
      prisma.usuario_Direccion.deleteMany(), // Primero elimina las relaciones
      prisma.orden_Compra.deleteMany(), // Elimina órdenes si hay relaciones
      prisma.orden_Compra_Detalle.deleteMany(),
      prisma.usuario.deleteMany(), // Luego elimina usuarios
      prisma.direccion.deleteMany(),
      prisma.producto.deleteMany(),
      prisma.categoria.deleteMany(),
      prisma.talle.deleteMany(),
      prisma.precio.deleteMany(),
      prisma.precio_Descuento.deleteMany(),
      prisma.descuento.deleteMany(),
      prisma.imagen.deleteMany(),
    ]);
    console.log('Todos los registros han sido borrados exitosamente.');
  } catch (error) {
    console.error('Error al borrar los registros:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanDatabase();