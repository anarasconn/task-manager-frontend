# Pruebas de API REST - EC3 F2 A10

## Entorno

- Rama: feature/api-rest-crud-remoto
- Dirección pública usada por el Frontend: /api
- Resultado de pnpm build: Compilación exitosa (0 errores, 0 advertencias)

## Casos ejecutados

| Caso | Método y ruta | Esperado | Obtenido | Resultado |
|---|---|---:|---:|---|
| Listar | GET /api/tasks | 200 | 200 OK con data y meta | Exitoso |
| Crear | POST /api/tasks | 201 | 201 Created con documento creado | Exitoso |
| Actualizar | PATCH /api/tasks/:id | 200 | 200 OK con documento actualizado | Exitoso |
| Eliminar | DELETE /api/tasks/:id | 204 | 204 No Content (cuerpo vacío) | Exitoso |
| Inexistente | GET /api/tasks/:id | 404 | 404 Not Found (TASK_NOT_FOUND) | Exitoso |
| API detenida | GET /api/tasks | Error de red | NETWORK_ERROR con botón Reintentar | Exitoso |

## Evidencias

- Captura de la lista: Interfaz React mostrando la lista paginada y resumen desde la base de datos remota.
- Captura de Network: Solicitudes HTTP enviadas a `/api/tasks` mediante el proxy de Vite y recibiendo respuestas JSON.
- Captura del error y reintento: Presentación del componente `AsyncStatus` con mensaje descriptivo y acción de reintento funcional.
- Observaciones: Se sustituyó por completo `localStorage` por la API REST remota, manteniendo la SPA sincronizada con MongoDB Atlas.
