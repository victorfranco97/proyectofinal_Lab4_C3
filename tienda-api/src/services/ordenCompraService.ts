import { PrismaClient, Orden_Compra as PrismaOrden_Compra, Prisma } from '@prisma/client';
import { transformBigInt } from '../utils/prismaUtils';

const prisma = new PrismaClient();

export class OrdenCompraService {
  async create(data: { id_usuario_direccion: number; total: number; fecha: string }): Promise<any> {
    try {
      console.log('Creating orden_compra with data:', data);
      const ordenCompra = await prisma.orden_Compra.create({
        data: {
          id_usuario_direccion: BigInt(data.id_usuario_direccion),
          total: data.total,
          fecha: data.fecha ? new Date(data.fecha) : new Date(), // Compatible con DateTime
        } as Prisma.Orden_CompraCreateInput, // Forzamos el tipo correcto
      });
      console.log('Orden_Compra created:', ordenCompra);
      const transformed = transformBigInt(ordenCompra);
      console.log('Transformed result:', transformed);
      return transformed;
    } catch (error) {
      console.error('Error creating orden_compra:', error);
      throw new Error('Error creating orden_compra: ' + (error as Error).message);
    }
  }

  async getAll(): Promise<any> {
    try {
      const ordenes = await prisma.orden_Compra.findMany({ include: { usuario_direccion: true } });
      return transformBigInt(ordenes);
    } catch (error) {
      throw new Error('Error fetching ordenes: ' + (error as Error).message);
    }
  }

  async getById(id: number): Promise<any> {
    try {
      const orden = await prisma.orden_Compra.findUnique({ where: { id: BigInt(id) }, include: { usuario_direccion: true } });
      if (!orden) throw new Error('Orden_Compra not found');
      return transformBigInt(orden);
    } catch (error) {
      throw new Error('Error fetching orden: ' + (error as Error).message);
    }
  }

  async update(id: number, data: { id_usuario_direccion?: number; total?: number; fecha?: string }): Promise<any> {
    try {
      const updateData = {};
      if (data.id_usuario_direccion !== undefined) updateData['id_usuario_direccion'] = BigInt(data.id_usuario_direccion);
      if (data.total !== undefined) updateData['total'] = data.total;
      if (data.fecha !== undefined) updateData['fecha'] = new Date(data.fecha);
      if (Object.keys(updateData).length === 0) {
        throw new Error('No valid fields to update');
      }
      const orden = await prisma.orden_Compra.update({
        where: { id: BigInt(id) },
        data: updateData as Prisma.Orden_CompraUpdateInput,
      });
      if (!orden) throw new Error('Orden_Compra not found');
      return transformBigInt(orden);
    } catch (error) {
      throw new Error('Error updating orden: ' + (error as Error).message);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await prisma.orden_Compra.delete({ where: { id: BigInt(id) } });
    } catch (error) {
      throw new Error('Error deleting orden: ' + (error as Error).message);
    }
  }
}