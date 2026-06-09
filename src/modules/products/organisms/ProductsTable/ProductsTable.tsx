import { DataTableCard, EmptyState, TableHeaderCell } from '@/components/common';
import { ProductTableRow } from '@/modules/products/molecules';
import type { Product } from '@/modules/products/types';

export interface ProductsTableProps {
  products: Product[];
  totalProducts: number;
}

const ProductsTable = ({ products, totalProducts }: ProductsTableProps) => {
  if (!products.length) {
    return (
      <EmptyState
        title="Sin productos"
        message="No hay productos que coincidan con los filtros seleccionados."
      />
    );
  }

  return (
    <DataTableCard
      title="Listado de productos"
      summary={`Mostrando ${products.length} de ${totalProducts} productos`}
    >
      <table className="min-w-full">
        <thead>
          <tr>
            <TableHeaderCell>Producto</TableHeaderCell>
            <TableHeaderCell>Categoría</TableHeaderCell>
            <TableHeaderCell>Proveedor</TableHeaderCell>
            <TableHeaderCell>Stock</TableHeaderCell>
            <TableHeaderCell>Estado</TableHeaderCell>
            <TableHeaderCell>Sugerido a pedir</TableHeaderCell>
            <TableHeaderCell align="right">Acciones</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <ProductTableRow key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </DataTableCard>
  );
};

export default ProductsTable;
