import { FormField, formControlClassName } from '@/components/common';
import type { CreateProductInput } from '@/modules/products/types';

export interface ProductStockFieldsProps {
  form: CreateProductInput;
  onFieldChange: <K extends keyof CreateProductInput>(field: K, value: CreateProductInput[K]) => void;
}

const ProductStockFields = ({ form, onFieldChange }: ProductStockFieldsProps) => (
  <>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <FormField label="Stock actual (cajas)">
        <input
          type="number"
          min={0}
          value={form.stockCases}
          onChange={event => onFieldChange('stockCases', Number(event.target.value))}
          className={formControlClassName}
        />
      </FormField>
      <FormField label="Stock mínimo">
        <input
          type="number"
          min={0}
          value={form.minimumStock}
          onChange={event => onFieldChange('minimumStock', Number(event.target.value))}
          className={formControlClassName}
        />
      </FormField>
    </div>

    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <FormField label="Stock objetivo">
        <input
          type="number"
          min={0}
          value={form.targetStock}
          onChange={event => onFieldChange('targetStock', Number(event.target.value))}
          className={formControlClassName}
        />
      </FormField>
      <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-text-secondary">
        <input
          type="checkbox"
          checked={form.isActive}
          onChange={event => onFieldChange('isActive', event.target.checked)}
          className="h-4 w-4 rounded border-white/10 bg-transparent"
        />
        Producto activo para la venta
      </label>
    </div>
  </>
);

export default ProductStockFields;
