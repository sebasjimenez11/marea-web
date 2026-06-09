import { Modal, ModalActionButtons } from '@/components/common';
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
  onClose: () => void;
  onCreate: (product: CreateProductInput) => void;
}

const ProductCreateModal = ({
  open,
  suppliers,
  categories,
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
          confirmLabel="Guardar producto"
          confirmButtonProps={{ type: 'submit', form: 'create-product-form' }}
        />
      }
    >
      <form id="create-product-form" className="space-y-5" onSubmit={handleSubmit}>
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
