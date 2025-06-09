import 'dotenv/config';
import express from 'express';

// Importar rutas
import categoriaRoutes from './routes/categoriaRoutes';
import descuentoRoutes from './routes/descuentoRoutes';
import direccionRoutes from './routes/direccionRoutes';
import imagenRoutes from './routes/imagenRoutes';
import ordenCompraDetalleRoutes from './routes/ordenCompraDetalleRoutes';
import ordenCompraRoutes from './routes/ordenCompraRoutes';
import precioDescuentoRoutes from './routes/precioDescuentoRoutes';
import precioRoutes from './routes/precioRoutes';
import productoRoutes from './routes/productoRoutes';
import talleRoutes from './routes/talleRoutes';
import usuarioDireccionRoutes from './routes/usuarioDireccionRoutes';
import usuarioRoutes from './routes/usuarioRoutes';

const app = express();

// Middleware global
app.use(express.json());

// Configurar CORS si es necesario
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Ruta de health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Tienda API is running',
    timestamp: new Date().toISOString(),
    version: process.env.API_VERSION || 'v1'
  });
});

// Configurar todas las rutas con prefijo /api
app.use('/api', usuarioRoutes);
app.use('/api', direccionRoutes);
app.use('/api', usuarioDireccionRoutes);
app.use('/api', ordenCompraRoutes);
app.use('/api', ordenCompraDetalleRoutes);
app.use('/api', categoriaRoutes);
app.use('/api', productoRoutes);
app.use('/api', talleRoutes);
app.use('/api', precioRoutes);
app.use('/api', descuentoRoutes);
app.use('/api', precioDescuentoRoutes);
app.use('/api', imagenRoutes);

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`, availableRoutes: {
      usuarios: '/api/usuarios',
      direcciones: '/api/direcciones',
      usuarioDirecciones: '/api/usuario-direcciones',
      categorias: '/api/categorias',
      productos: '/api/productos',
      ordenes: '/api/ordenes-compra',
      ordenDetalles: '/api/orden-compra-detalles',
      talles: '/api/talles',
      precios: '/api/precios',
      descuentos: '/api/descuentos',
      precioDescuentos: '/api/precio-descuentos',
      imagenes: '/api/imagenes'
    }
  });
});

// Middleware de manejo de errores global
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', error);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

export default app;

