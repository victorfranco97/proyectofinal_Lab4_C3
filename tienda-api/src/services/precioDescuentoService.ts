import { PrismaClient } from '@prisma/client';
import { transformBigInt } from '../utils/prismaUtils';
import { SoftDeleteService } from '../utils/softDeleteUtils';

const prisma = new PrismaClient();

export class PrecioDescuentoService extends SoftDeleteService<any> {
  constructor() {
    super(prisma, 'precio_Descuento');
  } async getAll() {
    try {
      const precioDescuentos = await this.findManyWithSoftDelete({
        include: { descuento: true, precio: true, orden_detalles: true }
      });
      return transformBigInt(precioDescuentos);
    } catch (error) {
      throw new Error('Error fetching precio descuentos');
    }
  }

  async getById(id: bigint) {
    try {
      const precioDescuento = await this.findUniqueWithSoftDelete(id, {
        include: { descuento: true, precio: true, orden_detalles: true }
      });
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
  async update(id: bigint, data: { descuento_id?: number; precio_id?: number }) {
    try {
      // First check if the record exists and is not deleted
      const existingPrecioDescuento = await this.findUniqueWithSoftDelete(id);
      if (!existingPrecioDescuento) {
        throw new Error('Precio Descuento not found or has been deleted');
      }

      const precio_descuento = await prisma.precio_Descuento.update({ where: { id: id }, data });
      return transformBigInt(precio_descuento);
    } catch (error) {
      throw new Error('Error updating precio descuento');
    }
  }

  async delete(id: bigint) {
    try {
      const result = await this.softDelete(id);
      return transformBigInt(result);
    } catch (error) {
      throw new Error('Error deleting precio descuento');
    }
  }

  async restore(id: bigint): Promise<any> {
    try {
      const result = await super.restore(id);
      return transformBigInt(result);
    } catch (error) {
      throw new Error('Error restoring precio descuento');
    }
  }

  async permanentDelete(id: bigint): Promise<void> {
    try {
      await prisma.precio_Descuento.delete({ where: { id } });
    } catch (error) {
      throw new Error('Error permanently deleting precio descuento');
    }
  }

  async getAllDeleted(): Promise<any> {
    try {
      // Using raw query as workaround for Prisma client type issues
      const deletedPrecioDescuentos = await prisma.$queryRaw`
        SELECT * FROM "Precio_Descuento" 
        WHERE is_deleted = true
      `;
      return transformBigInt(deletedPrecioDescuentos);
    } catch (error) {
      throw new Error('Error fetching deleted precio descuentos');
    }
  }
}