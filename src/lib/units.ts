export function formatBoxesAndUnits(totalUnits: number, unitsPerBox: number) {
  const boxes = Math.floor(totalUnits / unitsPerBox);
  const looseUnits = totalUnits % unitsPerBox;

  return `${boxes} cajas + ${looseUnits} uds`;
}
