import { Request, Response } from 'express';
import { CategoriaService } from '../services/categoriaService';

const categoriaService = new CategoriaService();

export class CategoriaController {
  async getAll(req: Request, res: Response) {
    try {
      const categories = await categoriaService.getAll();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const category = await categoriaService.getById(BigInt(req.params.id));
      res.json(category);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const category = await categoriaService.create(req.body);
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const category = await categoriaService.update(BigInt(req.params.id), req.body);
      res.json(category);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await categoriaService.delete(BigInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }
}
