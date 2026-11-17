# Preguntas de cierre EC3 F3 A11

## 1. ¿Qué diferencia existe entre autenticación y autorización?

La **autenticación** es el proceso mediante el cual el sistema verifica la identidad de un usuario (responde a la pregunta *¿quién eres?*), por ejemplo comprobando sus credenciales (correo y contraseña) o validando un token de acceso firmado. Por otro lado, la **autorización** determina los permisos y privilegios que posee un usuario previamente autenticado para realizar una acción específica o acceder a un recurso determinado (responde a la pregunta *¿qué tienes permitido hacer?*), como comprobar si posee el rol `admin` para eliminar un elemento.

## 2. ¿Qué información guarda sessionStorage y qué información no debe guardar?

- **Qué guarda:** Guarda exclusivamente el token de acceso (`accessToken`) de corta o mediana duración, permitiendo sostener la sesión activa durante la vida de la pestaña del navegador.
- **Qué NO debe guardar:** No debe guardar contraseñas en texto plano, datos sensibles del usuario (como tarjetas de crédito o información personal confidencial), tokens de larga duración sin expiración, ni secretos criptográficos del servidor (`JWT_SECRET`). Además, los datos del usuario (`AuthUser`) se conservan en memoria (React state) y se refrescan desde el backend para evitar estados desfasados.

## 3. ¿Por qué se consulta /api/auth/me al recargar?

Porque al recargar la página (F5 o actualización del navegador), el estado de la memoria JavaScript de React se destruye por completo. Para no obligar al usuario a iniciar sesión nuevamente ni confiar ciegamente en datos almacenados en el cliente que podrían estar alterados, el Frontend toma el `accessToken` de `sessionStorage` y consulta `/api/auth/me`. Esto permite al servidor validar la firma y vigencia del JWT y devolver el perfil legítimo y actualizado del usuario (`id`, `name`, `email`, `role`).

## 4. ¿Por qué el Frontend no debe confiar en decodificar un JWT sin verificarlo?

Un JSON Web Token se compone de tres partes codificadas en Base64Url (encabezado, payload y firma). Aunque cualquier cliente puede decodificar el payload en JavaScript (`jwt-decode` o `atob`), el Frontend no posee la clave secreta (`JWT_SECRET`) para verificar si la firma criptográfica es legítima o si los datos del payload (como el rol de usuario) fueron manipulados maliciosamente en el almacenamiento del navegador. Confiar sin validación del servidor abriría una vulnerabilidad crítica de elevación de privilegios.

## 5. ¿Qué responsabilidad tiene AuthProvider?

`AuthProvider` actúa como el orquestador global del estado de autenticación de la aplicación:
- Administra el estado reactivo de la sesión (`status`, `user`, `accessToken`, `errorMessage`).
- Inicializa y coordina la validación de la sesión al montar la aplicación consultando `/api/auth/me`.
- Provee los métodos de ciclo de vida (`login`, `register`, `logout`, `retrySession`).
- Registra el manejador de desautorización (401) en el cliente HTTP para cerrar sesión automáticamente si el token caduca o es revocado.
- Expone todo este contexto a los componentes hijos mediante `AuthContext.Provider`.

## 6. ¿Qué beneficio ofrece useAuth?

Encapsula el acceso a `AuthContext` y aplica una validación de seguridad de desarrollo: comprueba que el hook se invoque dentro del árbol de componentes envuelto por un `AuthProvider`, lanzando un error descriptivo si se usa fuera de él. Además, simplifica el consumo del contexto evitando importar `useContext` y `AuthContext` individualmente en cada componente.

## 7. ¿Qué representa el estado checking?

Representa la fase transitoria en la que el Frontend está comprobando si existe una sesión válida previamente almacenada. Ocurre al cargar o refrescar la aplicación mientras se recupera el token de `sessionStorage` y se espera la respuesta asíncrona de `/api/auth/me`. Durante este estado, las rutas protegidas muestran un indicador de carga ("Verificando sesión...") en lugar de redirigir erróneamente al usuario al `/login` antes de tiempo.

## 8. ¿Qué diferencia existe entre 401 y 403?

