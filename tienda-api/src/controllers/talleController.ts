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
      const talle = await talleService.getById(BigInt(req.params.id)); // Convertir string a bigint
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
      const talle = await talleService.update(BigInt(req.params.id), req.body); // Convertir string a bigint
      res.json(talle);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await talleService.delete(BigInt(req.params.id)); // Convertir string a bigint
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async restore(req: Request, res: Response) {
    try {
      const talle = await talleService.restore(BigInt(req.params.id));
      res.json(talle);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async permanentDelete(req: Request, res: Response) {
    try {
      await talleService.permanentDelete(BigInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async getAllDeleted(req: Request, res: Response) {
    try {
      const deletedTalles = await talleService.getAllDeleted();
      res.json(deletedTalles);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
