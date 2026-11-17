# Evidencias EC3 F3 A11

## Entorno

- Rama: ec3-a11-autenticacion
- React: 19.2.0
- React Router: 7.18.4
- URL local del Frontend: http://localhost:5173
- URL local del Backend: http://localhost:3000

## Casos

| Caso | HTTP | Resultado | Evidencia |
|---|---:|---|---|
| Registro válido | 201 | Usuario creado exitosamente | Respuesta JSON con id, name, email, role y status 201 Created |
| Correo duplicado | 409 | Mensaje de conflicto mostrado al usuario | Error visible en alerta "El correo electrónico ya se encuentra registrado" (409 Conflict) |
| Login inválido | 401 | Mensaje de credenciales incorrectas | Alerta de error en formulario con mensaje 401 Unauthorized sin revelar token |
| Login válido | 200 | Token recibido y sesión iniciada | Almacenamiento seguro de accessToken en sessionStorage y redirección automática |
| /auth/me | 200 | Identidad restaurada tras recarga | Perfil del usuario autenticado restaurado en memoria y barra superior (nombre y rol) |
| /tasks sin token | 401 | Redirección inmediata a /login | ProtectedRoute detecta estado anónimo y redirige a /login guardando la ruta previa en state |
| CRUD con user | 2xx | Operaciones de lectura, creación y edición permitidas | Tareas listadas y creadas exitosamente con token Bearer en encabezado |
| DELETE con user | 403 | Botón no visible en UI y Backend bloquea si se invoca | Botón 'Eliminar' condicional oculto para rol user; Backend responde 403 Forbidden |
| DELETE con admin | 204 | Tarea eliminada exitosamente | Botón 'Eliminar' disponible y visible para rol admin; respuesta 204 No Content |
| Token alterado | 401 | Cierre de sesión y limpieza de sessionStorage | Interceptor 401 detecta token manipulado, remueve token y redirige a /login |

## Rutas y sesión

- Redirección a login: Al intentar entrar directamente a `/tasks` o `/tasks/:taskId` sin sesión activa, `ProtectedRoute` intercepta la navegación y redirige al usuario hacia `/login` preservando la ruta solicitada en el estado de navegación (`state: { from: location }`).
- Recuperación de la ruta intentada: Al completar un login exitoso, `LoginPage` consulta `location.state?.from` y redirige al usuario a la página a la que intentaba ingresar originalmente en lugar de enviarlo forzosamente al inicio.
- Restauración después de recargar: Al refrescar el navegador (F5), `AuthProvider` inicia en estado `checking`, lee el `accessToken` desde `sessionStorage`, consulta `GET /api/auth/me` enviando el encabezado `Authorization: Bearer <token>` y recupera el perfil (`AuthUser`).
- Cierre y botón Atrás: Al hacer clic en "Cerrar sesión", se ejecuta `logout()`, se elimina el token de `sessionStorage`, el estado pasa a `anonymous` y se redirige a `/login`. Si el usuario pulsa el botón "Atrás" del navegador, las rutas protegidas no se abren porque no hay token y vuelven a redirigir al login.

## Calidad

- pnpm lint: Ejecutado con oxlint; 0 errores y 0 advertencias en los 41 archivos inspeccionados.
- pnpm build: Ejecutado con TypeScript y Vite (`tsc -b && vite build`); compilación limpia sin errores de tipos y generación exitosa del paquete en `dist/`.
- Consola del navegador: Sin advertencias de claves duplicadas, sin errores no capturados ni fugas de tokens en logs.

## Protección de datos

Confirmo que las evidencias no muestran contraseñas, tokens completos, JWT_SECRET ni MONGODB_URI.
