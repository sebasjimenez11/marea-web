import { AlertBanner, Modal, ModalActionButtons } from '@/components/common';
import { useSupplierCreateForm } from '@/modules/suppliers/hooks';
import { SupplierContactFields } from '@/modules/suppliers/molecules';
import type { CreateSupplierInput } from '@/modules/suppliers/types';

export interface SupplierCreateModalProps {
  open: boolean;
  error?: Error | null;
  isSaving?: boolean;
  onClose: () => void;
  onCreate: (supplier: CreateSupplierInput) => boolean | Promise<boolean>;
}

const SupplierCreateModal = ({
  open,
  error,
  isSaving = false,
  onClose,
  onCreate,
}: SupplierCreateModalProps) => {
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
          confirmLabel={isSaving ? 'Guardando...' : 'Guardar proveedor'}
          confirmButtonProps={{
            type: 'submit',
            form: 'create-supplier-form',
            isLoading: isSaving,
          }}
        />
      }
    >
      <form id="create-supplier-form" className="space-y-5" onSubmit={handleSubmit}>
        {error && (
          <AlertBanner
            key={error.message}
            type="error"
            title="No se pudo crear el proveedor"
            message={error.message}
          />
        )}
        <SupplierContactFields form={form} onFieldChange={updateField} />
      </form>
    </Modal>
  );
};

export default SupplierCreateModal;
