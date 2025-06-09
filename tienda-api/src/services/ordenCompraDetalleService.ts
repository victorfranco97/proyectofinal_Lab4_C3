import { Orden_Compra_Detalle, PrismaClient } from '@prisma/client';

export class OrdenCompraDetalleService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAll(): Promise<Orden_Compra_Detalle[]> {
    return this.prisma.orden_Compra_Detalle.findMany({
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
  }

  async getById(id: bigint): Promise<Orden_Compra_Detalle | null> {
    return this.prisma.orden_Compra_Detalle.findUnique({
      where: { id },
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
  }

  async create(data: {
    id_orden_compra: string;
    id_producto: string;
    id_talle: string;
    id_precio_descuento: string;
    id_imagen: string;
    detalle?: boolean;
  }): Promise<Orden_Compra_Detalle> {
    return this.prisma.orden_Compra_Detalle.create({
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
  }

  async update(id: bigint, data: {
    id_orden_compra?: string;
    id_producto?: string;
    id_talle?: string;
    id_precio_descuento?: string;
    id_imagen?: string;
    detalle?: boolean;
  }): Promise<Orden_Compra_Detalle> {
    const updateData: any = {};

    if (data.id_orden_compra !== undefined) updateData.id_orden_compra = BigInt(data.id_orden_compra);
    if (data.id_producto !== undefined) updateData.id_producto = BigInt(data.id_producto);
    if (data.id_talle !== undefined) updateData.id_talle = BigInt(data.id_talle);
    if (data.id_precio_descuento !== undefined) updateData.id_precio_descuento = BigInt(data.id_precio_descuento);
    if (data.id_imagen !== undefined) updateData.id_imagen = BigInt(data.id_imagen);
    if (data.detalle !== undefined) updateData.detalle = data.detalle;

    return this.prisma.orden_Compra_Detalle.update({
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
  }

  async delete(id: bigint): Promise<void> {
    await this.prisma.orden_Compra_Detalle.delete({
      where: { id }
    });
  }
}
