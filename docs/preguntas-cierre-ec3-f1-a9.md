# Preguntas de cierre - EC3 F1 A9

## 1. ¿Qué es una aplicación de página única?
Es una aplicación web (Single Page Application o SPA) que carga una sola estructura HTML inicial y actualiza las vistas dinámicamente mediante JavaScript según el usuario navega, sin necesidad de solicitar un nuevo documento completo al servidor ni recargar la página.

## 2. ¿Qué responsabilidad tiene BrowserRouter?
Proporciona el contexto general de navegación a todos los componentes de la aplicación y conecta el enrutamiento con el historial del navegador (History API), permitiendo usar las rutas URL y los botones Atrás y Adelante. Debe envolver la aplicación una sola vez.

## 3. ¿Cuál es la diferencia entre Routes y Route?
`Routes` es el contenedor que evalúa la URL actual y selecciona la mejor coincidencia entre sus ramas. `Route` es la definición individual de una ruta, que asocia un patrón de dirección (`path`) con el elemento o componente que debe representarse (`element`).

## 4. ¿Qué es una ruta índice?
Es la ruta predeterminada que se muestra en el `Outlet` de un componente layout padre cuando la dirección coincide exactamente con la del padre. En este proyecto, representa la página de inicio en la ruta raíz `/`.

## 5. ¿Qué beneficio ofrece un layout?
Concentra la estructura visual común (encabezado, barra de navegación y pie de página) en un solo lugar, evitando la repetición de código y permitiendo que solo cambie el área de contenido principal entre distintas vistas.

## 6. ¿Qué función cumple Outlet?
Indica el punto exacto dentro del componente de layout donde debe insertarse y renderizarse el componente de la página hija seleccionada por el enrutador según la ruta activa.

## 7. ¿Qué diferencia existe entre Link y NavLink?
Ambos crean enlaces internos que navegan sin recargar la página. La diferencia es que `NavLink` proporciona información sobre si la ruta a la que apunta está activa actualmente (a través de `isActive`), lo que permite asignarle estilos visuales al elemento seleccionado en el menú.

## 8. ¿Por qué no se utilizan enlaces a para navegar internamente?
Porque las etiquetas `<a href="...">` tradicionales solicitan una nueva página HTML al servidor y provocan una recarga completa del navegador, lo que reinicia el estado de React en memoria y rompe el comportamiento fluido de una SPA.

## 9. ¿Qué representa :taskId?
Representa un parámetro dinámico o variable en la dirección URL (`/tasks/:taskId`), que permite capturar e identificar una tarea en particular sin crear una ruta estática para cada una.

## 10. ¿Cómo se recupera un parámetro dinámico?
Se recupera utilizando el hook `useParams` de React Router, el cual retorna un objeto con los valores de los parámetros declarados en la ruta (por ejemplo, `const { taskId } = useParams<{ taskId: string }>();`).

## 11. ¿Cuándo debe utilizarse useNavigate?
Debe utilizarse cuando la navegación se dispara programáticamente a partir de una función o evento, como redirigir al usuario a `/tasks` inmediatamente después de eliminar una tarea desde su vista de detalle.

## 12. ¿Qué función cumple la ruta *?
Actúa como ruta comodín (catch-all) que captura cualquier URL que no coincida con las rutas declaradas anteriormente, permitiendo presentar una vista de error 404 controlada e informativa.

## 13. ¿Por qué el estado continúa administrado por App?
Para conservar una única fuente de verdad compartida entre todas las rutas. `App` distribuye los datos y funciones a través de props hacia las páginas correspondientes, manteniendo sincronizadas las estadísticas de inicio, el listado y el detalle.

## 14. ¿Por qué localStorage permanece en esta actividad?
Permanece para garantizar la persistencia de las tareas en el almacenamiento local mientras se establece la arquitectura de navegación con React Router, sirviendo de base antes de conectar la API REST en la siguiente actividad.

## 15. ¿Qué dificultad encontraste y cómo la resolviste?
Al configurar las reglas responsivas en `index.css`, fue necesario cuidar la integración de los selectores de `.app-navigation` y `.task-detail` dentro de la regla existente `@media (max-width: 760px)` sin anidar bloques de medios duplicados, asegurando que tanto la navegación como los botones se apilen correctamente en pantallas estrechas.
