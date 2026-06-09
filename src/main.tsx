/**
 * Entry Point
 * 
 * Punto de entrada principal de la aplicación
 * Configura el router usando RouterProvider de React Router DOM v6+
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/routes/router';
import '@/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
