export interface CashCountEntry {
  label: string;
  value: number;
  count: number;
}

export type CashClosureStatus = 'balanced' | 'mismatch';

export interface CashDaySummary {
  currentShiftLabel: string;
  branchName: string;
  turnName: string;
  responsibleName: string;
  liveBalance: number;
  cashSales: number;
  cardSales: number;
  cashTransactions: number;
  cardTransactions: number;
  initialFund: number;
}

export interface CashClosureHistoryItem {
  id: string;
  shiftLabel: string;
  responsibleName: string;
  expectedTotal: number;
  actualTotal: number;
  status: CashClosureStatus;
}

export interface CashData {
  summary: CashDaySummary;
  recentClosures: CashClosureHistoryItem[];
}

export interface CloseCashInput {
  businessDate?: string;
  openingCash: number;
  countedCash: number;
  notes: string;
}

export type { ApiResponse } from '@/app/api';
