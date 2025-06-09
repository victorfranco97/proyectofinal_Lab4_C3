import { Request, Response } from 'express';
import { OrdenCompraDetalleService } from '../services/ordenCompraDetalleService';

export class OrdenCompraDetalleController {
  private ordenCompraDetalleService: OrdenCompraDetalleService;

  constructor() {
    this.ordenCompraDetalleService = new OrdenCompraDetalleService();
  }

  async getAll(req: Request, res: Response) {
    try {
      const detalles = await this.ordenCompraDetalleService.getAll();
      res.json(detalles);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener detalles de orden' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = BigInt(req.params.id);
      const detalle = await this.ordenCompraDetalleService.getById(id);
      if (!detalle) {
        return res.status(404).json({ error: 'Detalle de orden no encontrado' });
      }
      res.json(detalle);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener detalle de orden' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const detalle = await this.ordenCompraDetalleService.create(req.body);
      res.status(201).json(detalle);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear detalle de orden' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = BigInt(req.params.id);
      const detalle = await this.ordenCompraDetalleService.update(id, req.body);
      res.json(detalle);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar detalle de orden' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = BigInt(req.params.id);
      await this.ordenCompraDetalleService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar detalle de orden' });
    }
  }
}

