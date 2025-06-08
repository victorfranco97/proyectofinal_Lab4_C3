import { PrismaClient } from '@prisma/client';
import { transformBigInt } from '../utils/prismaUtils';
const prisma = new PrismaClient();

export class ProductoService {
  async getAll() {
    try {
      const products = await prisma.producto.findMany({ include: { categoria: true } });
      return transformBigInt(products);
    } catch (error) {
      throw new Error('Error fetching products');
    }
  }

  async getById(id: number) {
    try {
      const product = await prisma.producto.findUnique({ where: { id: BigInt(id) }, include: { categoria: true } });
      if (!product) throw new Error('Product not found');
      return transformBigInt(product);
    } catch (error) {
      throw error;
    }
  }

  async create(data: { categoria_id: number; nombre: string; sexo: string }) {
    try {
      const product = await prisma.producto.create({ data });
      return transformBigInt(product);
    } catch (error) {
      throw new Error('Error creating product');
    }
  }

  async update(id: number, data: { categoria_id?: number; nombre?: string; sexo?: string }) {
    try {
      const product = await prisma.producto.update({ where: { id: BigInt(id) }, data });
      return transformBigInt(product);
    } catch (error) {
      throw new Error('Error updating product');
    }
  }

  async delete(id: number) {
    try {
      const product = await prisma.producto.delete({ where: { id: BigInt(id) } });
      return transformBigInt(product);
    } catch (error) {
      throw new Error('Error deleting product');
    }
  }
}