import { Request, Response } from 'express';
import { PrecioDescuentoService } from '../services/precioDescuentoService';

const precioDescuentoService = new PrecioDescuentoService();

export class PrecioDescuentoController {
  async getAll(req: Request, res: Response) {
    try {
      const precioDescuentos = await precioDescuentoService.getAll();
      res.json(precioDescuentos);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const precioDescuento = await precioDescuentoService.getById(BigInt(req.params.id)); // Convertir string a bigint
      res.json(precioDescuento);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const precioDescuento = await precioDescuentoService.create(req.body);
      res.status(201).json(precioDescuento);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const precioDescuento = await precioDescuentoService.update(BigInt(req.params.id), req.body); // Convertir string a bigint
      res.json(precioDescuento);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await precioDescuentoService.delete(BigInt(req.params.id)); // Convertir string a bigint
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }
}
