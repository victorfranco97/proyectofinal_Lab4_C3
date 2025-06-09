# 🛍️ Tienda API

API RESTful para gestionar una tienda en línea, desarrollada con **Express.js**, **TypeScript** y **Prisma**.  
Incluye modelos para:

- 👤 Usuarios
- 🏠 Direcciones
- 🔗 Relaciones Usuario-Dirección
- 📦 Órdenes de Compra

---

## ⚙️ Requisitos

- ✅ Node.js (v14.x o superior)
- ✅ npm (viene con Node.js)
- ✅ Git
- 🐳 Docker (opcional, para la base de datos)

---

## 📦 Instalación

### 1. Clona el repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd tienda-api
2. Instala las dependencias
bash
Copiar
Editar
npm install
3. Configura las variables de entorno
Crea un archivo .env en la raíz del proyecto con el siguiente contenido:

env
Copiar
Editar
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/tienda_db?schema=public"
JWT_SECRET=tu_secreto_aqui
💡 Para usar SQLite en lugar de PostgreSQL:

env
Copiar
Editar
DATABASE_URL="file:./tienda.db"
4. Genera el cliente Prisma y aplica migraciones
bash
Copiar
Editar
npx prisma generate
npx prisma db push
Esto creará la base de datos y aplicará los modelos definidos en schema.prisma.

5. Inicia la aplicación
bash
Copiar
Editar
npm run dev
📍 La API estará disponible en: http://localhost:3000

🔐 Autenticación
La mayoría de los endpoints requieren autenticación mediante JWT.

📩 Obtené el token usando:

http
Copiar
Editar
POST /api/usuarios/login
Cuerpo (body):

json
Copiar
Editar
{
  "email": "usuario@example.com",
  "password": "contraseña"
}
📌 Usá el token en el header de las demás peticiones:

makefile
Copiar
Editar
Authorization: Bearer <token>
📚 Endpoints
👤 Usuarios
Método	Endpoint	Descripción
POST	/api/usuarios/register	Registrar usuario
POST	/api/usuarios/login	Iniciar sesión (token)
GET	/api/usuarios	Listar usuarios
GET	/api/usuarios/:id	Ver usuario por ID
PUT	/api/usuarios/:id	Actualizar usuario
DELETE	/api/usuarios/:id	Eliminar usuario

🏠 Direcciones
Método	Endpoint	Descripción
POST	/api/direcciones	Crear dirección
GET	/api/direcciones	Listar direcciones
GET	/api/direcciones/:id	Ver dirección por ID
PUT	/api/direcciones/:id	Actualizar dirección
DELETE	/api/direcciones/:id	Eliminar dirección

🔗 Usuario-Dirección
Método	Endpoint	Descripción
POST	/api/usuario-direccion	Asociar usuario y dirección
GET	/api/usuario-direccion	Listar asociaciones
GET	/api/usuario-direccion/:id	Ver asociación por ID
PUT	/api/usuario-direccion/:id	Actualizar asociación
DELETE	/api/usuario-direccion/:id	Eliminar asociación

🛒 Orden de Compra
Método	Endpoint	Descripción
POST	/api/orden-compra	Crear orden de compra
GET	/api/orden-compra	Listar órdenes
GET	/api/orden-compra/:id	Ver orden por ID
PUT	/api/orden-compra/:id	Actualizar orden
DELETE	/api/orden-compra/:id	Eliminar orden

🧪 Ejemplo con Postman
1. Registro de usuario
POST /api/usuarios/register

json
Copiar
Editar
{
  "nombre": "Iron Man",
  "email": "ironman@example.com",
  "password": "password123",
  "dni": "922229",
  "rol": "hero"
}
2. Inicio de sesión
POST /api/usuarios/login

json
Copiar
Editar
{
  "email": "ironman@example.com",
  "password": "password123"
}
📥 El token de autenticación se devuelve en la respuesta.

Usalo en headers para otras peticiones:

makefile
Copiar
Editar
Authorization: Bearer <token>
📜 Scripts Disponibles
Comando	Descripción
npm run dev	Inicia el servidor en modo desarrollo 🛠️
npm run build	Compila el proyecto para producción 🚀
npx prisma studio	GUI para visualizar y editar la base de datos