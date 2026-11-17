# Configuración de despliegue EC3 F3 A12

## Frontend

- Repositorio: https://github.com/anarasconn/task-manager-frontend
- Rama: main
- Servicio: task-manager-frontend-anarascon
- URL: https://task-manager-frontend-anarascon.onrender.com
- Build: pnpm verify
- Publicación: dist
- VITE_API_URL: https://task-api-express-anarascon.onrender.com/api
- Rewrite: /* hacia /index.html

## Backend relacionado

- Repositorio: https://github.com/anarasconn/task-api-express
- URL: https://task-api-express-anarascon.onrender.com
- CORS_ORIGIN: https://task-manager-frontend-anarascon.onrender.com
- Salud: /health
- Salud de Atlas: /health/database
- Documentación: /api-docs

No copies MONGODB_URI JWT_SECRET tokens o contraseñas.
