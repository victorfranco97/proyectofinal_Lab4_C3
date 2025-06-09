import { PrismaClient, Producto } from '@prisma/client';
import { transformBigInt } from '../utils/prismaUtils';
import { SoftDeleteOptions, SoftDeleteService, SoftDeleteUtils } from '../utils/softDeleteUtils';

const prisma = new PrismaClient();

export class ProductoService extends SoftDeleteService<Producto> {
  constructor() {
    super(prisma, 'producto');
  }

  async getAll(options: SoftDeleteOptions = {}) {
    try {
      const products = await this.findManyWithSoftDelete({
        include: {
          categoria: {
            where: SoftDeleteUtils.getActiveFilter()
          }
        },
        softDeleteOptions: options
      });
      return transformBigInt(products);
    } catch (error) {
      throw new Error('Error fetching products');
    }
  }
  async getById(id: bigint, options: SoftDeleteOptions = {}) {
    try {
      const product = await this.findUniqueWithSoftDelete(BigInt(id), {
        include: {
          categoria: {
            where: SoftDeleteUtils.getActiveFilter()
          }
        },
        softDeleteOptions: options
      });
      if (!product) throw new Error('Product not found');
      return transformBigInt(product);
    } catch (error) {
      throw error;
    }
  }
  async create(data: { categoria_id: number; nombre: string; sexo: string }) {
    try {
      const product = await prisma.producto.create({
        data: {
          ...data,
          categoria_id: BigInt(data.categoria_id)
        }
      });
      return transformBigInt(product);
    } catch (error) {
      throw new Error('Error creating product');
    }
  }
  async update(id: bigint, data: { categoria_id?: number; nombre?: string; sexo?: string }) {
    try {
      const updateData: any = { ...data };
      if (data.categoria_id) {
        updateData.categoria_id = BigInt(data.categoria_id);
      }

      const product = await prisma.producto.update({
        where: {
          id: BigInt(id),
          ...SoftDeleteUtils.getActiveFilter()
        },
        data: updateData
      });
      return transformBigInt(product);
    } catch (error) {
      throw new Error('Error updating product');
    }
  }

  async delete(id: bigint) {
    try {
      const product = await this.softDelete(BigInt(id));
      return transformBigInt(product);
    } catch (error) {
      throw new Error('Error deleting product');
    }
  }

  async restore(id: bigint): Promise<Producto> {
    try {
      const product = await super.restore(id);
      return transformBigInt(product);
    } catch (error) {
      throw new Error('Error restoring product');
    }
  }

  async permanentDelete(id: number) {
    try {
      const product = await prisma.producto.delete({ where: { id: BigInt(id) } });
      return transformBigInt(product);
    } catch (error) {
      throw new Error('Error permanently deleting product');
    }
  }
}