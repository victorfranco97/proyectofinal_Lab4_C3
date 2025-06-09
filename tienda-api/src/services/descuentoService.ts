import { PrismaClient } from '@prisma/client';
import { transformBigInt } from '../utils/prismaUtils';
import { SoftDeleteService } from '../utils/softDeleteUtils';

const prisma = new PrismaClient();

export class DescuentoService extends SoftDeleteService<any> {
  constructor() {
    super(prisma, 'descuento');
  } async getAll() {
    try {
      const descuentos = await this.findManyWithSoftDelete({
        include: { precio_descuentos: true }
      });
      return transformBigInt(descuentos);
    } catch (error) {
      throw new Error('Error fetching descuentos');
    }
  }

  async getById(id: bigint) {
    try {
      const descuento = await this.findUniqueWithSoftDelete(id, {
        include: { precio_descuentos: true }
      });
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
  async update(id: bigint, data: { fecha_final?: Date; fecha_inicio?: Date; porcentaje?: string }) {
    try {
      // First check if the record exists and is not deleted
      const existingDescuento = await this.findUniqueWithSoftDelete(id);
      if (!existingDescuento) {
        throw new Error('Descuento not found or has been deleted');
      }

      const descuento = await prisma.descuento.update({ where: { id: id }, data });
      return transformBigInt(descuento);
    } catch (error) {
      throw new Error('Error updating descuento');
    }
  }

  async delete(id: bigint) {
    try {
      const result = await this.softDelete(id);
      return transformBigInt(result);
    } catch (error) {
      throw new Error('Error deleting descuento');
    }
  }

  async restore(id: bigint): Promise<any> {
    try {
      const result = await super.restore(id);
      return transformBigInt(result);
    } catch (error) {
      throw new Error('Error restoring descuento');
    }
  }

  async permanentDelete(id: bigint): Promise<void> {
    try {
      await prisma.descuento.delete({ where: { id } });
    } catch (error) {
      throw new Error('Error permanently deleting descuento');
    }
  }

  async getAllDeleted(): Promise<any> {
    try {
      // Using raw query as workaround for Prisma client type issues
      const deletedDescuentos = await prisma.$queryRaw`
        SELECT * FROM "Descuento" 
        WHERE is_deleted = true
      `;
      return transformBigInt(deletedDescuentos);
    } catch (error) {
      throw new Error('Error fetching deleted descuentos');
    }
  }
}