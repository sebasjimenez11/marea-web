export interface SupplierIdentityProps {
  name: string;
}

const SupplierIdentity = ({ name }: SupplierIdentityProps) => {
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium text-text-primary">{name}</p>
    </div>
  );
};

export default SupplierIdentity;
