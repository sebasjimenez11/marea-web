import { useMemo, useState, type FormEvent } from 'react';
import { createInitialSupplierForm } from '@/modules/suppliers/lib';
import type { CreateSupplierInput } from '@/modules/suppliers/types';

export interface UseSupplierCreateFormOptions {
  onCreate: (supplier: CreateSupplierInput) => boolean | Promise<boolean>;
  onClose: () => void;
}

export interface UseSupplierCreateFormResult {
  form: CreateSupplierInput;
  updateField: <K extends keyof CreateSupplierInput>(field: K, value: CreateSupplierInput[K]) => void;
  handleClose: () => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim()) {
      return;
    }

    const wasCreated = await onCreate({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      status: form.status,
    });

    if (!wasCreated) {
      return;
    }

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
