import { PrismaClient } from '@prisma/client';
import { transformBigInt } from '../utils/prismaUtils';
const prisma = new PrismaClient();

export class PrecioService {
  async getAll() {
    try {
      const precio = await prisma.precio.findMany({ include: { precio_descuentos: true } });
      return transformBigInt(precio);
    } catch (error) {
      throw new Error('Error fetching precios');
    }
  }

  async getById(id: number) { // Cambiado de string a number
    try {
      const precio = await prisma.precio.findUnique({ where: { id: BigInt(id) }, include: { precio_descuentos: true } });
      if (!precio) throw new Error('Precio not found');
      return transformBigInt(precio);
    } catch (error) {
      throw error;
    }
  }

  async create(data: { precio_compra: number; precio_venta: number }) {
    try {
      const precio = await prisma.precio.create({ data });
      return transformBigInt(precio);
    } catch (error) {
      throw new Error('Error creating precio');
    }
  }

  async update(id: number, data: { precio_compra?: number; precio_venta?: number }) { // Cambiado de string a number
    try {
      const precio = await prisma.precio.update({ where: { id: BigInt(id) }, data });
      return transformBigInt(precio);
    } catch (error) {
      throw new Error('Error updating precio');
    }
  }

  async delete(id: number) { // Cambiado de string a number
    try {
      const precio = await prisma.precio.delete({ where: { id: BigInt(id) } });
      return transformBigInt(precio);
    } catch (error) {
      throw new Error('Error deleting precio');
    }
  }
}