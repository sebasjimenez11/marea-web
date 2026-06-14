import type { CashClosureHistoryItem, CashClosureStatus, CashData, CashDaySummary, CloseCashInput } from '@/modules/cash/types';

export type CashMovementDtoType =
  | 'CASH_SALE'
  | 'CARD_SALE'
  | 'BIZUM_SALE'
  | 'OTHER_INCOME'
  | 'CASH_EXPENSE'
  | 'SUPPLIER_PAYMENT'
  | 'OTHER_EXPENSE'
  | 'CASH_ADJUSTMENT';

export interface CashMovementDto {
  id: string;
  businessDate: string;
  type: CashMovementDtoType;
  method: 'CASH' | 'CARD' | 'BIZUM' | 'BANK_TRANSFER' | 'OTHER';
  amountCents: number;
  description: string | null;
  createdAt: string;
}

export interface CashClosureDto {
  id: string;
  businessDate: string;
  openingCashCents: number;
  cashSalesCents: number;
  cardSalesCents: number;
  bizumSalesCents: number;
  otherIncomeCents: number;
  cashExpensesCents: number;
  supplierCashPaymentsCents: number;
  otherExpensesCents: number;
  countedCashCents: number;
  expectedCashCents: number;
  cashDifferenceCents: number;
  totalIncomeCents: number;
  totalExpensesCents: number;
  dailyBalanceCents: number;
  notes: string | null;
}

export interface UpsertCashClosurePayload {
  businessDate: string;
  openingCashCents?: number;
  countedCashCents?: number;
  notes?: string;
}

const euros = (cents: number) => cents / 100;

const toCents = (amount: number) => Math.round(amount * 100);

const getBusinessDate = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const sumMovements = (movements: CashMovementDto[], type: CashMovementDtoType) =>
  movements
    .filter(movement => movement.type === type)
    .reduce((total, movement) => total + movement.amountCents, 0);

const getClosureStatus = (closure: CashClosureDto): CashClosureStatus =>
  closure.cashDifferenceCents === 0 ? 'balanced' : 'mismatch';

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
  }).format(new Date(date));

export const mapCashClosureToHistoryItem = (closure: CashClosureDto): CashClosureHistoryItem => ({
  id: closure.id,
  shiftLabel: `${formatDate(closure.businessDate)} · Cierre`,
  responsibleName: 'Equipo',
  expectedTotal: euros(closure.expectedCashCents),
  actualTotal: euros(closure.countedCashCents),
  status: getClosureStatus(closure),
});

export const mapCashData = ({
  todayClosure,
  movements,
  recentClosures,
}: {
  todayClosure: CashClosureDto | null;
  movements: CashMovementDto[];
  recentClosures: CashClosureDto[];
}): CashData => {
  const openingCashCents = todayClosure?.openingCashCents ?? recentClosures[0]?.openingCashCents ?? 0;
  const cashSalesCents = todayClosure?.cashSalesCents ?? sumMovements(movements, 'CASH_SALE');
  const cardSalesCents = todayClosure?.cardSalesCents ?? sumMovements(movements, 'CARD_SALE');
  const bizumSalesCents = todayClosure?.bizumSalesCents ?? sumMovements(movements, 'BIZUM_SALE');
  const otherIncomeCents = todayClosure?.otherIncomeCents ?? sumMovements(movements, 'OTHER_INCOME');
  const cashExpensesCents = todayClosure?.cashExpensesCents ?? sumMovements(movements, 'CASH_EXPENSE');
  const supplierCashPaymentsCents = todayClosure?.supplierCashPaymentsCents ?? sumMovements(movements, 'SUPPLIER_PAYMENT');
  const otherExpensesCents = todayClosure?.otherExpensesCents ?? sumMovements(movements, 'OTHER_EXPENSE');
  const expectedCashCents = todayClosure?.expectedCashCents
    ?? openingCashCents
      + cashSalesCents
      + otherIncomeCents
      - cashExpensesCents
      - supplierCashPaymentsCents
      - otherExpensesCents;

  const summary: CashDaySummary = {
    currentShiftLabel: `Turno actual: ${new Intl.DateTimeFormat('es-ES').format(new Date())} · Cierre`,
    branchName: 'Caja Principal',
    turnName: 'Turno actual',
    responsibleName: 'Equipo',
    liveBalance: euros(expectedCashCents),
    cashSales: euros(cashSalesCents),
    cardSales: euros(cardSalesCents + bizumSalesCents),
    cashTransactions: movements.filter(movement => movement.type === 'CASH_SALE').length,
    cardTransactions: movements.filter(movement =>
      movement.type === 'CARD_SALE' || movement.type === 'BIZUM_SALE',
    ).length,
    initialFund: euros(openingCashCents),
  };

  return {
    summary,
    recentClosures: recentClosures.map(mapCashClosureToHistoryItem),
  };
};

export const mapCloseCashInputToPayload = (input: CloseCashInput): UpsertCashClosurePayload => ({
  businessDate: input.businessDate || getBusinessDate(),
  openingCashCents: toCents(input.openingCash),
  countedCashCents: toCents(input.countedCash),
  notes: input.notes.trim() || undefined,
});

export const getTodayBusinessDate = getBusinessDate;

