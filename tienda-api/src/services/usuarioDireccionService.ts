import { PrismaClient, Usuario_Direccion as PrismaUsuario_Direccion } from '@prisma/client';
import { transformBigInt } from '../utils/prismaUtils';
import { SoftDeleteService } from '../utils/softDeleteUtils';

const prisma = new PrismaClient();

export class UsuarioDireccionService extends SoftDeleteService<PrismaUsuario_Direccion> {
  constructor() {
    super(prisma, 'usuario_Direccion');
  } async create(data: { usuario_id: number; direccion_id: number }): Promise<any> {
    try {
      console.log('Creating usuario_direccion with data:', data);
      const usuarioDireccion = await this.getModel().create({
        data: {
          usuario_id: BigInt(data.usuario_id),
          direccion_id: BigInt(data.direccion_id),
        },
      });
      console.log('Usuario_Direccion created:', usuarioDireccion);
      const transformed = transformBigInt(usuarioDireccion);
      console.log('Transformed result:', transformed);
      return transformed;
    } catch (error) {
      console.error('Error creating usuario_direccion:', error);
      throw new Error('Error creating usuario_direccion: ' + (error as Error).message);
    }
  }
  async getAll(): Promise<any> {
    try {
      const usuarioDirecciones = await this.findManyWithSoftDelete({
        include: {
          usuario: true,
          direccion: true
        }
      });
      return transformBigInt(usuarioDirecciones);
    } catch (error) {
      throw new Error('Error fetching usuario_direcciones: ' + (error as Error).message);
    }
  }

  async getById(id: bigint): Promise<any> {
    try {
      const usuarioDireccion = await this.findUniqueWithSoftDelete(id, {
        include: {
          usuario: true,
          direccion: true
        }
      });
      if (!usuarioDireccion) throw new Error('Usuario_Direccion not found');
      return transformBigInt(usuarioDireccion);
    } catch (error) {
      throw new Error('Error fetching usuario_direccion: ' + (error as Error).message);
    }
  }

  async update(id: bigint, data: { usuario_id?: number; direccion_id?: number }): Promise<any> {
    try {
      const updateData: { [key: string]: any } = {};
      if (data.usuario_id !== undefined) updateData['usuario_id'] = BigInt(data.usuario_id);
      if (data.direccion_id !== undefined) updateData['direccion_id'] = BigInt(data.direccion_id);
      if (Object.keys(updateData).length === 0) {
        throw new Error('No valid fields to update');
      }
      const usuarioDireccion = await this.getModel().update({
        where: {
          id,
          is_deleted: false
        },
        data: updateData,
      });
      if (!usuarioDireccion) throw new Error('Usuario_Direccion not found');
      return transformBigInt(usuarioDireccion);
    } catch (error) {
      throw new Error('Error updating usuario_direccion: ' + (error as Error).message);
    }
  }

  async delete(id: bigint): Promise<void> {
    try {
      await this.softDelete(id);
    } catch (error) {
      throw new Error('Error deleting usuario_direccion: ' + (error as Error).message);
    }
  }

  async restore(id: bigint): Promise<any> {
    try {
      const result = await super.restore(id);
      return transformBigInt(result);
    } catch (error) {
      throw new Error('Error restoring usuario_direccion: ' + (error as Error).message);
    }
  }

  async permanentDelete(id: bigint): Promise<void> {
    try {
      await this.getModel().delete({ where: { id } });
    } catch (error) {
      throw new Error('Error permanently deleting usuario_direccion: ' + (error as Error).message);
    }
  }

  async getAllDeleted(): Promise<any> {
    try {
      // Using raw query as workaround for Prisma client type issues
      const deletedUsuarioDirecciones = await prisma.$queryRaw`
        SELECT * FROM "Usuario_Direccion" 
        WHERE is_deleted = true
      `;
      return transformBigInt(deletedUsuarioDirecciones);
    } catch (error) {
      throw new Error('Error fetching deleted usuario_direcciones: ' + (error as Error).message);
    }
  }
}