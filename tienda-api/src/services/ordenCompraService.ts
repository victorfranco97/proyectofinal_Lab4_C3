import { Prisma, PrismaClient, Orden_Compra as PrismaOrden_Compra } from '@prisma/client';
import { transformBigInt } from '../utils/prismaUtils';
import { SoftDeleteOptions, SoftDeleteService, SoftDeleteUtils } from '../utils/softDeleteUtils';

const prisma = new PrismaClient();

export class OrdenCompraService extends SoftDeleteService<PrismaOrden_Compra> {
  constructor() {
    super(prisma, 'orden_Compra');
  }
  async create(data: { id_usuario_direccion: number; total: number; fecha_compra: string }): Promise<any> {
    try {
      console.log('Creating orden_compra with data:', data);
      const ordenCompra = await prisma.orden_Compra.create({
        data: {
          total: data.total,
          fecha_compra: data.fecha_compra ? new Date(data.fecha_compra) : new Date(),
          usuario_direccion: { connect: { id: BigInt(data.id_usuario_direccion) } },
        },
        include: { usuario_direccion: true }, // Incluir la relación en la respuesta
      });
      console.log('Orden_Compra created:', ordenCompra);
      // Convertir fecha_compra a string antes de transformBigInt
      const ordenCompraWithStringDate = {
        ...ordenCompra,
        fecha_compra: ordenCompra.fecha_compra ? ordenCompra.fecha_compra.toISOString() : new Date().toISOString(),
      };
      const transformed = transformBigInt(ordenCompraWithStringDate);
      console.log('Transformed result:', transformed);
      return transformed;
    } catch (error) {
      console.error('Error creating orden_compra:', error);
      throw new Error('Error creating orden_compra: ' + (error as Error).message);
    }
  }
  async getAll(options: SoftDeleteOptions = {}): Promise<any> {
    try {
      const ordenes = await this.findManyWithSoftDelete({
        include: {
          usuario_direccion: {
            where: SoftDeleteUtils.getActiveFilter()
          }
        },
        softDeleteOptions: options
      });
      return transformBigInt(ordenes);
    } catch (error) {
      throw new Error('Error fetching ordenes: ' + (error as Error).message);
    }
  } async getById(id: bigint, options: SoftDeleteOptions = {}): Promise<any> {
    try {
      console.log('Fetching orden with id:', id, 'as BigInt:', BigInt(id));
      const orden = await this.findUniqueWithSoftDelete(BigInt(id), {
        include: {
          usuario_direccion: {
            where: SoftDeleteUtils.getActiveFilter()
          }
        },
        softDeleteOptions: options
      });
      if (!orden) {
        throw new Error('Orden_Compra not found');
      }
      const ordenWithStringDate = {
        ...orden,
        fecha_compra: orden.fecha_compra ? orden.fecha_compra.toISOString() : new Date().toISOString(),
      };
      return transformBigInt(ordenWithStringDate);
    } catch (error) {
      console.error('Error fetching orden:', error);
      if ((error as Error).message === 'Orden_Compra not found') {
        throw new Error('Orden_Compra not found');
      }
      throw new Error('Error fetching orden: ' + (error as Error).message);
    }
  }
  async update(id: bigint, data: { id_usuario_direccion?: number; total?: number; fecha_compra?: string }): Promise<any> {
    try {
      const updateData: Partial<Prisma.Orden_CompraUpdateInput> = {};
      if (data.id_usuario_direccion !== undefined) {
        updateData['usuario_direccion'] = { connect: { id: BigInt(data.id_usuario_direccion) } };
      }
      if (data.total !== undefined) updateData['total'] = data.total;
      if (data.fecha_compra !== undefined) updateData['fecha_compra'] = new Date(data.fecha_compra);
      if (Object.keys(updateData).length === 0) {
        throw new Error('No valid fields to update');
      }
      const orden = await prisma.orden_Compra.update({
        where: {
          id: BigInt(id),
          ...SoftDeleteUtils.getActiveFilter()
        },
        data: updateData,
        include: { usuario_direccion: true },
      });
      if (!orden) throw new Error('Orden_Compra not found');
      const ordenWithStringDate = {
        ...orden,
        fecha_compra: orden.fecha_compra ? orden.fecha_compra.toISOString() : new Date().toISOString(),
      };
      return transformBigInt(ordenWithStringDate);
    } catch (error) {
      throw new Error('Error updating orden: ' + (error as Error).message);
    }
  }

  async delete(id: bigint): Promise<PrismaOrden_Compra> {
    try {
      const orden = await this.softDelete(BigInt(id));
      return transformBigInt(orden);
    } catch (error) {
      throw new Error('Error deleting orden: ' + (error as Error).message);
    }
  }

  async restore(id: bigint): Promise<PrismaOrden_Compra> {
    try {
      const orden = await super.restore(id);
      return transformBigInt(orden);
    } catch (error) {
      throw new Error('Error restoring orden');
    }
  }

  async permanentDelete(id: number): Promise<void> {
    try {
      await prisma.orden_Compra.delete({ where: { id: BigInt(id) } });
    } catch (error) {
      throw new Error('Error permanently deleting orden: ' + (error as Error).message);
    }
  }
}