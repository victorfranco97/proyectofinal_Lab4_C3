import { Categoria, PrismaClient } from '@prisma/client';
import { transformBigInt } from '../utils/prismaUtils';
import { SoftDeleteOptions, SoftDeleteService, SoftDeleteUtils } from '../utils/softDeleteUtils';

const prisma = new PrismaClient();

export class CategoriaService extends SoftDeleteService<Categoria> {
  constructor() {
    super(prisma, 'categoria');
  }

  async getAll(options: SoftDeleteOptions = {}) {
    try {
      const categorias = await this.findManyWithSoftDelete({
        include: {
          productos: {
            where: SoftDeleteUtils.getActiveFilter()
          }
        },
        softDeleteOptions: options
      });
      return transformBigInt(categorias);
    } catch (error) {
      throw new Error('Error fetching categories');
    }
  }

  async getById(id: bigint, options: SoftDeleteOptions = {}) {
    try {
      const categoria = await this.findUniqueWithSoftDelete(BigInt(id), {
        include: {
          productos: {
            where: SoftDeleteUtils.getActiveFilter()
          }
        },
        softDeleteOptions: options
      });
      if (!categoria) throw new Error('Category not found');
      return transformBigInt(categoria);
    } catch (error) {
      throw error;
    }
  }

  async create(data: { nombre: string }) {
    try {
      const categoria = await prisma.categoria.create({ data });
      return transformBigInt(categoria);
    } catch (error) {
      throw new Error('Error creating category');
    }
  }

  async update(id: bigint, data: { nombre?: string }) {
    try {
      const categoria = await prisma.categoria.update({
        where: {
          id: BigInt(id),
          ...SoftDeleteUtils.getActiveFilter()
        },
        data
      });
      return transformBigInt(categoria);
    } catch (error) {
      throw new Error('Error updating category');
    }
  }

  async delete(id: bigint) {
    try {
      // Baja lógica
      const categoria = await this.softDelete(BigInt(id));
      return transformBigInt(categoria);
    } catch (error) {
      throw new Error('Error deleting category');
    }
  } async restore(id: bigint): Promise<Categoria> {
    try {
      const categoria = await super.restore(id);
      return transformBigInt(categoria);
    } catch (error) {
      throw new Error('Error restoring category');
    }
  }

  async permanentDelete(id: number) {
    try {
      const categoria = await prisma.categoria.delete({ where: { id: BigInt(id) } });
      return transformBigInt(categoria);
    } catch (error) {
      throw new Error('Error permanently deleting category');
    }
  }
}