import { useMemo, useState } from 'react';
import { EmptyState, ErrorState, LoadingState, PageHeader, SearchInput } from '@/components/common';
import { useInventoryData, useInventoryMovementModal } from '@/modules/inventory/hooks';
import { filterInventoryItems } from '@/modules/inventory/lib';
import { InventoryMovementModal, InventoryQuickList } from '@/modules/inventory/organisms';
import type { InventoryMovementDraft } from '@/modules/inventory/types';

const InventoryTemplate = () => {
  const { data, isLoading, error, applyMovement } = useInventoryData();
  const [search, setSearch] = useState('');
  const {
    movementModal,
    openMovementModal,
    closeMovementModal,
    setMovementMode,
    setMovementCases,
    setMovementUnits,
    setMovementComment,
    resetAfterConfirm,
  } = useInventoryMovementModal();

  const filteredItems = useMemo(() => {
    if (!data) {
      return [];
    }

    return filterInventoryItems(data.items, search);
  }, [data, search]);

  if (isLoading) {
    return <LoadingState message="Cargando inventario..." />;
  }

  if (error) {
    return <ErrorState title="Error al cargar inventario" />;
  }

  if (!data) {
    return <EmptyState title="Sin datos de inventario" />;
  }

  const handleConfirmMovement = (draft: InventoryMovementDraft) => {
    applyMovement(draft);
  };

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="Inventario Rápido"
          subtitle="Ajusta stock, revisa movimientos recientes y detecta faltantes."
        />

        <SearchInput
          value={search}
          onSearch={setSearch}
          placeholder="Buscar producto para ajustar stock..."
          className="w-full"
        />

        <InventoryQuickList
          items={filteredItems}
          onEntry={item => openMovementModal(item, 'entry')}
          onExit={item => openMovementModal(item, 'exit')}
        />
      </div>

      <InventoryMovementModal
        item={movementModal.item}
        mode={movementModal.mode}
        cases={movementModal.cases}
        units={movementModal.units}
        comment={movementModal.comment}
        open={movementModal.open}
        onClose={closeMovementModal}
        onModeChange={setMovementMode}
        onCasesChange={setMovementCases}
        onUnitsChange={setMovementUnits}
        onCommentChange={setMovementComment}
        onConfirm={resetAfterConfirm(handleConfirmMovement)}
      />
    </>
  );
};

export default InventoryTemplate;
