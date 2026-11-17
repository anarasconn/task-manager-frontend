# Preguntas de cierre EC3 F3 A12

## 1. ¿Qué diferencia existe entre prueba automatizada, humo y aceptación?

- **Prueba automatizada (unitarias / integración):** Comprueba componentes aislados y servicios en un entorno controlado (como jsdom simulando el DOM y mocks de fetch). Permite verificar lógica interna, contratos y manejo de errores rápidamente sin depender de red ni servidores reales.
- **Prueba de humo (smoke test):** Es una comprobación rápida y no exhaustiva ejecutada sobre el entorno real de producción para confirmar que los servicios están levantados, responden con códigos HTTP 200 y entregan los recursos esenciales (el HTML con `#root` y los endpoints de salud).
- **Prueba de aceptación:** Evalúa los flujos completos de negocio desde la perspectiva del usuario final (registro, login, persistencia contra MongoDB Atlas, permisos de rol y CRUD) para asegurar que el sistema cumple con todas las historias de usuario y criterios de aceptación.

## 2. ¿Por qué Fetch simulado no demuestra que Atlas funciona?

Porque un mock de Fetch (`vi.stubGlobal('fetch', fetchMock)`) intercepta las llamadas de red dentro de la memoria de Node y devuelve respuestas predefinidas por nosotros en el archivo de prueba. No emite ninguna petición TCP/HTTP real hacia el servidor de Express ni hacia el clúster de MongoDB Atlas. Demuestra que el cliente HTTP de React sabe procesar y formatear la petición y la respuesta, pero no garantiza la conectividad, las credenciales, los índices ni la disponibilidad de la base de datos real.

## 3. ¿Qué comprueba una guarda y qué seguridad continúa en el Backend?

- **Qué comprueba la guarda (`ProtectedRoute`):** Comprueba el estado reactivo del cliente (`status === 'authenticated'`) y la presencia de un token en el navegador para guiar la experiencia de usuario (redirigir al login o evitar accesos a vistas privadas).
- **Qué seguridad continúa en el Backend:** La seguridad real e inquebrantable: verificación de la firma criptográfica del JWT (`JWT_SECRET`), comprobación de la fecha de expiración (`exp`), validación de esquema de datos y control de acceso basado en roles (RBAC) en cada endpoint antes de interactuar con la base de datos.

## 4. ¿Por qué VITE_API_URL es pública y JWT_SECRET no?

`VITE_API_URL` solo indica a qué dirección de internet debe enviar peticiones el navegador del usuario. Toda variable con prefijo `VITE_` se reemplaza textualmente e incrusta dentro de los archivos JavaScript finales que cualquier persona puede leer en el navegador con "Ver código fuente". En cambio, `JWT_SECRET` es la clave criptográfica privada con la que el servidor firma los tokens; si se hiciera pública, cualquier atacante podría falsificar tokens válidos, hacerse pasar por administrador y comprometer todo el sistema.

## 5. ¿Por qué cambiar VITE_API_URL exige otro build?

Porque en una aplicación SPA con Vite, las variables de entorno no se consultan en tiempo de ejecución desde un archivo `.env` del servidor. Durante el comando `pnpm build`, Vite toma el valor de `import.meta.env.VITE_API_URL` y lo reemplaza estáticamente como un string literal dentro de los archivos empaquetados en `dist/`. Si la URL del Backend cambia, los archivos compilados siguen teniendo la URL anterior grabada, por lo que se debe reconstruir (`pnpm build`) para generar un nuevo bundle.

## 6. ¿Qué función cumple la reescritura hacia index.html?

En una SPA (Single Page Application), el enrutamiento lo gestiona JavaScript en el navegador (React Router), no el servidor web. Cuando un usuario accede directamente o recarga una ruta profunda como `/tasks` o `/tasks/123`, el servidor web estático de Render no encontrará ningún archivo físico llamado `tasks` en el disco y respondería con un error `404 Not Found`. La regla de reescritura (`/* -> /index.html`) le indica al servidor que siempre entregue `index.html`, permitiendo que React Router se cargue y monte la vista correspondiente.

