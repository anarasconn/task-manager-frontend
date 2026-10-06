# Preguntas de cierre - EC2 F1 A5

## 1. ¿Qué problema resuelve React al construir una interfaz?

React permite construir interfaces divididas en piezas pequeñas y reutilizables en lugar de escribir una sola página enorme. Esto vuelve el código más ordenado, fácil de mantener y de actualizar cuando la información cambia.

## 2. ¿Qué es un componente?

Es una función que devuelve la representación de una parte de la interfaz, por ejemplo un encabezado, un formulario o una tarea. Puede usarse dentro de otros componentes.

## 3. ¿Por qué los componentes comienzan con mayúscula?

Porque React usa la mayúscula inicial para distinguir un componente propio (como TaskForm) de una etiqueta HTML normal (como form). Si empezara con minúscula, React lo trataría como una etiqueta HTML.

## 4. ¿Qué diferencia existe entre HTML y TSX?

TSX es una sintaxis parecida a HTML que se escribe dentro de TypeScript. Cambia algunos atributos (className en lugar de class, htmlFor en lugar de for), exige cerrar todas las etiquetas y permite insertar expresiones de JavaScript entre llaves.

## 5. ¿Para qué se utiliza className?

Para asignar clases CSS a un elemento en TSX. Se usa en lugar de class porque class es una palabra reservada de JavaScript.

## 6. ¿Qué son las propiedades o props?

Son los datos que un componente padre envía a un componente hijo, como title y status en TaskItem. Permiten reutilizar el mismo componente con información diferente.

## 7. ¿Cómo ayuda TypeScript a validar las propiedades?

Con interfaces o tipos se define qué propiedades debe recibir cada componente y de qué tipo son. Si se envía un dato incorrecto, por ejemplo una cadena donde se espera un número, TypeScript marca el error antes de ejecutar la aplicación.

## 8. ¿Cuál es la responsabilidad de App.tsx?

Coordinar la estructura general: importa los componentes principales y los organiza en la página (encabezado, formulario, filtros, resumen, lista y pie de página).

## 9. ¿Por qué la interfaz se dividió en varios componentes?

Para que cada parte tenga una sola responsabilidad. Así el código es más claro, se puede reutilizar y es más fácil corregir o ampliar una parte sin afectar las demás.

## 10. ¿Por qué los botones todavía están deshabilitados?

Porque en esta actividad aún no se usan estado ni eventos. Primero se construye la estructura visual y el comportamiento se agregará en actividades posteriores.

## 11. ¿Qué componente consideras más reutilizable y por qué?

TaskItem, porque con la misma estructura muestra tareas distintas solo cambiando las propiedades title y status. Más adelante podrá repetirse para cualquier cantidad de tareas.

## 12. ¿Qué dificultad encontraste y cómo la resolviste?

Al principio la aplicación mostró un error porque App.tsx importaba componentes cuyos archivos aún no existían (AppHeader y AppFooter). Lo resolví revisando con Get-ChildItem qué archivos faltaban y creándolos en src/components. También tuve que corregir la URL del repositorio remoto con git remote set-url.
