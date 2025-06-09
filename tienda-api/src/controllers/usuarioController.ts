import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UsuarioService } from '../services/usuarioService';

const usuarioService = new UsuarioService();

export class UsuarioController {
  async register(req: Request, res: Response) {
    try {
      const { nombre, email, password, dni, rol } = req.body;
      const usuario = await usuarioService.create({ nombre, email, password: password, dni, rol });
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
      const usuario = await usuarioService.getById(BigInt(req.params.id));
      if (!usuario) return res.status(404).json({ error: 'User not found' });
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { nombre, email, password, dni, rol } = req.body;
      const usuario = await usuarioService.update(BigInt(req.params.id), { nombre, email, password, dni, rol });
      if (!usuario) return res.status(404).json({ error: 'User not found' });
      res.json(usuario);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await usuarioService.delete(BigInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Validar que se proporcionen email y password
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      // El servicio ya maneja la validación del password
      const user = await usuarioService.login(email, password);

      const token = jwt.sign(
        { id: user.id.toString(), email: user.email, rol: user.rol },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
      );
      if (!token) {
        return res.status(500).json({ error: 'Error generating token' });
      }
      //add expires in miliseconds

      res.json({
        id: user.id,
        nombre: user.nombre,
        detailToken: {
          token,
          expiresIn: 3600000, // 1 hour in milliseconds
          issuedAt: new Date().toISOString(),
        }
      })
    } catch (error) {
      res.status(401).json({ error: (error as Error).message });
    }
  }
  async restore(req: Request, res: Response) {
    try {
      const usuario = await usuarioService.restore(BigInt(req.params.id));
      res.json({ message: 'User restored successfully', usuario });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async permanentDelete(req: Request, res: Response) {
    try {
      await usuarioService.permanentDelete(BigInt(req.params.id));
      res.json({ message: 'User permanently deleted' });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getAllDeleted(req: Request, res: Response) {
    try {
      const usuarios = await usuarioService.getAll({ onlyDeleted: true });
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

}
