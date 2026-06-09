# Frontend Architecture

## Capas principales

- `src/app`: composición global de la aplicación, shells y providers.
- `src/modules`: features de negocio aisladas por dominio (`dashboard`, `menu`, etc.).
- `src/components/common`: UI compartida y reutilizable entre módulos.
- `src/components/layout`: estructura visual global de las pantallas (`topbar`, page shell, etc.).

## Atomic design dentro de cada módulo

- `atoms`: piezas mínimas y reutilizables.
- `molecules`: combinación simple de atoms.
- `organisms`: bloques complejos de interfaz.
- `templates`: composición estructural de la feature.
- `pages`: entrada visual de cada pantalla.

## Reglas prácticas

- Preferir imports por alias `@/...` para evitar rutas como `../../../../`.
- Mantener tipos, hooks y servicios dentro del módulo cuando pertenezcan a una feature.
- Subir a `components/common` solo componentes realmente compartidos entre módulos.
- Si un componente deja de pertenecer claramente a una vista concreta, moverlo a `components/common`.
- Si una carpeta no tiene uso real inmediato, no crearla todavía.
- Crear `index.ts` en carpetas públicas para exponer una API clara del módulo.
- Evitar `export *` en el `index.ts` raíz de cada módulo. Exponer solo la API pública real.
- Dentro de `components/common` y `components/layout`, preferir imports relativos entre hermanos para evitar depender del propio barrel.
- No mezclar lógica de negocio entre módulos. Solo compartir presentación neutra o utilidades realmente genéricas.
- Antes de extraer algo a común, comprobar que no introduce props raras ni condicionales por dominio.

## Flujo recomendado

1. Crear la lógica en `services`, `hooks` y `types`.
2. Construir UI de menor a mayor: `atoms` -> `molecules` -> `organisms`.
3. Componer la pantalla en `templates` y `pages`.
4. Integrar la feature desde `src/app`.

## API pública por módulo

- Cada módulo debe exponer desde su `index.ts` raíz solo:
- `Page`
- `Template` principal si aporta valor
- `hook` principal si se consume desde fuera
- `service` principal si se consume desde fuera
- `types` del dominio

## Qué debe vivir en `components/common`

- Campos visuales compartidos como `FormField`.
- Headers o shells de sección como `PageHeader`, `SectionHeader`.
- Wrappers de tabla como `DataTableCard`.
- Botones de acción neutros como `TableRowActionButton`, `PanelActionButton`, `ModalActionButtons`.
- Piezas visuales sin conocimiento de negocio como `IconTile`, `PaginationButtons`.

## Qué no debe subirse a común

- Hooks de dominio.
- Reglas de negocio.
- Transformaciones de datos de una vista concreta.
- Componentes que necesiten props o estados específicos de una feature para funcionar.

## Estado actual del proyecto

- `dashboard`, `productos`, `inventario` y `proveedores` ya están separados por vista.
- Los shells de página y la carga async comparten infraestructura, pero no lógica de negocio.
- La UI neutra compartida se concentra en `components/common`.
- Las dependencias visuales entre módulos se han reducido para evitar acoplamiento innecesario.
- Los modales grandes ya están divididos en hooks de estado y bloques internos por feature.
- Los `index.ts` raíz deben mantenerse mínimos y no exponer atoms, molecules ni organisms internos.
