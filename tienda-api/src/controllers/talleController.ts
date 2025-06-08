import { Request, Response } from 'express';
import { TalleService } from '../services/talleService';

const talleService = new TalleService();

export class TalleController {
  async getAll(req: Request, res: Response) {
    try {
      const talles = await talleService.getAll();
      res.json(talles);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const talle = await talleService.getById(Number(req.params.id)); // Convertir string a number
      res.json(talle);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const talle = await talleService.create(req.body);
      res.status(201).json(talle);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const talle = await talleService.update(Number(req.params.id), req.body); // Convertir string a number
      res.json(talle);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await talleService.delete(Number(req.params.id)); // Convertir string a number
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }
}