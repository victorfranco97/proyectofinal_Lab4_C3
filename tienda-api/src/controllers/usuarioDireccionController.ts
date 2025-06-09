import { Request, Response } from 'express';
import { UsuarioDireccionService } from '../services/usuarioDireccionService';

const usuarioDireccionService = new UsuarioDireccionService();

export class UsuarioDireccionController {
  async create(req: Request, res: Response) {
    try {
      const { usuario_id, direccion_id } = req.body;
      console.log('Controller received data:', { usuario_id, direccion_id });
      const usuarioDireccion = await usuarioDireccionService.create({ usuario_id, direccion_id });
      console.log('Raw usuarioDireccion from service:', usuarioDireccion); // Verifica el valor crudo
      if (!usuarioDireccion) {
        throw new Error('No data returned from service');
      }
      const transformedResponse = JSON.parse(JSON.stringify(usuarioDireccion, (key, value) => (typeof value === 'bigint' ? value.toString() : value)));
      console.log('Transformed response:', transformedResponse); // Verifica después de la transformación
      console.log('Controller sending response:', usuarioDireccion);
      res.status(201).json(transformedResponse);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const usuarioDirecciones = await usuarioDireccionService.getAll();
      res.json(usuarioDirecciones);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
  async getById(req: Request, res: Response) {
    try {
      const usuarioDireccion = await usuarioDireccionService.getById(BigInt(req.params.id));
      if (!usuarioDireccion) return res.status(404).json({ error: 'Usuario_Direccion not found' });
      res.json(usuarioDireccion);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { usuario_id, direccion_id } = req.body;
      const usuarioDireccion = await usuarioDireccionService.update(BigInt(req.params.id), { usuario_id, direccion_id });
      if (!usuarioDireccion) return res.status(404).json({ error: 'Usuario_Direccion not found' });
      res.json(usuarioDireccion);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await usuarioDireccionService.delete(BigInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async restore(req: Request, res: Response) {
    try {
      const usuarioDireccion = await usuarioDireccionService.restore(BigInt(req.params.id));
      res.json(usuarioDireccion);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async permanentDelete(req: Request, res: Response) {
    try {
      await usuarioDireccionService.permanentDelete(BigInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async getAllDeleted(req: Request, res: Response) {
    try {
      const deletedUsuarioDirecciones = await usuarioDireccionService.getAllDeleted();
      res.json(deletedUsuarioDirecciones);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
