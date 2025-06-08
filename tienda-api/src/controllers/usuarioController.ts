import { Request, Response } from 'express';
import { UsuarioService } from '../services/usuarioService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const usuarioService = new UsuarioService();

export class UsuarioController {
  async register(req: Request, res: Response) {
    try {
      const { nombre, email, password, dni, rol } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const usuario = await usuarioService.create({ nombre, email, password: hashedPassword, dni, rol });
      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const usuarios = await usuarioService.getAll();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const usuario = await usuarioService.getById(Number(req.params.id));
      if (!usuario) return res.status(404).json({ error: 'User not found' });
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { nombre, email, password, dni, rol } = req.body;
      const usuario = await usuarioService.update(Number(req.params.id), { nombre, email, password, dni, rol });
      if (!usuario) return res.status(404).json({ error: 'User not found' });
      res.json(usuario);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await usuarioService.delete(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }
  
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const loginResult = await usuarioService.login(email, password);
  
      if (!loginResult) {
        throw new Error('Invalid credentials');
      }
  
      const user = await usuarioService.getById(Number(loginResult));
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
      }
  
      const token = jwt.sign(
        { id: user.id.toString(), email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
      );
  
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: (error as Error).message });
    }
  }

  
}