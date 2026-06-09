import { Modal, ModalActionButtons } from '@/components/common';
import { useSupplierCreateForm } from '@/modules/suppliers/hooks';
import { SupplierContactFields } from '@/modules/suppliers/molecules';
import type { CreateSupplierInput } from '@/modules/suppliers/types';

export interface SupplierCreateModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (supplier: CreateSupplierInput) => void;
}

const SupplierCreateModal = ({ open, onClose, onCreate }: SupplierCreateModalProps) => {
  const { form, updateField, handleClose, handleSubmit } = useSupplierCreateForm({
    onCreate,
    onClose,
  });

  return (
    <Modal
      open={open}
      title="Nuevo proveedor"
      onClose={handleClose}
      footer={
        <ModalActionButtons
          onCancel={handleClose}
          confirmLabel="Guardar proveedor"
          confirmButtonProps={{ type: 'submit', form: 'create-supplier-form' }}
        />
      }
    >
      <form id="create-supplier-form" className="space-y-5" onSubmit={handleSubmit}>
        <SupplierContactFields form={form} onFieldChange={updateField} />
      </form>
    </Modal>
  );
};

export default SupplierCreateModal;
