import { useState } from 'react';
import { EmptyState, ErrorState, LoadingState, PageHeader } from '@/components/common';
import { useProductsCatalog, useProductsData, useProductsFilters } from '@/modules/products/hooks';
import { ProductCreateModal, ProductsFiltersBar, ProductsTable } from '@/modules/products/organisms';

const ProductsTemplate = () => {
  const { data, isLoading, error } = useProductsData();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { products, suppliers, categories, handleCreateProduct } = useProductsCatalog(data?.products ?? []);
  const { filters, filteredProducts, setSearch, setSupplier, setCategory } = useProductsFilters(products);

  if (isLoading) {
    return <LoadingState message="Cargando productos..." />;
  }

  if (error) {
    return <ErrorState title="Error al cargar productos" />;
  }

  if (!data) {
    return <EmptyState title="Sin datos de productos" />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Productos"
        subtitle="Consulta stock, proveedores y sugerencias de reposición."
      />

      <ProductsFiltersBar
        search={filters.search}
        supplier={filters.supplier}
        category={filters.category}
        suppliers={suppliers}
        categories={categories}
        onSearchChange={setSearch}
        onSupplierChange={setSupplier}
        onCategoryChange={setCategory}
        onCreateClick={() => setIsCreateModalOpen(true)}
      />

      <ProductsTable products={filteredProducts} totalProducts={products.length} />

      <ProductCreateModal
        open={isCreateModalOpen}
        suppliers={suppliers.filter(option => option !== 'Todos')}
        categories={categories.filter(option => option !== 'Todas')}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default ProductsTemplate;
