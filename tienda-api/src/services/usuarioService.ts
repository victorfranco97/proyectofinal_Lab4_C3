import { PrismaClient, Usuario } from '@prisma/client';
import bcrypt from 'bcrypt';
import { transformBigInt } from '../utils/prismaUtils';
import { SoftDeleteOptions, SoftDeleteService, SoftDeleteUtils } from '../utils/softDeleteUtils';

const prisma = new PrismaClient();

export class UsuarioService extends SoftDeleteService<Usuario> {
  constructor() {
    super(prisma, 'usuario');
  }
  async create(data: { nombre: string; email: string; password: string; dni: string; rol: string }): Promise<any> {
    try {

      const hashedPassword = await bcrypt.hash(data.password, 10);


      const usuario = await prisma.usuario.create({
        data: { ...data, password: hashedPassword },
      })
      return transformBigInt({ ...usuario, password: undefined }); // Exclude password from response
    } catch (error) {
      console.error('💥 Error creando usuario:', (error as Error).message);
      throw new Error('Error creating user: ' + (error as Error).message);
    }
  }
  async getAll(options: SoftDeleteOptions = {}): Promise<any> {
    try {
      const usuarios = await this.findManyWithSoftDelete({
        include: {
          direcciones: {
            where: SoftDeleteUtils.getActiveFilter()
          }
        },
        softDeleteOptions: options
      });
      return transformBigInt(usuarios.map((usuario: any) => ({ ...usuario, password: undefined })));
    } catch (error) {
      throw new Error('Error fetching users: ' + (error as Error).message);
    }
  }
  async getById(id: bigint, options: SoftDeleteOptions = {}): Promise<any> {
    try {
      const usuario = await this.findUniqueWithSoftDelete(BigInt(id), {
        include: {
          direcciones: {
            where: SoftDeleteUtils.getActiveFilter()
          }
        },
        softDeleteOptions: options
      });
      if (!usuario) throw new Error('User not found');
      return transformBigInt({ ...usuario, password: undefined });
    } catch (error) {
      throw new Error('Error fetching user: ' + (error as Error).message);
    }
  }

  async update(id: bigint, data: { nombre?: string; email?: string; password?: string; dni?: string; rol?: string }): Promise<any> {
    try {
      const usuario = await prisma.usuario.update({
        where: { id: BigInt(id) },
        data: data.password ? { ...data, password: await bcrypt.hash(data.password, 10) } : data,
      });
      if (!usuario) throw new Error('User not found');
      return transformBigInt({ ...usuario, password: undefined });
    } catch (error) {
      throw new Error('Error updating user: ' + (error as Error).message);
    }
  }
  async delete(id: bigint): Promise<void> {
    try {
      await this.softDelete(BigInt(id));
    } catch (error) {
      throw new Error('Error deleting user: ' + (error as Error).message);
    }
  } async restore(id: bigint): Promise<any> {
    try {
      const usuario = await super.restore(id);
      return transformBigInt({ ...usuario, password: undefined });
    } catch (error) {
      throw new Error('Error restoring user: ' + (error as Error).message);
    }
  }

  async permanentDelete(id: bigint): Promise<void> {
    try {
      await prisma.usuario.delete({ where: { id: BigInt(id) } });
    } catch (error) {
      throw new Error('Error permanently deleting user: ' + (error as Error).message);
    }
  } async login(email: string, password: string): Promise<Usuario> {
    try {
      const usuario = await prisma.usuario.findFirst({
        where: {
          email,
          ...SoftDeleteUtils.getActiveFilter()
        }
      });
      if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
        throw new Error('Invalid credentials');
      }
      return transformBigInt({ ...usuario, password: undefined });
    } catch (error) {
      throw new Error('Error logging in: ' + (error as Error).message);
    }
  }
}