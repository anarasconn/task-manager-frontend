interface AppFooterProps {
  courseName: string;
}

// Muestra el pie de página; el nombre del curso llega desde App como propiedad.
export function AppFooter({ courseName }: AppFooterProps) {
  return (
    <footer className="app-footer">
      <div className="app-footer__content">
        <p>Administrador de tareas - {courseName}</p>
      </div>
    </footer>
  );
}
