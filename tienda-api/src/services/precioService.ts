import { PrismaClient } from '@prisma/client';
import { transformBigInt } from '../utils/prismaUtils';
import { SoftDeleteService } from '../utils/softDeleteUtils';

const prisma = new PrismaClient();

export class PrecioService extends SoftDeleteService<any> {
  constructor() {
    super(prisma, 'precio');
  } async getAll() {
    try {
      const precios = await this.findManyWithSoftDelete({
        include: { precio_descuentos: true }
      });
      return transformBigInt(precios);
    } catch (error) {
      throw new Error('Error fetching precios');
    }
  }
  async getById(id: bigint) {
    try {
      const precio = await this.findUniqueWithSoftDelete(id, {
        include: { precio_descuentos: true }
      });
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
  async update(id: bigint, data: { precio_compra?: number; precio_venta?: number }) {
    try {
      // First check if the record exists and is not deleted
      const existingPrecio = await this.findUniqueWithSoftDelete(id);
      if (!existingPrecio) {
        throw new Error('Precio not found or has been deleted');
      }

      const precio = await prisma.precio.update({
        where: { id: id },
        data
      });
      return transformBigInt(precio);
    } catch (error) {
      throw new Error('Error updating precio');
    }
  }
  async delete(id: bigint) {
    try {
      const result = await this.softDelete(id);
      return transformBigInt(result);
    } catch (error) {
      throw new Error('Error deleting precio');
    }
  }

  async restore(id: bigint): Promise<any> {
    try {
      const result = await super.restore(id);
      return transformBigInt(result);
    } catch (error) {
      throw new Error('Error restoring precio');
    }
  }

  async permanentDelete(id: bigint): Promise<void> {
    try {
      await prisma.precio.delete({ where: { id } });
    } catch (error) {
      throw new Error('Error permanently deleting precio');
    }
  }

  async getAllDeleted(): Promise<any> {
    try {
      // Using raw query as workaround for Prisma client type issues
      const deletedPrecios = await prisma.$queryRaw`
        SELECT * FROM "Precio" 
        WHERE is_deleted = true
      `;
      return transformBigInt(deletedPrecios);
    } catch (error) {
      throw new Error('Error fetching deleted precios');
    }
  }
}