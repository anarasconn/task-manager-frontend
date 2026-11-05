# Preguntas de cierre EC2 F3 A8

## 1 ¿Por qué las reglas de validación se colocaron en una utilidad?
Para escribir la regla una sola vez y usarla en el formulario de registro y en el de edición. Si estuviera duplicada en cada componente, al cambiarla tendría que corregirla en dos lugares y podrían quedar distintas.

## 2 ¿Qué significa el retorno string o null de validateTaskTitle?
Si el título es inválido, la función devuelve un texto con el mensaje de error. Si es válido, devuelve null. Así quien la usa tiene que revisar si hay mensaje antes de guardar.

## 3 ¿Qué función cumplen aria-invalid, aria-describedby y role alert?
aria-invalid avisa a los lectores de pantalla que el campo tiene un valor inválido. aria-describedby conecta el campo con el texto de ayuda y el de error. role="alert" hace que el error se anuncie en cuanto aparece.

## 4 ¿Por qué query, filter y sortBy son estados controlados?
Porque su valor vive en el estado de App y cada campo (buscador y selectores) muestra ese valor. Cuando el usuario cambia algo, el componente avisa a App con una función y App actualiza el estado. Así React siempre sabe cuál es el valor actual.

## 5 ¿Por qué visibleTasks no debe almacenarse como estado independiente?
Porque se puede calcular a partir de tasks, query, filter y sortBy en cada renderizado. Si fuera otro estado, tendría dos listas que sincronizar y podrían quedar inconsistentes, por ejemplo mostrando un título viejo después de editar.

## 6 ¿Cómo se normaliza una búsqueda?
Se quitan los espacios del inicio y del final con trim y se convierte el texto a minúsculas con toLocaleLowerCase. También se pasa a minúsculas el título de cada tarea. Así "Programar" y "programar" dan el mismo resultado.

## 7 ¿Por qué se crea una copia antes de utilizar sort?
Porque sort modifica el arreglo sobre el que se ejecuta. Con una copia hecha con spread, el arreglo original de tasks no se altera y el orden solo afecta lo que se muestra.

## 8 ¿Qué responsabilidad tiene task-query.service.ts?
Recibe las tareas y los criterios, y devuelve la lista filtrada y ordenada. No usa React ni cambia el estado: solo transforma datos.

## 9 ¿Por qué el resultado de JSON.parse se trata como unknown?
Porque JSON.parse puede devolver cualquier cosa, y los datos de localStorage pueden haber sido modificados o estar dañados. Con unknown estoy obligada a comprobar su forma antes de usarlos como tareas.

## 10 ¿Qué comprueba la función isTask?
Comprueba que el valor sea un objeto y que tenga id y title de tipo texto, un status válido (pending o completed) y fechas createdAt y updatedAt que sean texto y fechas reales.

## 11 ¿Qué ventaja ofrece la inicialización diferida de useState?
React ejecuta la función inicial solo una vez, al crear el estado. Así localStorage se lee una sola vez y no en cada renderizado.

## 12 ¿Por qué localStorage se sincroniza mediante useEffect?
Porque localStorage es un sistema externo a React y guardar en él es un efecto secundario. useEffect lo ejecuta después de renderizar, y con la dependencia [tasks] solo guarda cuando la colección cambia.

## 13 ¿Por qué TaskSummary recibe tasks y TaskList recibe visibleTasks?
El resumen debe mostrar los totales reales de todas las tareas, sin importar la búsqueda o el filtro. La lista solo debe mostrar los resultados de la consulta.

## 14 ¿Qué información se pierde y cuál permanece al recargar?
Permanecen las tareas, porque están guardadas en localStorage. Se pierden la búsqueda, el filtro y el orden, que vuelven a sus valores iniciales, y cualquier texto escrito a medias en los formularios.

## 15 ¿Qué dificultad encontraste y cómo la resolviste?
Me apareció el error "Cannot find module" al importar task-storage.service en App.tsx. Corregí el nombre del archivo y reinicié el servidor de TypeScript de VS Code para que se actualizara.