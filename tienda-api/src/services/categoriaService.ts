import { PrismaClient } from '@prisma/client';
import { transformBigInt } from '../utils/prismaUtils';
const prisma = new PrismaClient();

export class CategoriaService {
  async getAll() {
    try {
      const category = await prisma.categoria.findMany({ include: { productos: true } });
      return transformBigInt(category);
    } catch (error) {
      throw new Error('Error fetching categories');
    }
  }

  async getById(id: number) { // Cambiado de string a number
    try {
      const category = await prisma.categoria.findUnique({ where: { id: BigInt(id) }, include: { productos: true } });
      if (!category) throw new Error('Category not found');
      return transformBigInt(category);
    } catch (error) {
      throw error;
    }
  }

  async create(data: { nombre: string }) {
    try {
      const category = await prisma.categoria.create({ data });
      return transformBigInt(category);
    } catch (error) {
      throw new Error('Error creating category');
    }
  }

  async update(id: number, data: { nombre?: string }) { // Cambiado de string a number
    try {
      const category = await prisma.categoria.update({ where: { id: BigInt(id) }, data });
      return transformBigInt(category);
    } catch (error) {
      throw new Error('Error updating category');
    }
  }

  async delete(id: number) { // Cambiado de string a number
    try {
      const category = await prisma.categoria.delete({ where: { id: BigInt(id) } });
      return transformBigInt(category);
    } catch (error) {
      throw new Error('Error deleting category');
    }
  }
}