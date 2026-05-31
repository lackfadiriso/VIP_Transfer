import type { OrderDetail } from '../types'
import { Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

type Props = {
  order: OrderDetail
}

const ReservationDetailCard = ({ order }: Props) => {
  const { t } = useTranslation()

  const fmt = (dt: string) =>
    new Date(dt).toLocaleString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

  return (
    <Container className="mb-5">
      <div style={styles.ticket}>

        <div style={styles.header}>
          <span style={styles.brand}>{t('my_reservation')}</span>
          <span style={styles.idBadge}>#{order.id}</span>
        </div>

        <div style={styles.routeRow}>
          <div style={styles.routePoint}>
            <div style={styles.routeLabel}>{t('pick_up_location')}</div>
            <div style={styles.routeValue}>{order.pick_up_location || '—'}</div>
          </div>
          <div style={styles.arrow}>→</div>
          <div style={{ ...styles.routePoint, textAlign: 'right' }}>
            <div style={styles.routeLabel}>{t('drop_off_location')}</div>
            <div style={styles.routeValue}>{order.drop_off_location || '—'}</div>
          </div>
        </div>

        <Notch />

        <div style={styles.grid}>
          <InfoCell label={t('full_name')} value={order.full_name} icon="👤" />
          <InfoCell label={t('phone')} value={order.phone} icon="📞" border />
          <InfoCell label={t('pick_up_date')} value={fmt(order.pick_up_date)} icon="📅" />
          <InfoCell label={t('passenger_count')} value={`${order.passenger_count} ${t('person') || 'kişi'}`} icon="🧳" border />
        </div>

        {order.return_date && (
          <div style={styles.returnRow}>
            <span style={styles.returnLabel}>↩ {t('return_date')}</span>
            <span style={styles.returnValue}>{fmt(order.return_date)}</span>
          </div>
        )}
        <Notch />

        <div style={styles.footer}>
          <span style={styles.createdAt}>
            {fmt(order.created_at)} {t('created_at') || 'oluşturuldu'}
          </span>
          <span style={styles.statusPill}>✓ Aktif</span>
        </div>
      </div>
    </Container>
  )
}

const Notch = () => (
  <div style={{ display: 'flex', alignItems: 'center', margin: '0 -1px' }}>
    <div style={styles.notch} />
    <div style={styles.dash} />
    <div style={styles.notch} />
  </div>
)

const InfoCell = ({
  label,
  value,
  icon,
  border,
}: {
  label: string
  value: string
  icon: string
  border?: boolean
}) => (
  <div
    style={{
      ...styles.cell,
      borderRight: border ? 'none' : '0.5px solid #e5e7eb',
    }}
  >
    <div style={styles.cellLabel}>
      <span style={{ fontSize: 11 }}>{icon}</span> {label}
    </div>
    <div style={styles.cellValue}>{value}</div>
  </div>
)

const styles: Record<string, React.CSSProperties> = {
  ticket: {
    background: '#fff',
    borderRadius: 16,
    border: '0.5px solid #e5e7eb',
    overflow: 'hidden',
    marginTop: 16,
  },
  header: {
    background: '#1a1a2e',
    color: '#fff',
    padding: '14px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    fontSize: 13,
    fontWeight: 500,
    opacity: 0.85,
    letterSpacing: '0.03em',
  },
  idBadge: {
    background: 'rgba(255,255,255,0.12)',
    borderRadius: 6,
    padding: '3px 10px',
    fontSize: 12,
    fontWeight: 500,
  },
  routeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '16px 16px 14px',
    borderBottom: '0.5px solid #e5e7eb',
  },
  routePoint: {
    flex: 1,
    minWidth: 0,
  },
  routeLabel: {
    fontSize: 11,
    color: '#9ca3af',
    marginBottom: 2,
  },
  routeValue: {
    fontSize: 13,
    fontWeight: 500,
    color: '#111827',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  arrow: {
    flexShrink: 0,
    fontSize: 16,
    color: '#9ca3af',
    lineHeight: 1,
  },
  notch: {
    width: 14,
    height: 14,
    borderRadius: '50%',
    background: '#f3f4f6',
    border: '0.5px solid #e5e7eb',
    flexShrink: 0,
  },
  dash: {
    flex: 1,
    borderTop: '1.5px dashed #e5e7eb',
    margin: '0 4px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
  cell: {
    padding: '12px 16px',
    borderBottom: '0.5px solid #e5e7eb',
  },
  cellLabel: {
    fontSize: 11,
    color: '#9ca3af',
    marginBottom: 3,
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  cellValue: {
    fontSize: 13,
    fontWeight: 500,
    color: '#111827',
  },
  returnRow: {
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#f9fafb',
    borderBottom: '0.5px solid #e5e7eb',
  },
  returnLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  returnValue: {
    fontSize: 13,
    fontWeight: 500,
    color: '#111827',
  },
  footer: {
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  createdAt: {
    fontSize: 11,
    color: '#9ca3af',
  },
  statusPill: {
    fontSize: 11,
    fontWeight: 500,
    padding: '3px 10px',
    borderRadius: 20,
    background: '#d1fae5',
    color: '#065f46',
  },
}

export default ReservationDetailCard
