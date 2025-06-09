import { PrismaClient } from '@prisma/client';
import { transformBigInt } from '../utils/prismaUtils';
import { SoftDeleteService } from '../utils/softDeleteUtils';

const prisma = new PrismaClient();

export class ImagenService extends SoftDeleteService<any> {
  constructor() {
    super(prisma, 'imagen');
  } async getAll() {
    try {
      const imagenes = await this.findManyWithSoftDelete({
        include: { orden_detalles: true }
      });
      return transformBigInt(imagenes);
    } catch (error) {
      throw new Error('Error fetching images');
    }
  }

  async getById(id: bigint) {
    try {
      const imagen = await this.findUniqueWithSoftDelete(id, {
        include: { orden_detalles: true }
      });
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
  async update(id: bigint, data: { url?: string }) {
    try {
      // First check if the record exists and is not deleted
      const existingImagen = await this.findUniqueWithSoftDelete(id);
      if (!existingImagen) {
        throw new Error('Image not found or has been deleted');
      }

      const imagen = await prisma.imagen.update({ where: { id: id }, data });
      return transformBigInt(imagen);
    } catch (error) {
      throw new Error('Error updating image');
    }
  }

  async delete(id: bigint) {
    try {
      const result = await this.softDelete(id);
      return transformBigInt(result);
    } catch (error) {
      throw new Error('Error deleting image');
    }
  }

  async restore(id: bigint): Promise<any> {
    try {
      const result = await super.restore(id);
      return transformBigInt(result);
    } catch (error) {
      throw new Error('Error restoring image');
    }
  }

  async permanentDelete(id: bigint): Promise<void> {
    try {
      await prisma.imagen.delete({ where: { id } });
    } catch (error) {
      throw new Error('Error permanently deleting image');
    }
  }

  async getAllDeleted(): Promise<any> {
    try {
      // Using raw query as workaround for Prisma client type issues
      const deletedImagenes = await prisma.$queryRaw`
        SELECT * FROM "Imagen" 
        WHERE is_deleted = true
      `;
      return transformBigInt(deletedImagenes);
    } catch (error) {
      throw new Error('Error fetching deleted images');
    }
  }
}