import { PrismaClient } from '@prisma/client';
import { transformBigInt } from '../utils/prismaUtils';
const prisma = new PrismaClient();

export class TalleService {
  async getAll() {
    try {
      const talle = await prisma.talle.findMany({ include: { detalles: true } });
      return transformBigInt(talle);
    } catch (error) {
      throw new Error('Error fetching talles');
    }
  }

  async getById(id: number) { // Cambiado de string a number
    try {
      const talle = await prisma.talle.findUnique({ where: { id: BigInt(id) }, include: { detalles: true } });
      if (!talle) throw new Error('Talle not found');
      return transformBigInt(talle);
    } catch (error) {
      throw error;
    }
  }

  async create(data: { numero: string }) {
    try {
      const talle = await prisma.talle.create({ data });
      return transformBigInt(talle);
    } catch (error) {
      throw new Error('Error creating talle');
    }
  }

  async update(id: number, data: { numero?: string }) { // Cambiado de string a number
    try {
      const talle = await prisma.talle.update({ where: { id: BigInt(id) }, data });
      return transformBigInt(talle);
    } catch (error) {
      throw new Error('Error updating talle');
    }
  }

  async delete(id: number) { // Cambiado de string a number
    try {
      const talle = await prisma.talle.delete({ where: { id: BigInt(id) } });
      return transformBigInt(talle);
    } catch (error) {
      throw new Error('Error deleting talle');
    }
  }
}