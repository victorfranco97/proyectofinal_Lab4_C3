import { Orden_Compra_Detalle, PrismaClient } from '@prisma/client';
import { transformBigInt } from '../utils/prismaUtils';
import { SoftDeleteService } from '../utils/softDeleteUtils';

const prisma = new PrismaClient();

export class OrdenCompraDetalleService extends SoftDeleteService<Orden_Compra_Detalle> {
  constructor() {
    super(prisma, 'orden_Compra_Detalle');
  } async getAll(): Promise<any[]> {
    const detalles = await this.findManyWithSoftDelete({
      include: {
        orden_compra: {
          include: {
            usuario_direccion: {
              include: {
                usuario: true,
                direccion: true
              }
            }
          }
        },
        producto: {
          include: {
            categoria: true
          }
        },
        talle: true,
        precio_descuento: {
          include: {
            precio: true,
            descuento: true
          }
        },
        imagen: true
      }
    });
    return transformBigInt(detalles);
  }
  async getById(id: bigint): Promise<any | null> {
    const detalle = await this.findUniqueWithSoftDelete(id, {
      include: {
        orden_compra: {
          include: {
            usuario_direccion: {
              include: {
                usuario: true,
                direccion: true
              }
            }
          }
        },
        producto: {
          include: {
            categoria: true
          }
        },
        talle: true,
        precio_descuento: {
          include: {
            precio: true,
            descuento: true
          }
        },
        imagen: true
      }
    });
    return detalle ? transformBigInt(detalle) : null;
  }
  async create(data: {
    id_orden_compra: string;
    id_producto: string;
    id_talle: string;
    id_precio_descuento: string;
    id_imagen: string;
    detalle?: boolean;
  }): Promise<any> {
    const detalle = await prisma.orden_Compra_Detalle.create({
      data: {
        id_orden_compra: BigInt(data.id_orden_compra),
        id_producto: BigInt(data.id_producto),
        id_talle: BigInt(data.id_talle),
        id_precio_descuento: BigInt(data.id_precio_descuento),
        id_imagen: BigInt(data.id_imagen),
        detalle: data.detalle || false
      },
      include: {
        orden_compra: true,
        producto: true,
        talle: true,
        precio_descuento: true,
        imagen: true
      }
    });
    return transformBigInt(detalle);
  } async update(id: bigint, data: {
    id_orden_compra?: string;
    id_producto?: string;
    id_talle?: string;
    id_precio_descuento?: string;
    id_imagen?: string;
    detalle?: boolean;
  }): Promise<any> {
    // First check if the record exists and is not deleted
    const existingDetalle = await this.findUniqueWithSoftDelete(id);
    if (!existingDetalle) {
      throw new Error('Orden Compra Detalle not found or has been deleted');
    }

    const updateData: any = {};

    if (data.id_orden_compra !== undefined) updateData.id_orden_compra = BigInt(data.id_orden_compra);
    if (data.id_producto !== undefined) updateData.id_producto = BigInt(data.id_producto);
    if (data.id_talle !== undefined) updateData.id_talle = BigInt(data.id_talle);
    if (data.id_precio_descuento !== undefined) updateData.id_precio_descuento = BigInt(data.id_precio_descuento);
    if (data.id_imagen !== undefined) updateData.id_imagen = BigInt(data.id_imagen);
    if (data.detalle !== undefined) updateData.detalle = data.detalle;

    const detalle = await prisma.orden_Compra_Detalle.update({
      where: { id },
      data: updateData,
      include: {
        orden_compra: true,
        producto: true,
        talle: true,
        precio_descuento: true,
        imagen: true
      }
    });
    return transformBigInt(detalle);
  }

  async delete(id: bigint): Promise<any> {
    const result = await this.softDelete(id);
    return transformBigInt(result);
  }

  async restore(id: bigint): Promise<any> {
    const result = await super.restore(id);
    return transformBigInt(result);
  }

  async permanentDelete(id: bigint): Promise<void> {
    await prisma.orden_Compra_Detalle.delete({ where: { id } });
  }

  async getAllDeleted(): Promise<any[]> {
    // Using raw query as workaround for Prisma client type issues
    const deletedDetalles = await prisma.$queryRaw`
      SELECT * FROM "Orden_Compra_Detalle" 
      WHERE is_deleted = true
    `;
    return transformBigInt(deletedDetalles);
  }
}
