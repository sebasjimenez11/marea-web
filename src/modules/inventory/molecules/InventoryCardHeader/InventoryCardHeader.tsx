import { IconTile } from '@/components/common';
import { InventoryIdentity } from '@/modules/inventory/molecules';

export interface InventoryCardHeaderProps {
  name: string;
  reference: string;
  size: string;
}

const InventoryCardHeader = ({
  name,
  reference,
  size,
}: InventoryCardHeaderProps) => {
  return (
    <div className="flex items-center gap-3">
      <IconTile>◫</IconTile>
      <InventoryIdentity name={name} reference={reference} size={size} />
    </div>
  );
};

export default InventoryCardHeader;
