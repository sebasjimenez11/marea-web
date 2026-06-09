export interface InventoryCountProps {
  cases: number;
  units: number;
}

const InventoryCount = ({ cases, units }: InventoryCountProps) => {
  return (
    <div className="flex items-baseline gap-2 text-text-primary">
      <span className="text-5xl font-semibold tracking-[-0.05em]">{cases}</span>
      <span className="text-lg font-semibold text-[#aab6cb]">cajas</span>
      <span className="text-5xl font-semibold tracking-[-0.05em] text-[#9ec7ff]">+ {units}</span>
      <span className="text-lg font-semibold text-[#aab6cb]">uds</span>
    </div>
  );
};

export default InventoryCount;
