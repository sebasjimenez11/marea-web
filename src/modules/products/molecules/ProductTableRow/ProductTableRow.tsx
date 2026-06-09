import { IconTile, TableRowActionButton } from '@/components/common';
import { formatProductStock, formatSuggestedOrder } from '@/modules/products/lib';
import { ProductsStatusBadge, StockIndicator } from '@/modules/products/atoms';
import { ProductIdentity } from '@/modules/products/molecules';
import type { Product } from '@/modules/products/types';

export interface ProductTableRowProps {
  product: Product;
}

const ProductTableRow = ({ product }: ProductTableRowProps) => {
  return (
    <tr className="border-t border-white/8 transition hover:bg-white/[0.03]">
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <IconTile>◫</IconTile>
          <ProductIdentity name={product.name} size={product.size} />
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-text-secondary">{product.category}</td>
      <td className="px-4 py-4 text-sm text-text-secondary">{product.supplier}</td>
      <td className="px-4 py-4">
        <StockIndicator
          value={formatProductStock(product)}
          highlight={product.status !== 'in-stock'}
        />
      </td>
      <td className="px-4 py-4">
        <ProductsStatusBadge status={product.status} />
      </td>
      <td className="px-4 py-4 text-sm font-medium text-[#f8b26a]">
        {formatSuggestedOrder(product.suggestedOrderCases)}
      </td>
      <td className="px-4 py-4 text-right">
        <TableRowActionButton type="button">
          Editar
        </TableRowActionButton>
      </td>
    </tr>
  );
};

export default ProductTableRow;
