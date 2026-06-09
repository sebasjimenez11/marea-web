import { Paragraph } from '@/components/common';

export interface ProductIdentityProps {
  name: string;
  size: string;
}

const ProductIdentity = ({ name, size }: ProductIdentityProps) => {
  return (
    <div className="min-w-0">
      <Paragraph className="truncate font-medium text-[#dbe9ff]">{name}</Paragraph>
      <Paragraph className="text-text-secondary">{size}</Paragraph>
    </div>
  );
};

export default ProductIdentity;
