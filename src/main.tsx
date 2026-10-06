import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';

// Busca en index.html el elemento donde React dibujará toda la aplicación.
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('No se encontró el elemento #root.');
}

// Renderiza la aplicación; StrictMode ayuda a detectar problemas durante el desarrollo.
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
