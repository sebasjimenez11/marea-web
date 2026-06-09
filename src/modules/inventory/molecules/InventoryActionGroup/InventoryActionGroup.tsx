import { Button } from '@/components/common';

export interface InventoryActionGroupProps {
  onEntry?: () => void;
  onExit?: () => void;
  onEdit?: () => void;
}

const InventoryActionGroup = ({
  onEntry,
  onExit,
  onEdit,
}: InventoryActionGroupProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="secondary" size="sm" onClick={onExit}>
        − Salida
      </Button>
      <Button variant="secondary" size="sm" className="text-emerald-300" onClick={onEntry}>
        + Entrada
      </Button>
      <Button variant="ghost" size="sm" onClick={onEdit}>
        ✎
      </Button>
    </div>
  );
};

export default InventoryActionGroup;
