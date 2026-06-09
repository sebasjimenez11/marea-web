import { Button, SearchInput } from '@/components/common';
import { FilterSelect } from '@/modules/products/molecules';

export interface ProductsFiltersBarProps {
  search: string;
  supplier: string;
  category: string;
  suppliers: string[];
  categories: string[];
  onSearchChange: (value: string) => void;
  onSupplierChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onCreateClick: () => void;
}

const ProductsFiltersBar = ({
  search,
  supplier,
  category,
  suppliers,
  categories,
  onSearchChange,
  onSupplierChange,
  onCategoryChange,
  onCreateClick,
}: ProductsFiltersBarProps) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-col gap-3 md:flex-row">
        <SearchInput
          value={search}
          onSearch={onSearchChange}
          placeholder="Buscar producto..."
          className="w-full md:max-w-sm"
        />
        <div className="flex flex-wrap gap-3">
          <FilterSelect
            label="Proveedor"
            value={supplier}
            options={suppliers}
            onChange={onSupplierChange}
          />
          <FilterSelect
            label="Categoría"
            value={category}
            options={categories}
            onChange={onCategoryChange}
          />
        </div>
      </div>
      <Button className="self-start lg:self-auto" onClick={onCreateClick}>
        + Nuevo producto
      </Button>
    </div>
  );
};

export default ProductsFiltersBar;
