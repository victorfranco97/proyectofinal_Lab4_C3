import { PrismaClient } from '@prisma/client';
import { transformBigInt } from '../utils/prismaUtils';
const prisma = new PrismaClient();

export class DescuentoService {
  async getAll() {
    try {
      const descuento = await prisma.descuento.findMany({ include: { precio_descuentos: true } });
      return transformBigInt(descuento);
    } catch (error) {
      throw new Error('Error fetching descuentos');
    }
  }

  async getById(id: number) { // Cambiado de string a number
    try {
      const descuento = await prisma.descuento.findUnique({ where: { id: BigInt(id) }, include: { precio_descuentos: true } });
      if (!descuento) throw new Error('Descuento not found');
      return transformBigInt(descuento);
    } catch (error) {
      throw error;
    }
  }

  async create(data: { fecha_final: Date; fecha_inicio: Date; porcentaje: string }) {
    try {
      const descuento = await prisma.descuento.create({ data });
      return transformBigInt(descuento);
    } catch (error) {
      throw new Error('Error creating descuento');
    }
  }

  async update(id: number, data: { fecha_final?: Date; fecha_inicio?: Date; porcentaje?: string }) { // Cambiado de string a number
    try {
      const descuento = await prisma.descuento.update({ where: { id: BigInt(id) }, data });
      return transformBigInt(descuento);
    } catch (error) {
      throw new Error('Error updating descuento');
    }
  }

  async delete(id: number) { // Cambiado de string a number
    try {
      const descuento = await prisma.descuento.delete({ where: { id: BigInt(id) } });
      return transformBigInt(descuento);
    } catch (error) {
      throw new Error('Error deleting descuento');
    }
  }
}