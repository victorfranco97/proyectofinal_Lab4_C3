import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

const prisma = new PrismaClient();

/**
 * Middleware para validar que el usuario solo acceda a sus direcciones
 */
export const validateDireccionOwnership = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  }

  // Si es admin, puede acceder a cualquier dirección
  if (req.user.rol === 'admin') {
    return next();
  }

  try {
    const direccionId = req.params.id;

    if (direccionId) {
      // Verificar que la dirección pertenezca al usuario autenticado
      const usuarioDireccion = await prisma.usuario_Direccion.findFirst({
        where: {
          direccion_id: BigInt(direccionId),
          usuario_id: BigInt(req.user.id)
        }
      });

      if (!usuarioDireccion) {
        return res.status(403).json({
          error: 'Acceso denegado. Esta dirección no te pertenece'
        });
      }
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Error validando propiedad de la dirección' });
  }
};

/**
 * Middleware para validar que el usuario solo acceda a sus órdenes de compra
 */
export const validateOrdenOwnership = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  }

  // Si es admin, puede acceder a cualquier orden
  if (req.user.rol === 'admin') {
    return next();
  }

  try {
    const ordenId = req.params.id;

    if (ordenId) {
      // Verificar que la orden pertenezca al usuario autenticado
      const orden = await prisma.orden_Compra.findFirst({
        where: { id: BigInt(ordenId) },
        include: {
          usuario_direccion: {
            include: {
              usuario: true
            }
          }
        }
      });

      if (!orden || orden.usuario_direccion.usuario.id !== BigInt(req.user.id)) {
        return res.status(403).json({
          error: 'Acceso denegado. Esta orden no te pertenece'
        });
      }
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Error validando propiedad de la orden' });
  }
};

/**
 * Middleware para filtrar resultados según el usuario
 * Modifica la query para que solo devuelva datos del usuario autenticado
 */
export const filterByUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  }

  // Si es admin, no filtrar
  if (req.user.rol === 'admin') {
    return next();
  }

  // Para usuarios comunes, agregar filtro por usuario
  req.query.usuario_id = req.user.id;

  next();
};

/**
 * Middleware para validar que en creación/actualización se use el ID del usuario autenticado
 */
export const enforceUserIdInBody = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  }

  // Si es admin, puede especificar cualquier usuario_id
  if (req.user.rol === 'admin') {
    return next();
  }

  // Para usuarios comunes, forzar que el usuario_id sea el suyo
  if (req.body.usuario_id && req.body.usuario_id !== req.user.id) {
    return res.status(403).json({
      error: 'No puedes crear recursos para otros usuarios'
    });
  }

  // Para órdenes de compra, validar a través de usuario_direccion
  if (req.body.id_usuario_direccion) {
    // Este middleware debería ser usado junto con validateUsuarioDireccionOwnership
    // para verificar que la dirección pertenece al usuario
  }

  // Si no se especifica usuario_id, usar el del usuario autenticado
  if (!req.body.usuario_id && !req.body.id_usuario_direccion) {
    req.body.usuario_id = req.user.id;
  }

  next();
};

/**
 * Middleware para validar que el usuario solo acceda a detalles de sus órdenes
 */
export const validateDetalleOrdenOwnership = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  }

  // Si es admin, puede acceder a cualquier detalle
  if (req.user.rol === 'admin') {
    return next();
  }

  try {
    const detalleId = req.params.id;
    const ordenId = req.body.id_orden_compra || req.params.orden_id;

    if (detalleId) {
      // Verificar que el detalle pertenezca a una orden del usuario
      const detalle = await prisma.orden_Compra_Detalle.findFirst({
        where: { id: BigInt(detalleId) },
        include: {
          orden_compra: {
            include: {
              usuario_direccion: {
                include: {
                  usuario: true
                }
              }
            }
          }
        }
      });

      if (!detalle || detalle.orden_compra.usuario_direccion.usuario.id !== BigInt(req.user.id)) {
        return res.status(403).json({
          error: 'Acceso denegado. Este detalle no pertenece a tus órdenes'
        });
      }
    } else if (ordenId) {
      // Verificar que la orden pertenezca al usuario
      const orden = await prisma.orden_Compra.findFirst({
        where: { id: BigInt(ordenId) },
        include: {
          usuario_direccion: {
            include: {
              usuario: true
            }
          }
        }
      });

      if (!orden || orden.usuario_direccion.usuario.id !== BigInt(req.user.id)) {
        return res.status(403).json({
          error: 'Acceso denegado. Esta orden no te pertenece'
        });
      }
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Error validando propiedad del detalle de orden' });
  }
};

/**
 * Middleware para validar que el id_usuario_direccion pertenece al usuario autenticado
 */
export const validateUsuarioDireccionInBody = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  }

  // Si es admin, puede usar cualquier usuario_direccion
  if (req.user.rol === 'admin') {
    return next();
  }

  try {
    const usuarioDireccionId = req.body.id_usuario_direccion;

    if (usuarioDireccionId) {
      // Verificar que la usuario_direccion pertenezca al usuario autenticado
      const usuarioDireccion = await prisma.usuario_Direccion.findFirst({
        where: {
          id: BigInt(usuarioDireccionId),
          usuario_id: BigInt(req.user.id)
        }
      });

      if (!usuarioDireccion) {
        return res.status(403).json({
          error: 'Acceso denegado. Esta dirección no te pertenece'
        });
      }
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Error validando propiedad de la dirección' });
  }
};
