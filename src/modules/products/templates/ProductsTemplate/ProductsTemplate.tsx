import { useState } from 'react';
import { EmptyState, ErrorState, LoadingState, PageHeader } from '@/components/common';
import { useApiMutation } from '@/app/hooks';
import { useProductsCatalog, useProductsData, useProductsFilters } from '@/modules/products/hooks';
import { ProductCreateModal, ProductsFiltersBar, ProductsTable } from '@/modules/products/organisms';
import { createProduct } from '@/modules/products/services';
import type { CreateProductInput } from '@/modules/products/types';

const ProductsTemplate = () => {
  const { data, isLoading, error, refetch } = useProductsData();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { products, suppliers, categories } = useProductsCatalog(
    data?.products ?? [],
    data?.suppliers ?? [],
    data?.categories ?? [],
  );
  const { filters, filteredProducts, setSearch, setSupplier, setCategory } = useProductsFilters(products);
  const createProductMutation = useApiMutation(createProduct, {
    onSuccess: () => {
      refetch();
    },
  });

  const handleCreateProduct = async (productInput: CreateProductInput) => {
    const product = await createProductMutation.mutate(productInput);
    return Boolean(product);
  };

  const handleOpenCreateModal = () => {
    createProductMutation.reset();
    setIsCreateModalOpen(true);
  };

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
        onCreateClick={handleOpenCreateModal}
      />

      <ProductsTable products={filteredProducts} totalProducts={products.length} />

      <ProductCreateModal
        open={isCreateModalOpen}
        suppliers={suppliers.filter(option => option !== 'Todos')}
        categories={categories.filter(option => option !== 'Todas')}
        error={createProductMutation.error}
        isSaving={createProductMutation.isPending}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default ProductsTemplate;