- **401 Unauthorized:** Significa que la petición carece de credenciales válidas de autenticación (el usuario no está autenticado, no envió token o el token expiró/es inválido).
- **403 Forbidden:** Significa que el servidor reconoce quién es el usuario (está autenticado), pero este no cuenta con los permisos o privilegios necesarios para ejecutar la acción solicitada (por ejemplo, un usuario con rol `user` intentando eliminar un recurso que solo un `admin` puede borrar).

## 9. ¿Por qué ProtectedRoute no sustituye la seguridad del Backend?

`ProtectedRoute` es únicamente una capa de experiencia de usuario (UX) en el cliente para guiar la navegación en la SPA. Dado que el código que corre en el navegador del usuario puede ser modificado, inspeccionado o saltado (por ejemplo, alterando el estado de React en herramientas de desarrollo o enviando peticiones HTTP directas con `curl` o Postman), la seguridad real y definitiva debe residir siempre en el Backend mediante la validación obligatoria de firmas de token y permisos en cada endpoint.

## 10. ¿Por qué ocultar Eliminar a user no constituye autorización?

Ocultar visualmente un botón en la interfaz gráfica es simplemente una conveniencia de usabilidad para no mostrar opciones que el usuario no puede utilizar. No constituye autorización porque cualquier usuario malintencionado puede inspeccionar el DOM, modificar el botón para hacerlo visible o emitir una petición `DELETE` directa al endpoint de la API REST. La verdadera autorización se ejecuta en el middleware del Backend (`requireRole('admin')`), respondiendo con un código HTTP `403 Forbidden`.

## 11. ¿Por qué un cambio de rol exige iniciar sesión de nuevo?

Porque el rol del usuario se encuentra típicamente codificado dentro del payload del JWT que fue firmado criptográficamente al momento del login. Un token emitido es inmutable en el cliente. Si en la base de datos se modifica el rol del usuario de `user` a `admin` (o viceversa), el token existente seguirá conteniendo el rol anterior hasta que expire o se genere un nuevo token mediante un nuevo inicio de sesión.

## 12. ¿Qué ocurre realmente al seleccionar Cerrar sesión?

Al pulsar "Cerrar sesión":
1. Se limpia el estado reactivo en React, cambiando `status` a `'anonymous'`, `user` a `null`, y `accessToken` a `null`.
2. Se elimina la clave `accessToken` almacenada en el `sessionStorage` del navegador.
3. Se redirige la vista del usuario a la ruta pública `/login`.
4. En arquitecturas JWT sin lista de revocación (denylist), el token no se destruye en el servidor, sino que el cliente simplemente se deshace de él para no volverlo a enviar.

## 13. ¿Qué riesgo conserva sessionStorage ante XSS?

Cualquier dato accesible desde JavaScript a través de la Web Storage API (`localStorage` o `sessionStorage`) es vulnerable a ataques de Cross-Site Scripting (XSS). Si un script malicioso logra ejecutarse en el contexto del Frontend (por inyección de código o librerías comprometidas), dicho script puede leer `sessionStorage.getItem(...)` y exfiltrar el token hacia un servidor externo. Por ello, la alternativa más robusta en producción es utilizar cookies con los atributos `HttpOnly`, `Secure` y `SameSite`.

## 14. ¿Por qué las tareas todavía no pertenecen a un usuario específico?

Porque en el modelo de datos actual de la base de datos las tareas no tienen asociada una clave foránea o referencia al usuario creador (por ejemplo, un campo `userId` u `owner`). Las tareas existen a nivel global de la colección y la protección actual se limita a exigir que quien interactúe con ellas esté autenticado y que solo el rol administrador pueda borrarlas. Asociar tareas por usuario (multitenancy / propiedad de recursos) corresponde a fases de desarrollo posteriores.

## 15. ¿Qué dificultad encontraste al integrar la sesión y cómo la resolviste?

La principal dificultad técnica fue la sincronización entre el estado asíncrono de verificación inicial (`checking`) y el consumo del `accessToken` en los hooks de consulta como `useTaskList`. En TypeScript estricto, el token podía inferirse como `string | null` dentro de funciones asíncronas internas (`load`), generando errores de tipo `TS2345`. Esto se resolvió aplicando un estrechamiento de tipos seguro (`narrowing`), guardando el token validado en una constante inmutable local (`const currentToken = accessToken;`) antes de pasarlo a las llamadas del servicio de tareas, y asegurando que las rutas protegidas no rendericen su contenido hasta que el estado deje de ser `checking`.
