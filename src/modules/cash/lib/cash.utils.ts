import type {
  CashClosureHistoryItem,
  CashClosureStatus,
  CashCountEntry,
  CashDaySummary,
} from '@/modules/cash/types';

export const formatCashCurrency = (value: number) =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(value);

export const getCashClosureStatusLabel = (
  status: CashClosureStatus,
  expectedTotal: number,
  actualTotal: number,
) => {
  if (status === 'balanced') {
    return 'Cuadrado';
  }

  const diff = actualTotal - expectedTotal;
  return `Descuadre (${formatCashCurrency(diff)})`;
};

export const getCashClosureStatusVariant = (status: CashClosureStatus) => {
  switch (status) {
    case 'balanced':
      return 'default';
    case 'mismatch':
      return 'error';
    default:
      return 'default';
  }
};

export const getCashVariance = (item: CashClosureHistoryItem) => item.actualTotal - item.expectedTotal;

const formatPrintableAmount = (value: number) =>
  new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const buildAuditDocumentId = () =>
  `C-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

const buildDocumentHtml = ({
  summary,
  expectedAmount,
  countedBills,
  countedCoins,
  countedTotal,
  difference,
  notes,
  billEntries,
  coinEntries,
}: {
  summary: CashDaySummary;
  expectedAmount: number;
  countedBills: number;
  countedCoins: number;
  countedTotal: number;
  difference: number;
  notes: string;
  billEntries: CashCountEntry[];
  coinEntries: CashCountEntry[];
}) => {
  const now = new Date();
  const dateLabel = now.toLocaleDateString('es-ES');
  const timeLabel = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  const generatedAt = now.toLocaleString('es-ES');
  const documentId = buildAuditDocumentId();

  const renderRows = (entries: CashCountEntry[]) =>
    entries
      .map(
        entry => `
          <tr>
            <td>€ ${entry.label}</td>
            <td>${entry.count}</td>
            <td>€ ${formatPrintableAmount(entry.value * entry.count)}</td>
          </tr>
        `,
      )
      .join('');

  return `
    <!doctype html>
    <html lang="es">
      <head>
        <meta charset="utf-8" />
        <title>Arqueo de Caja</title>
        <style>
          body {
            margin: 0;
            background: #11151c;
            font-family: Inter, Arial, sans-serif;
            color: #111827;
          }
          .page {
            width: 794px;
            margin: 20px auto;
            background: #ffffff;
            padding: 40px 44px 36px;
            box-sizing: border-box;
          }
          .header, .meta, .totals {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
          }
          .header {
            border-bottom: 1px solid #cfd6df;
            padding-bottom: 18px;
            margin-bottom: 20px;
          }
          .brand {
            font-size: 28px;
            font-weight: 800;
            letter-spacing: -0.03em;
          }
          .subtle {
            color: #6b7280;
            font-size: 12px;
          }
          .title {
            text-align: right;
            font-size: 24px;
            font-weight: 800;
          }
          .panel {
            border: 1px solid #d8dde6;
            border-radius: 8px;
            padding: 14px 16px;
            background: #fafbfd;
          }
          .meta .panel {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
          }
          .label {
            color: #6b7280;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            margin-bottom: 6px;
          }
          .value {
            font-size: 16px;
            font-weight: 700;
          }
          .section-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 26px;
            margin-top: 26px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th {
            text-align: left;
            font-size: 11px;
            color: #6b7280;
            padding-bottom: 10px;
          }
          td {
            padding: 6px 0;
            font-size: 14px;
            border-bottom: 1px solid #eef2f7;
          }
          .total-line {
            margin-top: 14px;
            text-align: right;
            font-size: 18px;
            font-weight: 800;
          }
          .totals {
            gap: 16px;
            margin-top: 28px;
          }
          .totals .panel {
            flex: 1;
          }
          .difference {
            color: ${difference >= 0 ? '#d97706' : '#dc2626'};
          }
          .notes {
            margin-top: 26px;
          }
          .notes-box {
            min-height: 74px;
          }
          .signatures {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 48px;
            margin-top: 80px;
            text-align: center;
          }
          .signature-title {
            font-size: 13px;
            font-weight: 700;
            margin-bottom: 4px;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            color: #9ca3af;
            font-size: 10px;
          }
          @media print {
            body {
              background: #ffffff;
            }
            .page {
              margin: 0;
              width: auto;
            }
          }
        </style>
      </head>
      <body>
        <div class="page">
          <div class="header">
            <div>
              <div class="brand">SLATE & SPIRITS</div>
              <div class="subtle">Internal Audit Document</div>
            </div>
            <div>
              <div class="title">ARQUEO DE CAJA</div>
              <div class="subtle" style="text-align:right;">ID: ${documentId}</div>
            </div>
          </div>

          <div class="meta">
            <div class="panel">
              <div>
                <div class="label">Fecha de Cierre</div>
                <div class="value">${dateLabel}</div>
              </div>
              <div>
                <div class="label">Hora</div>
                <div class="value">${timeLabel}</div>
              </div>
              <div>
                <div class="label">Turno</div>
                <div class="value">${summary.turnName}</div>
              </div>
              <div>
                <div class="label">Responsable</div>
                <div class="value">${summary.responsibleName}</div>
              </div>
            </div>
          </div>

          <div class="section-grid">
            <div>
              <div class="label">Detalle de Billetes</div>
              <table>
                <thead>
                  <tr><th>Valor</th><th>Cantidad</th><th>Subtotal</th></tr>
                </thead>
                <tbody>${renderRows(billEntries)}</tbody>
              </table>
              <div class="total-line">Total Billetes &nbsp; € ${formatPrintableAmount(countedBills)}</div>
            </div>
            <div>
              <div class="label">Detalle de Monedas</div>
              <table>
                <thead>
                  <tr><th>Valor</th><th>Cantidad</th><th>Subtotal</th></tr>
                </thead>
                <tbody>${renderRows(coinEntries)}</tbody>
              </table>
              <div class="total-line">Total Monedas &nbsp; € ${formatPrintableAmount(countedCoins)}</div>
            </div>
          </div>

          <div class="totals">
            <div class="panel">
              <div class="label">Total Teórico (Sistema)</div>
              <div class="value">€ ${formatPrintableAmount(expectedAmount)}</div>
            </div>
            <div class="panel">
              <div class="label">Total Físico (Contado)</div>
              <div class="value">€ ${formatPrintableAmount(countedTotal)}</div>
            </div>
            <div class="panel">
              <div class="label">Diferencia</div>
              <div class="value difference">${difference >= 0 ? '+' : '-'} € ${formatPrintableAmount(Math.abs(difference))}</div>
            </div>
          </div>

          <div class="notes">
            <div class="label">Observaciones / Justificaciones</div>
            <div class="panel notes-box">${notes || 'Sin observaciones registradas.'}</div>
          </div>

          <div class="signatures">
            <div>
              <div class="signature-title">Responsable de Turno</div>
              <div class="subtle">${summary.responsibleName}</div>
            </div>
            <div>
              <div class="signature-title">Gerencia / Auditor</div>
              <div class="subtle">Firma y Sello</div>
            </div>
          </div>

          <div class="footer">
            Generado por Pool Bar Manager Pro • Impresión ${generatedAt}
          </div>
        </div>
      </body>
    </html>
  `;
};

export const generateCashAuditDocument = ({
  summary,
  expectedAmount,
  countedBills,
  countedCoins,
  countedTotal,
  difference,
  notes,
  billEntries,
  coinEntries,
}: {
  summary: CashDaySummary;
  expectedAmount: number;
  countedBills: number;
  countedCoins: number;
  countedTotal: number;
  difference: number;
  notes: string;
  billEntries: CashCountEntry[];
  coinEntries: CashCountEntry[];
}) => {
  const printWindow = window.open('', '_blank', 'noopener,noreferrer,width=980,height=860');

  if (!printWindow) {
    return;
  }

  printWindow.document.open();
  printWindow.document.write(
    buildDocumentHtml({
      summary,
      expectedAmount,
      countedBills,
      countedCoins,
      countedTotal,
      difference,
      notes,
      billEntries,
      coinEntries,
    }),
  );
  printWindow.document.close();
  printWindow.focus();
};
