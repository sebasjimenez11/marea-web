export type CashMovement = {
  id: string;
  businessDate: string;
  type: string;
  method: string;
  amountCents: number;
};

export type DailyCashClosure = {
  id: string;
  businessDate: string;
  expectedCashCents: number;
  countedCashCents: number;
  cashDifferenceCents: number;
  dailyBalanceCents: number;
};
