import { Request, Response } from 'express';
import { ImagenService } from '../services/imagenService';

const imagenService = new ImagenService();

export class ImagenController {
  async getAll(req: Request, res: Response) {
    try {
      const images = await imagenService.getAll();
      res.json(images);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const image = await imagenService.getById(Number(req.params.id)); // Convertir string a number
      res.json(image);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const image = await imagenService.create(req.body);
      res.status(201).json(image);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const image = await imagenService.update(Number(req.params.id), req.body); // Convertir string a number
      res.json(image);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await imagenService.delete(Number(req.params.id)); // Convertir string a number
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }
}