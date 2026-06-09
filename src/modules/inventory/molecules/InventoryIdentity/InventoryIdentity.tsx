import { Paragraph } from '@/components/common';

export interface InventoryIdentityProps {
  name: string;
  reference: string;
  size: string;
}

const InventoryIdentity = ({ name, reference, size }: InventoryIdentityProps) => {
  return (
    <div className="min-w-0">
      <Paragraph className="truncate font-medium text-[#dbe9ff]">{name}</Paragraph>
      <Paragraph className="text-text-secondary">
        {reference} • {size}
      </Paragraph>
    </div>
  );
};

export default InventoryIdentity;
