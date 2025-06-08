import { PrismaClient, Usuario_Direccion as PrismaUsuario_Direccion } from '@prisma/client';
import { transformBigInt } from '../utils/prismaUtils';

const prisma = new PrismaClient();

export class UsuarioDireccionService {
  async create(data: { usuario_id: number; direccion_id: number }): Promise<any> {
    try {
      console.log('Creating usuario_direccion with data:', data);
      const usuarioDireccion = await prisma.usuario_Direccion.create({
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
      const usuarioDirecciones = await prisma.usuario_Direccion.findMany({ include: { usuario: true, direccion: true } });
      return transformBigInt(usuarioDirecciones);
    } catch (error) {
      throw new Error('Error fetching usuario_direcciones: ' + (error as Error).message);
    }
  }

  async getById(id: number): Promise<any> {
    try {
      const usuarioDireccion = await prisma.usuario_Direccion.findUnique({ where: { id: BigInt(id) }, include: { usuario: true, direccion: true } });
      if (!usuarioDireccion) throw new Error('Usuario_Direccion not found');
      return transformBigInt(usuarioDireccion);
    } catch (error) {
      throw new Error('Error fetching usuario_direccion: ' + (error as Error).message);
    }
  }

  async update(id: number, data: { usuario_id?: number; direccion_id?: number }): Promise<any> {
    try {
      const updateData: { [key: string]: any } = {}; // Tipo explícito para propiedades dinámicas
      if (data.usuario_id !== undefined) updateData['usuario_id'] = BigInt(data.usuario_id);
      if (data.direccion_id !== undefined) updateData['direccion_id'] = BigInt(data.direccion_id);
      if (Object.keys(updateData).length === 0) {
        throw new Error('No valid fields to update');
      }
      const usuarioDireccion = await prisma.usuario_Direccion.update({
        where: { id: BigInt(id) },
        data: updateData,
      });
      if (!usuarioDireccion) throw new Error('Usuario_Direccion not found');
      return transformBigInt(usuarioDireccion);
    } catch (error) {
      throw new Error('Error updating usuario_direccion: ' + (error as Error).message);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await prisma.usuario_Direccion.delete({ where: { id: BigInt(id) } });
    } catch (error) {
      throw new Error('Error deleting usuario_direccion: ' + (error as Error).message);
    }
  }
}