## 7. ¿Qué diferencia existe entre build, deploy y release?

- **Build:** Proceso de compilación y empaquetado donde el código TypeScript y JSX se transforma y optimiza en archivos estáticos HTML, CSS y JS dentro del directorio `dist/`.
- **Deploy:** Acto de transferir y publicar los archivos generados en una infraestructura de alojamiento accesible (como Render) para que queden disponibles en internet.
- **Release:** Es la versión formalmente aprobada, documentada e identificada por el equipo para su entrega o puesta en producción, congelada mediante una etiqueta de control de versiones (por ejemplo `v1.0.0` en un commit específico de Git).

## 8. ¿Por qué CORS_ORIGIN debe ser exacto?

Porque la política de Same-Origin del navegador exige que el encabezado `Access-Control-Allow-Origin` devuelto por la API coincida exactamente con el origen que emitió la solicitud (`protocolo://dominio:puerto`, sin rutas ni diagonales finales). Si no coincide de manera exacta o se coloca una barra final (`/`), el navegador bloqueará por seguridad la lectura de la respuesta JSON por parte de JavaScript. Asimismo, restringirlo a un origen exacto en lugar de usar `*` impide que sitios web maliciosos de terceros consuman la API usando las credenciales del usuario.

## 9. ¿Qué diferencia existe entre 401 y 403?

- **401 Unauthorized:** Problema de autenticación / identidad. El cliente no ha proporcionado credenciales válidas, no envió el token Bearer o el token ha expirado o está alterado.
- **403 Forbidden:** Problema de autorización / permisos. El servidor reconoce e identifica perfectamente al usuario mediante su token válido, pero su rol (por ejemplo `user`) no tiene los privilegios necesarios para ejecutar la acción solicitada (por ejemplo eliminar una tarea).

## 10. ¿Por qué ocultar Eliminar no sustituye la autorización?

Ocultar el botón "Eliminar" en React es únicamente una conveniencia de interfaz gráfica y experiencia de usuario. Dado que el código del Frontend corre en el cliente, cualquier usuario puede modificar el DOM con las herramientas de desarrollador o enviar directamente una solicitud HTTP `DELETE` con `curl` o Postman. La verdadera autorización se garantiza en el Backend mediante el middleware de protección que valida el rol (`requireRole('admin')`), respondiendo `403 Forbidden` si no cuenta con dicho permiso.

## 11. ¿Cómo demuestras que v1.0.0 corresponde al deploy?

Se demuestra comparando el hash criptográfico del commit (`git rev-parse HEAD` o `git show v1.0.0`) con el commit hash que reporta Render en su historial de eventos de despliegue ("Deployed commit <hash>") y el historial de Git en GitHub. Cuando la etiqueta `v1.0.0` apunta exactamente al mismo commit que Render construyó exitosamente, queda trazabilidad inmutable y auditable de la versión liberada.

## 12. ¿Qué mejorarías para un sistema sensible?

1. **Almacenamiento de tokens:** Sustituir `sessionStorage` por cookies seguras con atributos `HttpOnly`, `Secure` y `SameSite=Strict`, eliminando el riesgo de robo de tokens mediante ataques XSS.
2. **Ciclo de vida de tokens:** Implementar tokens de acceso de muy corta duración (ej. 15 minutos) combinados con un mecanismo de *Refresh Tokens* rotativos y listas de revocación.
3. **Propiedad de recursos (Multitenancy):** Asociar cada tarea a su creador (`userId`) en la base de datos para que los usuarios solo puedan ver y gestionar sus propias tareas.
4. **Seguridad perimetral:** Agregar límites de tasa (Rate Limiting) en endpoints críticos como login/register y configuración de Content Security Policy (CSP) estricta en los encabezados HTTP.
