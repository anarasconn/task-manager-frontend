# Evidencias EC3 F3 A12

## Identificación

- Repositorio: https://github.com/anarasconn/task-manager-frontend
- Commit: Pendiente de hash final al etiquetar
- Etiqueta: v1.0.0
- URL Frontend: https://task-manager-frontend-anarascon.onrender.com
- URL Backend: https://task-api-express-anarascon.onrender.com
- Fecha: 2026-11-16

## Calidad

- Instalación: Exitosa con `pnpm install --frozen-lockfile` sin discrepancias de dependencias.
- verify: Comando `pnpm verify` finalizado en 0 errores (lint, test y build).
- Pruebas: 9 pruebas unitarias y de integración aprobadas (session.service: 2, http.service: 3, auth-routes: 4).
- Build y preview: Empaquetado en `dist/` generado correctamente y validado con `pnpm preview`.

## Producción

- health: GET `/health` responde 200 OK con estado `{ status: "ok" }`.
- health/database: GET `/health/database` responde 200 OK con `{ status: "ok", database: "connected" }`.
- Ruta profunda: Reescritura configurada en `render.yaml` (`/* -> /index.html`), permitiendo recargas directas en `/tasks` y `/tasks/:taskId`.
- Prueba de humo: Script `scripts/smoke-production.mjs` completado exitosamente validando HTML con `#root` y respuestas JSON.

## Aceptación

| Caso | Resultado | Evidencia |
|---|---|---|
| Registro y login | Exitoso | Usuario registrado con rol `user`, login devuelve token Bearer y redirige a tareas |
| Restauración | Exitoso | Recarga con F5 consulta `/api/auth/me` y preserva la identidad y el rol en memoria |
| CRUD user | Exitoso | Lectura, búsqueda, creación de tareas y cambio de estado operativos sin errores |
| 403 user | Exitoso | Botón 'Eliminar' ausente en interfaz; invocación remota responde 403 Forbidden |
| 204 admin | Exitoso | Botón 'Eliminar' visible y confirmado para rol admin; responde 204 No Content |
| Filtros y página | Exitoso | Búsqueda por término, filtrado por estado y paginación sincronizados con la API |
| Logout | Exitoso | Botón 'Cerrar sesión' purga el token de sessionStorage y redirige a `/login` |

## Seguridad

- [x] Sin tokens.
- [x] Sin contraseñas.
- [x] Sin MONGODB_URI.
- [x] Sin JWT_SECRET.
