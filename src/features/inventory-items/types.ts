export type InventoryItem = {
  id: string;
  name: string;
  category?: string;
  currentUnits: number;
  minUnits: number;
  targetUnits: number;
  unitsPerBox: number;
};
