import { PrismaClient } from '@prisma/client';
import { transformBigInt } from '../utils/prismaUtils';
const prisma = new PrismaClient();

export class ImagenService {
  async getAll() {
    try {
      const imagen = await prisma.imagen.findMany({ include: { orden_detalles: true } });
      return transformBigInt(imagen);
    } catch (error) {
      throw new Error('Error fetching images');
    }
  }

  async getById(id: number) { // Cambiado de string a number
    try {
      const imagen = await prisma.imagen.findUnique({ where: { id: BigInt(id) }, include: { orden_detalles: true } });
      if (!imagen) throw new Error('Image not found');
      return transformBigInt(imagen);
    } catch (error) {
      throw error;
    }
  }

  async create(data: { url: string }) {
    try {
      const imagen = await prisma.imagen.create({ data });
      return transformBigInt(imagen);
    } catch (error) {
      throw new Error('Error creating image');
    }
  }

  async update(id: number, data: { url?: string }) { // Cambiado de string a number
    try {
      const imagen = await prisma.imagen.update({ where: { id: BigInt(id) }, data });
      return transformBigInt(imagen);
    } catch (error) {
      throw new Error('Error updating image');
    }
  }

  async delete(id: number) { // Cambiado de string a number
    try {
      const imagen = await prisma.imagen.delete({ where: { id: BigInt(id) } });
      return transformBigInt(imagen);
    } catch (error) {
      throw new Error('Error deleting image');
    }
  }
}