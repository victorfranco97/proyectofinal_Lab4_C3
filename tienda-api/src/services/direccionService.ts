import { PrismaClient, Direccion as PrismaDireccion } from '@prisma/client';
import { transformBigInt } from '../utils/prismaUtils';

const prisma = new PrismaClient();

export class DireccionService {
  async create(data: { departamento: string; localidad: string; provincia: string; pais: string }): Promise<any> {
    try {
      const direccion = await prisma.direccion.create({ data });
      return transformBigInt(direccion);
    } catch (error) {
      throw new Error('Error creating direccion: ' + (error as Error).message);
    }
  }

  async getAll(): Promise<any> {
    try {
      const direcciones = await prisma.direccion.findMany();
      return transformBigInt(direcciones);
    } catch (error) {
      throw new Error('Error fetching direcciones: ' + (error as Error).message);
    }
  }

  async getById(id: number): Promise<any> {
    try {
      const direccion = await prisma.direccion.findUnique({ where: { id: BigInt(id) } });
      if (!direccion) throw new Error('Direccion not found');
      return transformBigInt(direccion);
    } catch (error) {
      throw new Error('Error fetching direccion: ' + (error as Error).message);
    }
  }

  async update(id: number, data: { departamento?: string; localidad?: string; provincia?: string; pais?: string }): Promise<any> {
    try {
      const direccion = await prisma.direccion.update({ where: { id: BigInt(id) }, data });
      if (!direccion) throw new Error('Direccion not found');
      return transformBigInt(direccion);
    } catch (error) {
      throw new Error('Error updating direccion: ' + (error as Error).message);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await prisma.direccion.delete({ where: { id: BigInt(id) } });
    } catch (error) {
      throw new Error('Error deleting direccion: ' + (error as Error).message);
    }
  }
}