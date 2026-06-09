import { useMemo, useState, type FormEvent } from 'react';
import { createInitialSupplierForm } from '@/modules/suppliers/lib';
import type { CreateSupplierInput } from '@/modules/suppliers/types';

export interface UseSupplierCreateFormOptions {
  onCreate: (supplier: CreateSupplierInput) => void;
  onClose: () => void;
}

export interface UseSupplierCreateFormResult {
  form: CreateSupplierInput;
  updateField: <K extends keyof CreateSupplierInput>(field: K, value: CreateSupplierInput[K]) => void;
  handleClose: () => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export const useSupplierCreateForm = ({
  onCreate,
  onClose,
}: UseSupplierCreateFormOptions): UseSupplierCreateFormResult => {
  const initialForm = useMemo(() => createInitialSupplierForm(), []);
  const [form, setForm] = useState<CreateSupplierInput>(initialForm);

  const updateField = <K extends keyof CreateSupplierInput>(field: K, value: CreateSupplierInput[K]) => {
    setForm(current => ({ ...current, [field]: value }));
  };

  const handleClose = () => {
    setForm(initialForm);
    onClose();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      return;
    }

    onCreate({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      status: form.status,
    });

    setForm(initialForm);
    onClose();
  };

  return {
    form,
    updateField,
    handleClose,
    handleSubmit,
  };
};
