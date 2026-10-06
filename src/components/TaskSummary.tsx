// Define los conteos que el componente padre debe proporcionar.
interface TaskSummaryProps {
  total: number;
  pending: number;
  completed: number;
}

// Presenta los totales recibidos; no calcula las cantidades por sí mismo.
export function TaskSummary({
  total,
  pending,
  completed,
}: TaskSummaryProps) {
  return (
    <section className="summary-grid" aria-label="Resumen de tareas">
      <article className="summary-card">
        <span>Total</span>
        <strong>{total}</strong>
      </article>
      <article className="summary-card">
        <span>Pendientes</span>
        <strong>{pending}</strong>
      </article>
      <article className="summary-card">
        <span>Completadas</span>
        <strong>{completed}</strong>
      </article>
    </section>
  );
}
