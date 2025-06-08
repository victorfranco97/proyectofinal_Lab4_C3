import { Request, Response } from 'express';
import { OrdenCompraService } from '../services/ordenCompraService';

const ordenCompraService = new OrdenCompraService();

export class OrdenCompraController {
  async getAll(req: Request, res: Response) {
    try {
      const orders = await ordenCompraService.getAll();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const order = await ordenCompraService.getById(Number(req.params.id)); // Convertir string a number
      res.json(order);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { fecha_compra, id_usuario_direccion, total } = req.body;
      const order = await ordenCompraService.create({ fecha_compra, id_usuario_direccion, total });
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const order = await ordenCompraService.update(Number(req.params.id), req.body); // Convertir string a number
      res.json(order);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await ordenCompraService.delete(Number(req.params.id)); // Convertir string a number
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }
}