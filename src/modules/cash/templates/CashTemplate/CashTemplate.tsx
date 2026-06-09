import { useMemo } from 'react';
import { Button, EmptyState, ErrorState, LoadingState, PageHeader } from '@/components/common';
import { useCashCountModal, useCashData } from '@/modules/cash/hooks';
import { generateCashAuditDocument } from '@/modules/cash/lib';
import { CashCountModal } from '@/modules/cash/organisms';
import { CashClosePanel } from '@/modules/cash/molecules';
import { CashHistoryTable, CashSummary } from '@/modules/cash/organisms';

const CashTemplate = () => {
  const { data, isLoading, error } = useCashData();
  const expectedAmount = useMemo(
    () => (data ? data.summary.initialFund + data.summary.cashSales : 0),
    [data],
  );
  const {
    isOpen,
    notes,
    billEntries,
    coinEntries,
    countedBills,
    countedCoins,
    countedTotal,
    difference,
    openModal,
    closeModal,
    setNotes,
    updateBillCount,
    updateCoinCount,
  } = useCashCountModal(expectedAmount);

  if (isLoading) {
    return <LoadingState message="Cargando caja..." />;
  }

  if (error) {
    return <ErrorState title="Error al cargar caja" />;
  }

  if (!data) {
    return <EmptyState title="Sin datos de caja" />;
  }

  const handleGenerateAuditDocument = () => {
    generateCashAuditDocument({
      summary: data.summary,
      expectedAmount,
      countedBills,
      countedCoins,
      countedTotal,
      difference,
      notes,
      billEntries,
      coinEntries,
    });
  };

  const handleConfirmAudit = () => {
    handleGenerateAuditDocument();
    closeModal();
  };

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="Caja del Día"
          subtitle={data.summary.currentShiftLabel}
          action={
            <Button variant="secondary" className="gap-2" onClick={openModal}>
              <span aria-hidden="true">◫</span>
              Imprimir Arqueo
            </Button>
          }
        />

        <CashSummary summary={data.summary} />
        <CashClosePanel initialFund={data.summary.initialFund} />
        <CashHistoryTable items={data.recentClosures} />
      </div>

      <CashCountModal
        open={isOpen}
        expectedAmount={expectedAmount}
        billEntries={billEntries}
        coinEntries={coinEntries}
        countedBills={countedBills}
        countedCoins={countedCoins}
        countedTotal={countedTotal}
        difference={difference}
        notes={notes}
        onClose={closeModal}
        onConfirm={handleConfirmAudit}
        onPrint={handleGenerateAuditDocument}
        onNotesChange={setNotes}
        onBillChange={updateBillCount}
        onCoinChange={updateCoinCount}
      />
    </>
  );
};

export default CashTemplate;
