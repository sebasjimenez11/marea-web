import { useMemo, useState, type Dispatch, type SetStateAction } from 'react';
import type { CashCountEntry } from '@/modules/cash/types';

const initialBillEntries: CashCountEntry[] = [
  { label: '500', value: 500, count: 0 },
  { label: '200', value: 200, count: 0 },
  { label: '100', value: 100, count: 2 },
  { label: '50', value: 50, count: 1 },
  { label: '20', value: 20, count: 1 },
  { label: '10', value: 10, count: 5 },
  { label: '5', value: 5, count: 0 },
];

const initialCoinEntries: CashCountEntry[] = [
  { label: '2.00', value: 2, count: 12 },
  { label: '1.00', value: 1, count: 8 },
  { label: '0.50', value: 0.5, count: 14 },
  { label: 'Menores', value: 0.01, count: 1245 },
];

const getTotal = (entries: CashCountEntry[]) =>
  entries.reduce((total, entry) => total + (entry.value * entry.count), 0);

export interface UseCashCountModalResult {
  isOpen: boolean;
  notes: string;
  billEntries: CashCountEntry[];
  coinEntries: CashCountEntry[];
  expectedAmount: number;
  countedBills: number;
  countedCoins: number;
  countedTotal: number;
  difference: number;
  openModal: () => void;
  closeModal: () => void;
  setNotes: (value: string) => void;
  updateBillCount: (label: string, count: number) => void;
  updateCoinCount: (label: string, count: number) => void;
}

export const useCashCountModal = (expectedAmount: number): UseCashCountModalResult => {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const [billEntries, setBillEntries] = useState<CashCountEntry[]>(initialBillEntries);
  const [coinEntries, setCoinEntries] = useState<CashCountEntry[]>(initialCoinEntries);

  const countedBills = useMemo(() => getTotal(billEntries), [billEntries]);
  const countedCoins = useMemo(() => getTotal(coinEntries), [coinEntries]);
  const countedTotal = countedBills + countedCoins;
  const difference = countedTotal - expectedAmount;

  const updateEntries =
    (setter: Dispatch<SetStateAction<CashCountEntry[]>>) =>
    (label: string, count: number) => {
      setter(current =>
        current.map(entry =>
          entry.label === label
            ? { ...entry, count: Math.max(0, count) }
            : entry,
        ),
      );
    };

  return {
    isOpen,
    notes,
    billEntries,
    coinEntries,
    expectedAmount,
    countedBills,
    countedCoins,
    countedTotal,
    difference,
    openModal: () => setIsOpen(true),
    closeModal: () => setIsOpen(false),
    setNotes,
    updateBillCount: updateEntries(setBillEntries),
    updateCoinCount: updateEntries(setCoinEntries),
  };
};
