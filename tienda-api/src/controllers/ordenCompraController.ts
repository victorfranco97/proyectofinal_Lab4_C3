import { Request, Response } from 'express';
import { OrdenCompraService } from '../services/ordenCompraService';

const ordenCompraService = new OrdenCompraService();

export class OrdenCompraController {
  async create(req: Request, res: Response) {
    try {
      const { id_usuario_direccion, total, fecha_compra } = req.body; // Cambiado de 'fecha' a 'fecha_compra'
      if (!id_usuario_direccion || !total || !fecha_compra) {
        return res.status(400).json({ error: 'id_usuario_direccion, total, and fecha_compra are required' });
      }
      const ordenCompra = await ordenCompraService.create({ id_usuario_direccion, total, fecha_compra });
      res.status(201).json(ordenCompra);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const ordenes = await ordenCompraService.getAll();
      res.json(ordenes);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const orden = await ordenCompraService.getById(Number(req.params.id));
      res.json(orden);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage === 'Orden_Compra not found') {
        return res.status(404).json({ error: errorMessage });
      }
      res.status(500).json({ error: errorMessage });
    }
  }
  async update(req: Request, res: Response) {
    try {
      const { id_usuario_direccion, total, fecha_compra } = req.body; // Cambiado de 'fecha' a 'fecha_compra'
      const orden = await ordenCompraService.update(Number(req.params.id), { id_usuario_direccion, total, fecha_compra });
      if (!orden) return res.status(404).json({ error: 'Orden_Compra not found' });
      res.json(orden);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await ordenCompraService.delete(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }
}