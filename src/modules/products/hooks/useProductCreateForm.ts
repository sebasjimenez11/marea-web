import { useMemo, useState, type FormEvent } from 'react';
import { createInitialProductForm } from '@/modules/products/lib';
import type { CreateProductInput } from '@/modules/products/types';

export interface UseProductCreateFormOptions {
  suppliers: string[];
  categories: string[];
  onCreate: (product: CreateProductInput) => void;
  onClose: () => void;
}

export interface UseProductCreateFormResult {
  form: CreateProductInput;
  updateField: <K extends keyof CreateProductInput>(field: K, value: CreateProductInput[K]) => void;
  handleClose: () => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export const useProductCreateForm = ({
  suppliers,
  categories,
  onCreate,
  onClose,
}: UseProductCreateFormOptions): UseProductCreateFormResult => {
  const initialForm = useMemo(
    () => createInitialProductForm(suppliers, categories),
    [suppliers, categories],
  );
  const [form, setForm] = useState<CreateProductInput>(initialForm);

  const updateField = <K extends keyof CreateProductInput>(field: K, value: CreateProductInput[K]) => {
    setForm(current => ({ ...current, [field]: value }));
  };

  const handleClose = () => {
    setForm(initialForm);
    onClose();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim() || !form.category || !form.supplier) {
      return;
    }

    onCreate({
      ...form,
      name: form.name.trim(),
      size: form.size.trim() || 'Sin formato',
      notes: form.notes.trim(),
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
