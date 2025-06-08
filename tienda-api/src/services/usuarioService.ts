import { PrismaClient, Usuario as PrismaUsuario } from '@prisma/client';
import bcrypt from 'bcrypt';
import { transformBigInt } from '../utils/prismaUtils';

const prisma = new PrismaClient();

export class UsuarioService {
  async create(data: { nombre: string; email: string; password: string; dni: string; rol: string }): Promise<any> {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const usuario = await prisma.usuario.create({
        data: { ...data, password: hashedPassword },
      });
      return transformBigInt(usuario);
    } catch (error) {
      throw new Error('Error creating user: ' + (error as Error).message);
    }
  }

  async getAll(): Promise<any> {
    try {
      const usuarios = await prisma.usuario.findMany({ include: { direcciones: true } });
      return transformBigInt(usuarios);
    } catch (error) {
      throw new Error('Error fetching users: ' + (error as Error).message);
    }
  }

  async getById(id: number): Promise<any> {
    try {
      const usuario = await prisma.usuario.findUnique({ where: { id: BigInt(id) }, include: { direcciones: true } });
      if (!usuario) throw new Error('User not found');
      return transformBigInt(usuario);
    } catch (error) {
      throw new Error('Error fetching user: ' + (error as Error).message);
    }
  }

  async update(id: number, data: { nombre?: string; email?: string; password?: string; dni?: string; rol?: string }): Promise<any> {
    try {
      const usuario = await prisma.usuario.update({
        where: { id: BigInt(id) },
        data: data.password ? { ...data, password: await bcrypt.hash(data.password, 10) } : data,
      });
      if (!usuario) throw new Error('User not found');
      return transformBigInt(usuario);
    } catch (error) {
      throw new Error('Error updating user: ' + (error as Error).message);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await prisma.usuario.delete({ where: { id: BigInt(id) } });
    } catch (error) {
      throw new Error('Error deleting user: ' + (error as Error).message);
    }
  }

  async login(email: string, password: string): Promise<string> {
    try {
      const usuario = await prisma.usuario.findUnique({ where: { email } });
      if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
        throw new Error('Invalid credentials');
      }
      // Simulación de token (reemplaza con tu lógica JWT real)
      return 'mock-jwt-token'; 
    } catch (error) {
      throw new Error('Error logging in: ' + (error as Error).message);
    }
  }
}