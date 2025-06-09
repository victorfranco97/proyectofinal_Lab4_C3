import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Interfaz para el usuario decodificado del JWT
interface AuthenticatedUser {
  id: string;
  email: string;
  rol: string;
}

// Extender la interfaz Request para incluir el usuario
declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as AuthenticatedUser;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

/**
 * Middleware para validar roles específicos
 * @param allowedRoles - Array de roles permitidos
 */
export const authorizeRoles = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    if (!allowedRoles.includes(req.user.rol)) {
      return res.status(403).json({
        error: 'Acceso denegado. Rol insuficiente',
        requiredRoles: allowedRoles,
        userRole: req.user.rol
      });
    }

    next();
  };
};

/**
 * Middleware para validar que el usuario solo acceda a sus propios datos
 * Compara el ID del usuario autenticado con el ID en los parámetros de la URL
 */
export const validateOwnData = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  }

  // Si es admin, puede acceder a cualquier dato
  if (req.user.rol === 'admin') {
    return next();
  }

  // Para usuarios comunes, validar que solo accedan a sus propios datos
  const requestedUserId = req.params.id || req.params.usuario_id || req.body.usuario_id;

  if (requestedUserId && requestedUserId !== req.user.id) {
    return res.status(403).json({
      error: 'Acceso denegado. Solo puedes acceder a tus propios datos',
      authenticatedUserId: req.user.id,
      requestedUserId: requestedUserId
    });
  }

  next();
};

/**
 * Middleware para validar acceso a recursos relacionados con el usuario
 * Para endpoints que manejan recursos que pertenecen a un usuario específico
 */
export const validateResourceOwnership = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  }

  // Si es admin, puede acceder a cualquier recurso
  if (req.user.rol === 'admin') {
    return next();
  }

  // Para usuarios comunes, verificar que el recurso le pertenezca
  // Esto se debe implementar específicamente en cada endpoint según la lógica de negocio
  // Por ahora, solo permitimos que continúe y que cada controlador valide la propiedad
  next();
};

/**
 * Middleware específico para admin
 */
export const requireAdmin = authorizeRoles(['admin']);

/**
 * Middleware para admin y cliente
 */
export const requireAdminOrCliente = authorizeRoles(['admin', 'cliente']);

/**
 * Middleware combinado: autenticación + validación de datos propios
 */
export const authenticateAndValidateOwnData = [authenticateToken, validateOwnData];

/**
 * Middleware combinado: autenticación + solo admin
 */
export const authenticateAdmin = [authenticateToken, requireAdmin];