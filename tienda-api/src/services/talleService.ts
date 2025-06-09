import { PrismaClient } from '@prisma/client';
import { transformBigInt } from '../utils/prismaUtils';
import { SoftDeleteService } from '../utils/softDeleteUtils';

const prisma = new PrismaClient();

export class TalleService extends SoftDeleteService<any> {
  constructor() {
    super(prisma, 'talle');
  } async getAll() {
    try {
      const talles = await this.findManyWithSoftDelete({
        include: { detalles: true }
      });
      return transformBigInt(talles);
    } catch (error) {
      throw new Error('Error fetching talles');
    }
  } async getById(id: bigint) {
    try {
      const talle = await this.findUniqueWithSoftDelete(id, {
        include: { detalles: true }
      });
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
  } async update(id: bigint, data: { numero?: string }) {
    try {
      // First check if the record exists and is not deleted
      const existingTalle = await this.findUniqueWithSoftDelete(id);
      if (!existingTalle) {
        throw new Error('Talle not found or has been deleted');
      }

      const talle = await prisma.talle.update({
        where: { id: id },
        data
      });
      return transformBigInt(talle);
    } catch (error) {
      throw new Error('Error updating talle');
    }
  } async delete(id: bigint) {
    try {
      const result = await this.softDelete(id);
      return transformBigInt(result);
    } catch (error) {
      throw new Error('Error deleting talle');
    }
  }

  async restore(id: bigint): Promise<any> {
    try {
      const result = await super.restore(id);
      return transformBigInt(result);
    } catch (error) {
      throw new Error('Error restoring talle');
    }
  }

  async permanentDelete(id: bigint) {
    try {
      const talle = await prisma.talle.delete({ where: { id: id } });
      return transformBigInt(talle);
    } catch (error) {
      throw new Error('Error permanently deleting talle');
    }
  }
  async getAllDeleted() {
    try {
      // Using raw query as workaround for Prisma client type issues
      const talles = await prisma.$queryRaw`
        SELECT * FROM "Talle" 
        WHERE is_deleted = true
      `;
      return transformBigInt(talles);
    } catch (error) {
      throw new Error('Error fetching deleted talles');
    }
  }
}