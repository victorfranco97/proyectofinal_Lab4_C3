import { Request, Response } from 'express';
import { DireccionService } from '../services/direccionService';

const direccionService = new DireccionService();

export class DireccionController {
  async getAll(req: Request, res: Response) {
    try {
      const direcciones = await direccionService.getAll();
      res.json(direcciones);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const direccion = await direccionService.getById(BigInt(req.params.id));
      if (!direccion) return res.status(404).json({ error: 'Direccion not found' });
      res.json(direccion);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { departamento, localidad, provincia, pais } = req.body;
      const direccion = await direccionService.create({ departamento, localidad, provincia, pais });
      res.status(201).json(direccion);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const direccion = await direccionService.update(BigInt(req.params.id), req.body);
      res.json(direccion);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await direccionService.delete(BigInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }
}
