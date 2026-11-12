# Preguntas de cierre - EC3 F2 A10

## 1. ¿Qué diferencia existe entre una falla de red y una respuesta HTTP 404?
Una falla de red ocurre cuando el navegador no logra establecer comunicación con el servidor (por ejemplo, el servidor está apagado, no hay conexión a internet o falló el DNS), provocando que `fetch` rechace la promesa. Una respuesta HTTP 404 sí establece conexión con el servidor y devuelve una respuesta HTTP válida, pero indica que la ruta o el recurso solicitado no existe en el backend.

## 2. ¿Por qué debe comprobarse response.ok después de fetch?
Porque la función nativa `fetch` no rechaza su promesa cuando el servidor responde con códigos de error HTTP como 400, 404 o 500; para `fetch`, cualquier respuesta del servidor es una promesa resuelta. Comprobar `response.ok` (que solo es `true` para códigos de estado 200 a 299) es indispensable para identificar respuestas no satisfactorias y manejarlas como errores controlados en la aplicación.

## 3. ¿Qué responsabilidad tiene http.service.ts?
Es el cliente HTTP genérico y centralizado del proyecto. Se encarga de definir encabezados estándar (`Accept`, `Content-Type`), procesar respuestas JSON, gestionar respuestas sin contenido (204 No Content), verificar `response.ok`, capturar errores de red o de la API y transformarlos en instancias consistentes de `HttpError`.

## 4. ¿Qué responsabilidad tiene task.api.service.ts?
Representa la capa de servicios específica para la entidad de tareas. Traduce las intenciones de la aplicación en llamadas a rutas concretas (`/tasks`, `/tasks/:id`), construye las cadenas de consulta con `URLSearchParams` para filtros, paginación y ordenamiento, y envía las cargas útiles correspondientes para operaciones POST, PATCH y DELETE.

## 5. ¿Por qué VITE_API_URL no debe contener credenciales?
Porque Vite incrusta todas las variables con prefijo `VITE_` directamente en el código JavaScript compilado para el navegador. Al ser código del lado del cliente, cualquier usuario puede inspeccionar los archivos fuente; incluir credenciales o cadenas de conexión de base de datos como las de MongoDB Atlas expondría completamente la seguridad del sistema.

## 6. ¿Qué problema resuelve el proxy de Vite durante el desarrollo?
Resuelve las restricciones de CORS (Cross-Origin Resource Sharing). Debido a que la aplicación React se ejecuta en `http://localhost:5173` y la API en `http://localhost:3000`, son orígenes distintos. El proxy de Vite reenvía las solicitudes de `/api` directamente al servidor Express a nivel de red local, evitando que el navegador bloquee las solicitudes por políticas de mismo origen.

## 7. ¿Por qué el proxy no sustituye la configuración de producción?
Porque el proxy de Vite solo opera a través del servidor de desarrollo local ejecutado con `pnpm dev`. En un despliegue de producción los archivos son estáticos y son entregados por servidores web como Nginx o plataformas de hosting, requiriendo que CORS o un proxy inverso se configuren formalmente en la infraestructura de producción.

## 8. ¿Qué función cumple AbortController?
Permite abortar peticiones HTTP en curso que ya no son necesarias. Si el usuario escribe rápidamente en el buscador o cambia varias veces de filtro o página, `AbortController` cancela las consultas intermedias pendientes para evitar condiciones de carrera (race conditions) donde una respuesta desfasada reemplace los resultados más actuales.

## 9. ¿Por qué la ruta de detalle consulta la tarea por id?
Porque en una arquitectura SPA con rutas dinámicas (`/tasks/:taskId`) el usuario puede recargar el navegador directamente en el detalle o ingresar mediante un enlace directo. Si el componente dependiera de la lista de tareas en memoria, la información no existiría; consultarla individualmente por su identificador permite que la página funcione de manera independiente.

## 10. ¿Por qué el formulario se limpia únicamente después de un POST satisfactorio?
Para proteger la experiencia de usuario y evitar la pérdida de datos. Si la petición falla por problemas de conexión o validaciones del servidor, el texto escrito se conserva en el campo de entrada, permitiendo al usuario corregirlo o reintentar sin tener que escribirlo todo nuevamente.

## 11. ¿Qué ventaja ofrece separar la consulta remota de los componentes visuales?
Favorece la mantenibilidad, escalabilidad y la separación de responsabilidades. Los componentes visuales se dedican exclusivamente a renderizar la interfaz y capturar eventos, mientras que la lógica de comunicación, serialización de parámetros, control de latencia y gestión de errores permanece aislada en servicios y hooks reutilizables.

## 12. ¿Qué cambio fue más difícil y cómo comprobaste que funcionaba?
El manejo integral del ciclo asíncrono y las mutaciones en `TasksPage` junto al hook `useTaskList`, sincronizando los estados de carga (`loading`), error (`error`), vacío (`empty`) y éxito (`success`), además de reiniciar a la página 1 tras mutaciones y cancelar solicitudes obsoletas con `AbortController`. Comprobé su correcto funcionamiento mediante la compilación de TypeScript con `pnpm build`, validación estática con `oxlint` sin errores y la comprobación de los estados y transiciones en la interfaz.
