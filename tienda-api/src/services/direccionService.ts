import { PrismaClient, Direccion as PrismaDireccion } from '@prisma/client';
import { transformBigInt } from '../utils/prismaUtils';
import { SoftDeleteOptions, SoftDeleteService, SoftDeleteUtils } from '../utils/softDeleteUtils';

const prisma = new PrismaClient();

export class DireccionService extends SoftDeleteService<PrismaDireccion> {
  constructor() {
    super(prisma, 'direccion');
  }

  async create(data: { departamento: string; localidad: string; provincia: string; pais: string }): Promise<any> {
    try {
      const direccion = await prisma.direccion.create({ data });
      return transformBigInt(direccion);
    } catch (error) {
      throw new Error('Error creating direccion: ' + (error as Error).message);
    }
  }

  async getAll(options: SoftDeleteOptions = {}): Promise<any> {
    try {
      const direcciones = await this.findManyWithSoftDelete({
        softDeleteOptions: options
      });
      return transformBigInt(direcciones);
    } catch (error) {
      throw new Error('Error fetching direcciones: ' + (error as Error).message);
    }
  }
  async getById(id: bigint, options: SoftDeleteOptions = {}): Promise<any> {
    try {
      const direccion = await this.findUniqueWithSoftDelete(BigInt(id), {
        softDeleteOptions: options
      });
      if (!direccion) throw new Error('Direccion not found');
      return transformBigInt(direccion);
    } catch (error) {
      throw new Error('Error fetching direccion: ' + (error as Error).message);
    }
  }

  async update(id: bigint, data: { departamento?: string; localidad?: string; provincia?: string; pais?: string }): Promise<any> {
    try {
      const direccion = await prisma.direccion.update({
        where: {
          id: BigInt(id),
          ...SoftDeleteUtils.getActiveFilter()
        },
        data
      });
      if (!direccion) throw new Error('Direccion not found');
      return transformBigInt(direccion);
    } catch (error) {
      throw new Error('Error updating direccion: ' + (error as Error).message);
    }
  }

  async delete(id: bigint): Promise<PrismaDireccion> {
    try {
      const direccion = await this.softDelete(BigInt(id));
      return transformBigInt(direccion);
    } catch (error) {
      throw new Error('Error deleting direccion: ' + (error as Error).message);
    }
  }

  async restore(id: bigint): Promise<PrismaDireccion> {
    try {
      const direccion = await super.restore(id);
      return transformBigInt(direccion);
    } catch (error) {
      throw new Error('Error restoring direccion');
    }
  }
  async permanentDelete(id: number): Promise<void> {
    try {
      await prisma.direccion.delete({ where: { id: BigInt(id) } });
    } catch (error) {
      throw new Error('Error permanently deleting direccion: ' + (error as Error).message);
    }
  }
}