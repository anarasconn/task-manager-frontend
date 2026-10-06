// Solo se permiten estos dos estados para una tarea.
type TaskStatus = 'pending' | 'completed';

// Datos que el componente necesita para mostrar una tarea.
interface TaskItemProps {
  title: string;
  status: TaskStatus;
}

// Presenta el título, el estado y los controles deshabilitados de una tarea.
export function TaskItem({ title, status }: TaskItemProps) {
  const statusLabel =
    status === 'completed' ? 'Completada' : 'Pendiente';

  return (
    <article
      className={`task-item task-item--${status}`}
      role="listitem"
    >
      <div className="task-item__content">
        <h3 className="task-item__title">{title}</h3>
        <span className={`status-badge status-badge--${status}`}>
          {statusLabel}
        </span>
      </div>

      <div
        className="task-item__actions"
        role="group"
        aria-label={`Acciones para ${title}`}
      >
        <button type="button" disabled>Cambiar estado</button>
        <button type="button" disabled>Editar</button>
        <button type="button" className="button-danger" disabled>
          Eliminar
        </button>
      </div>
    </article>
  );
}
