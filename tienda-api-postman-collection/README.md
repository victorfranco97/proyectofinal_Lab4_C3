# Postman Collection for Tienda API

Esta colección contiene todas las peticiones necesarias para probar la API de la tienda. Incluye 49 endpoints organizados en 10 categorías principales.

## 📁 Estructura de la Colección

- **Autenticación** - Registro y login de usuarios
- **Usuarios** - Gestión de usuarios (CRUD)
- **Direcciones** - Gestión de direcciones (CRUD)
- **Usuario-Dirección** - Relación entre usuarios y direcciones
- **Órdenes de Compra** - Gestión de órdenes (CRUD)
- **Categorías** - Gestión de categorías de productos (CRUD)
- **Productos** - Gestión de productos (CRUD)
- **Talles** - Gestión de talles (CRUD)
- **Precios** - Gestión de precios (CRUD)
- **Descuentos** - Gestión de descuentos (CRUD)
- **Precio-Descuentos** - Relación entre precios y descuentos
- **Imágenes** - Gestión de imágenes de productos (CRUD)

## 🚀 Instalación y Uso

### 1. Importar la Colección

1. Abre Postman
2. Haz clic en "Import" en la esquina superior izquierda
3. Selecciona el archivo `Tienda_API_Collection.postman_collection.json`
4. La colección aparecerá en tu workspace

### 2. Configurar Variables de Entorno

Crea un nuevo entorno en Postman con las siguientes variables:

```
base_url: http://localhost:3000 (o la URL de tu API)
token: (se llenará automáticamente después del login)
usuario_id: (usar un ID válido de usuario)
direccion_id: (usar un ID válido de dirección)
orden_id: (usar un ID válido de orden)
categoria_id: (usar un ID válido de categoría)
producto_id: (usar un ID válido de producto)
talle_id: (usar un ID válido de talle)
precio_id: (usar un ID válido de precio)
descuento_id: (usar un ID válido de descuento)
imagen_id: (usar un ID válido de imagen)
```

### 3. Flujo de Pruebas Recomendado

#### Paso 1: Autenticación
1. **Registrar Usuario** - Crea una nueva cuenta
2. **Login Usuario** - Obtén el token de autenticación

#### Paso 2: Configuración Básica
1. **Crear Categoría** - Crea categorías para productos
2. **Crear Talle** - Crea talles disponibles
3. **Crear Descuento** - Crea descuentos (opcional)

#### Paso 3: Gestión de Productos
1. **Crear Producto** - Añade productos al catálogo
2. **Crear Precio** - Asigna precios a los productos
3. **Crear Imagen** - Añade imágenes a los productos

#### Paso 4: Gestión de Usuarios
1. **Crear Dirección** - Añade direcciones de envío
2. **Asociar Usuario-Dirección** - Vincula usuarios con direcciones

#### Paso 5: Órdenes de Compra
1. **Crear Orden** - Crea nuevas órdenes de compra

## 🔑 Autenticación

La mayoría de los endpoints requieren autenticación JWT. Después de hacer login exitoso:

1. El token se guardará automáticamente en la variable `{{token}}`
2. Los headers de autorización se incluirán automáticamente en las peticiones que lo requieran

## 📝 Ejemplos de Datos

La colección incluye datos de ejemplo para todas las peticiones POST y PUT:

### Usuario
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@email.com",
  "password": "password123",
  "dni": "12345678",
  "rol": "cliente"
}
```

### Producto
```json
{
  "nombre": "Camiseta Deportiva",
  "descripcion": "Camiseta deportiva de alta calidad",
  "categoria_id": "{{categoria_id}}"
}
```

### Orden de Compra
```json
{
  "usuario_id": "{{usuario_id}}",
  "direccion_envio_id": "{{direccion_id}}",
  "total": 150.00,
  "estado": "pendiente"
}
```

## ⚠️ Notas Importantes

1. **IDs Dinámicos**: Actualiza las variables de entorno con IDs reales después de crear recursos
2. **Orden de Ejecución**: Algunos endpoints dependen de otros (ej: productos necesitan categorías)
3. **Roles de Usuario**: Algunos endpoints requieren roles específicos (admin, cliente)
4. **Validaciones**: La API incluye validaciones, revisa las respuestas de error para detalles

## 🛠️ Troubleshooting

### Error 401 (No autorizado)
- Verifica que el token esté configurado correctamente
- Realiza login nuevamente si el token expiró

### Error 404 (No encontrado)
- Verifica que los IDs en las variables de entorno sean válidos
- Crea los recursos necesarios antes de referenciarlos

### Error 400 (Solicitud incorrecta)
- Revisa el formato JSON en el body de la petición
- Verifica que todos los campos requeridos estén incluidos

## 📞 Soporte

Si encuentras problemas con la colección o la API, revisa:
1. Los logs del servidor de la API
2. La documentación de la API en el código fuente
3. Los esquemas de la base de datos en `prisma/schema.prisma`