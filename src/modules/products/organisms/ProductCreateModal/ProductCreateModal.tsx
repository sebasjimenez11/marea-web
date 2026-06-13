import { AlertBanner, Modal, ModalActionButtons } from '@/components/common';
import { useProductCreateForm } from '@/modules/products/hooks';
import {
  ProductBasicsFields,
  ProductPricingFields,
  ProductStockFields,
} from '@/modules/products/molecules';
import type { CreateProductInput } from '@/modules/products/types';

export interface ProductCreateModalProps {
  open: boolean;
  suppliers: string[];
  categories: string[];
  error?: Error | null;
  isSaving?: boolean;
  onClose: () => void;
  onCreate: (product: CreateProductInput) => boolean | Promise<boolean>;
}

const ProductCreateModal = ({
  open,
  suppliers,
  categories,
  error,
  isSaving = false,
  onClose,
  onCreate,
}: ProductCreateModalProps) => {
  const { form, updateField, handleClose, handleSubmit } = useProductCreateForm({
    suppliers,
    categories,
    onCreate,
    onClose,
  });

  return (
    <Modal
      open={open}
      title="Nuevo producto"
      onClose={handleClose}
      footer={
        <ModalActionButtons
          onCancel={handleClose}
          confirmLabel={isSaving ? 'Guardando...' : 'Guardar producto'}
          confirmButtonProps={{
            type: 'submit',
            form: 'create-product-form',
            isLoading: isSaving,
          }}
        />
      }
    >
      <form id="create-product-form" className="space-y-5" onSubmit={handleSubmit}>
        {error && (
          <AlertBanner
            key={error.message}
            type="error"
            title="No se pudo crear el producto"
            message={error.message}
          />
        )}
        <ProductBasicsFields
          form={form}
          suppliers={suppliers}
          categories={categories}
          onFieldChange={updateField}
        />
        <ProductStockFields form={form} onFieldChange={updateField} />
        <ProductPricingFields form={form} onFieldChange={updateField} />
      </form>
    </Modal>
  );
};

export default ProductCreateModal;
