import { FormField, formControlClassName } from '@/components/common';
import type { CreateProductInput } from '@/modules/products/types';

export interface ProductPricingFieldsProps {
  form: CreateProductInput;
  onFieldChange: <K extends keyof CreateProductInput>(field: K, value: CreateProductInput[K]) => void;
}

const ProductPricingFields = ({ form, onFieldChange }: ProductPricingFieldsProps) => (
  <>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <FormField label="Precio coste (€)">
        <input
          type="number"
          min={0}
          step="0.01"
          value={form.costPrice}
          onChange={event => onFieldChange('costPrice', Number(event.target.value))}
          className={formControlClassName}
        />
      </FormField>
      <FormField label="Precio venta (€)">
        <input
          type="number"
          min={0}
          step="0.01"
          value={form.salePrice}
          onChange={event => onFieldChange('salePrice', Number(event.target.value))}
          className={formControlClassName}
        />
      </FormField>
    </div>

    <FormField label="Notas">
      <textarea
        value={form.notes}
        onChange={event => onFieldChange('notes', event.target.value)}
        className={`${formControlClassName} min-h-28 resize-none`}
        placeholder="Información adicional..."
      />
    </FormField>
  </>
);

export default ProductPricingFields;
