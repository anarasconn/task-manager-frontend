# Preguntas de cierre - EC2 F2 A7

## 1. ¿Qué diferencia existe entre una variable local y el estado de React?

Una variable local se reinicia en cada renderizado y, si cambia, React no actualiza la pantalla. El estado lo recuerda React entre renderizados y, cuando cambia, vuelve a dibujar el componente con el valor nuevo.

## 2. ¿Qué valores devuelve useState?

Devuelve un arreglo con dos valores: el valor actual del estado y una función para pedir a React un valor nuevo. Por ejemplo: `const [tasks, setTasks] = useState(...)`.

## 3. ¿Por qué useState se declara en el nivel superior del componente?

Porque React identifica cada Hook por el orden en que se ejecutan. Si se declara dentro de un if, un ciclo o una función, el orden puede cambiar entre renderizados y React se confunde.

## 4. ¿Qué significa que un campo sea controlado?

Que su valor viene del estado de React (`value={title}`) y cada cambio actualiza ese estado con `onChange`. Así, React controla siempre lo que muestra el campo.

## 5. ¿Por qué handleSubmit utiliza preventDefault?

Porque por defecto un formulario HTML recarga la página al enviarse. `preventDefault` evita eso para que React maneje el envío sin perder el estado de la aplicación.

## 6. ¿Cómo comunica TaskForm una nueva tarea a App?

App le envía a TaskForm una función por props llamada `onAddTask`. Cuando se envía el formulario, TaskForm la ejecuta con el título y App se encarga de crear y guardar la tarea.

## 7. ¿Por qué App funciona como fuente de verdad?

Porque la colección de tareas se guarda una sola vez, en el estado de App. Los demás componentes reciben esos datos por props, así no hay copias que se desincronicen.

## 8. ¿Cómo se implementa Create sin utilizar push?

Se crea un arreglo nuevo con spread: `[newTask, ...currentTasks]`. Así se agrega la tarea sin modificar el arreglo original del estado.

## 9. ¿Cómo permite map actualizar una sola tarea?

`map` recorre todas las tareas y devuelve un arreglo nuevo. Si el id coincide con el buscado, devuelve una copia de la tarea con los cambios; si no coincide, devuelve la tarea sin cambios.

## 10. ¿Cómo utiliza filter la operación Delete?

`filter` crea un arreglo nuevo que conserva solo las tareas con un id diferente al seleccionado. La tarea que se quiere eliminar queda fuera del nuevo arreglo.

## 11. ¿Por qué se emplea una función actualizadora en setTasks?

Porque el nuevo estado depende del anterior. La función recibe el estado más reciente (`currentTasks`), lo que evita trabajar con datos desactualizados.

## 12. ¿Qué información conserva TaskItem como estado local?

Conserva `isEditing`, que indica si la tarea está en modo edición, y `draftTitle`, que guarda el título que se está escribiendo mientras se edita. La colección de tareas no se guarda ahí, sino en App.

## 13. ¿Por qué los cambios desaparecen al recargar la página?

Porque el estado de React solo existe en la memoria mientras la página está abierta. Al recargar, la aplicación se inicia de nuevo con las tareas iniciales. Todavía no se usa localStorage ni la API REST para guardarlas.

## 14. ¿Qué dificultad encontraste y cómo la resolviste?

Al empezar la actividad, `git status` mostraba archivos borrados de las preguntas de cierre de la actividad 6, porque estaban en una carpeta incorrecta y sin la extensión .md. Los moví a `docs/` con el nombre correcto, hice commit y dejé el repositorio limpio antes de continuar.