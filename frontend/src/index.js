import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.less'; // Importa los estilos generales
import App from './App';

const rootElement = document.getElementById('root');
createRoot(rootElement).render(<App />);
