import { FormField, SelectMenu, formControlClassName } from '@/components/common';
import type { CreateProductInput } from '@/modules/products/types';

export interface ProductBasicsFieldsProps {
  form: CreateProductInput;
  suppliers: string[];
  categories: string[];
  onFieldChange: <K extends keyof CreateProductInput>(field: K, value: CreateProductInput[K]) => void;
}

const ProductBasicsFields = ({
  form,
  suppliers,
  categories,
  onFieldChange,
}: ProductBasicsFieldsProps) => (
  <>
    <FormField label="Nombre del producto">
      <input
        value={form.name}
        onChange={event => onFieldChange('name', event.target.value)}
        className={formControlClassName}
        placeholder="Ej. Heineken"
      />
    </FormField>

    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <FormField label="Formato">
        <input
          value={form.size}
          onChange={event => onFieldChange('size', event.target.value)}
          className={formControlClassName}
          placeholder="Ej. 33cl"
        />
      </FormField>
      <FormField label="Categoría">
        <SelectMenu
          value={form.category}
          options={categories}
          onChange={value => onFieldChange('category', value)}
          triggerClassName={formControlClassName}
        />
      </FormField>
    </div>

    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <FormField label="Proveedor">
        <SelectMenu
          value={form.supplier}
          options={suppliers}
          onChange={value => onFieldChange('supplier', value)}
          triggerClassName={formControlClassName}
        />
      </FormField>
      <FormField label="Unidades por caja">
        <input
          type="number"
          min={1}
          value={form.unitsPerCase}
          onChange={event => onFieldChange('unitsPerCase', Number(event.target.value))}
          className={formControlClassName}
        />
      </FormField>
    </div>
  </>
);

export default ProductBasicsFields;
