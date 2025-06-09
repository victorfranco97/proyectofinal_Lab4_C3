import { Request, Response } from 'express';
import { ProductoService } from '../services/productoService';

const productoService = new ProductoService();

export class ProductoController {
  async getAll(req: Request, res: Response) {
    try {
      const products = await productoService.getAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const product = await productoService.getById(BigInt(req.params.id)); // Convertir string a bigint
      res.json(product);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const product = await productoService.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const product = await productoService.update(BigInt(req.params.id), req.body); // Convertir string a bigint
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await productoService.delete(BigInt(req.params.id)); // Convertir string a bigint
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }
}
