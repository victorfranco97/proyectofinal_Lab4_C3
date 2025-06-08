import { PrismaClient } from '@prisma/client';
import { transformBigInt } from '../utils/prismaUtils';
const prisma = new PrismaClient();

export class PrecioDescuentoService {
  async getAll() {
    try {
      const precio_descuento = await prisma.precio_Descuento.findMany({ include: { descuento: true, precio: true, orden_detalles: true } });
      return transformBigInt(precio_descuento);
    } catch (error) {
      throw new Error('Error fetching precio descuentos');
    }
  }

  async getById(id: number) { // Cambiado de string a number
    try {
      const precioDescuento = await prisma.precio_Descuento.findUnique({ where: { id: BigInt(id) }, include: { descuento: true, precio: true, orden_detalles: true } });
      if (!precioDescuento) throw new Error('Precio Descuento not found');
      return transformBigInt(precioDescuento);
    } catch (error) {
      throw error;
    }
  }

  async create(data: { descuento_id: number; precio_id: number }) {
    try {
      const precio_descuento = await prisma.precio_Descuento.create({ data });
      return transformBigInt(precio_descuento);
    } catch (error) {
      throw new Error('Error creating precio descuento');
    }
  }

  async update(id: number, data: { descuento_id?: number; precio_id?: number }) { // Cambiado de string a number
    try {
      const precio_descuento = await prisma.precio_Descuento.update({ where: { id: BigInt(id) }, data });
      return transformBigInt(precio_descuento);
    } catch (error) {
      throw new Error('Error updating precio descuento');
    }
  }

  async delete(id: number) { // Cambiado de string a number
    try {
      const precio_descuento = await prisma.precio_Descuento.delete({ where: { id: BigInt(id) } });
      return transformBigInt(precio_descuento);
    } catch (error) {
      throw new Error('Error deleting precio descuento');
    }
  }
}