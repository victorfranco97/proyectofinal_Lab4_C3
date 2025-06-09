import { Request, Response } from 'express';
import { DescuentoService } from '../services/descuentoService';

const descuentoService = new DescuentoService();

export class DescuentoController {
  async getAll(req: Request, res: Response) {
    try {
      const descuentos = await descuentoService.getAll();
      res.json(descuentos);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
  async getById(req: Request, res: Response) {
    try {
      const descuento = await descuentoService.getById(BigInt(req.params.id)); // Convertir string a bigint
      res.json(descuento);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const descuento = await descuentoService.create(req.body);
      res.status(201).json(descuento);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
  async update(req: Request, res: Response) {
    try {
      const descuento = await descuentoService.update(BigInt(req.params.id), req.body); // Convertir string a bigint
      res.json(descuento);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await descuentoService.delete(BigInt(req.params.id)); // Convertir string a bigint
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }
}
