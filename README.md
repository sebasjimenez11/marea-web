# Marea Web

Frontend desacoplado para la aplicacion interna Marea.

## Stack

- React
- Vite
- TypeScript
- TailwindCSS
- TanStack Query
- React Router

## Primeros pasos

```bash
npm install
cp .env.example .env
npm run dev
```

## Arquitectura

El frontend se organiza por features dentro de `src/features`. Cada feature tiene `api.ts`, `types.ts`, `hooks`, `components` y `pages`.

Este croquis deja el dashboard operativo, navegacion y contratos base. Las pantallas completas se desarrollaran por fases.
