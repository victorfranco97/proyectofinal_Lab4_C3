import { Request, Response } from 'express';
import { PrecioService } from '../services/precioService';

const precioService = new PrecioService();

export class PrecioController {
  async getAll(req: Request, res: Response) {
    try {
      const precios = await precioService.getAll();
      res.json(precios);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const precio = await precioService.getById(BigInt(req.params.id)); // Convertir string a bigint
      res.json(precio);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const precio = await precioService.create(req.body);
      res.status(201).json(precio);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const precio = await precioService.update(BigInt(req.params.id), req.body); // Convertir string a bigint
      res.json(precio);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await precioService.delete(BigInt(req.params.id)); // Convertir string a bigint
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }
}
