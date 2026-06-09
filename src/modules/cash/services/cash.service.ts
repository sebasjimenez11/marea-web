import type { ApiResponse, CashData } from '@/modules/cash/types';

const cashData: CashData = {
  summary: {
    currentShiftLabel: 'Turno actual: 24 Oct 2023, 16:00 - Cierre',
    branchName: 'Caja Principal',
    turnName: 'Turno Tarde',
    responsibleName: 'Carlos Mendoza',
    liveBalance: 3450.5,
    cashSales: 1250,
    cardSales: 1900.5,
    cashTransactions: 42,
    cardTransactions: 86,
    initialFund: 300,
  },
  recentClosures: [
    {
      id: 'closure-1',
      shiftLabel: '23 Oct • Cierre',
      responsibleName: 'M. Chen',
      expectedTotal: 2850,
      actualTotal: 2850,
      status: 'balanced',
    },
    {
      id: 'closure-2',
      shiftLabel: '22 Oct • Cierre',
      responsibleName: 'J. Doe',
      expectedTotal: 3120.5,
      actualTotal: 3115.5,
      status: 'mismatch',
    },
    {
      id: 'closure-3',
      shiftLabel: '21 Oct • Cierre',
      responsibleName: 'M. Chen',
      expectedTotal: 4500,
      actualTotal: 4500,
      status: 'balanced',
    },
  ],
};

const createSuccessResponse = <T,>(data: T): ApiResponse<T> => ({
  success: true,
  data,
});

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getCashData = async (): Promise<ApiResponse<CashData>> => {
  await delay(180);
  return createSuccessResponse(cashData);
};
