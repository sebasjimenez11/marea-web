import { FormField, formControlClassName } from '@/components/common';
import type { CreateSupplierInput, SupplierStatus } from '@/modules/suppliers/types';

export interface SupplierContactFieldsProps {
  form: CreateSupplierInput;
  onFieldChange: <K extends keyof CreateSupplierInput>(field: K, value: CreateSupplierInput[K]) => void;
}

const SupplierContactFields = ({ form, onFieldChange }: SupplierContactFieldsProps) => (
  <>
    <FormField label="Nombre">
      <input
        value={form.name}
        onChange={event => onFieldChange('name', event.target.value)}
        className={formControlClassName}
        placeholder="Ej. Distribuciones Costa Azul"
      />
    </FormField>

    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <FormField label="Teléfono">
        <input
          value={form.phone}
          onChange={event => onFieldChange('phone', event.target.value)}
          className={formControlClassName}
          placeholder="+34 600 123 456"
        />
      </FormField>

      <FormField label="Estado">
        <select
          value={form.status}
          onChange={event => onFieldChange('status', event.target.value as SupplierStatus)}
          className={formControlClassName}
        >
          <option value="active">Activo</option>
          <option value="inactive">Inactivo</option>
        </select>
      </FormField>
    </div>

    <FormField label="Email">
      <input
        type="email"
        value={form.email}
        onChange={event => onFieldChange('email', event.target.value)}
        className={formControlClassName}
        placeholder="pedidos@proveedor.com"
      />
    </FormField>
  </>
);

export default SupplierContactFields;
