# Administrador de tareas Frontend

SPA con React TypeScript Vite y React Router.
Consume una API REST protegida mediante JWT Bearer.

## Funciones

- Registro login restauración y logout.
- Rutas públicas y protegidas.
- CRUD remoto.
- Búsqueda filtros orden y paginación.
- Detalle por identificador.
- Permisos user y admin.
- Pruebas y despliegue estático.

## Instalación

```bash
pnpm install --frozen-lockfile
```

## Desarrollo

1. Copiar `.env.example` como `.env.local`.
2. Confirmar `VITE_API_URL=/api`.
3. Iniciar Backend en `localhost:3000`.
4. Ejecutar `pnpm dev`.

## Verificación

```bash
pnpm verify
```

## Producción

- Frontend: https://task-manager-frontend-anarascon.onrender.com
- API: https://task-api-express-anarascon.onrender.com/api
- Versión: 1.0.0

Consulta `docs/deployment-configuration.md` y `docs/release-checklist.md`.
