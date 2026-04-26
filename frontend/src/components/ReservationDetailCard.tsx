import type { OrderDetail } from '../types'
import { Card, Row, Col, Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

type Props = {
  order: OrderDetail
}

const ReservationDetailCard = ({order}: Props) => {
  const { t } = useTranslation()

  return (
    <Container className='mb-5'>
      <Card className='mt-4 shadow-sm gap-2'>
        <Card.Header className='bg-dark text-white'>
          <h5 className='mb-0'>{t('my_reservation')}</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col xs={6}>
              <small className='text-muted'>Reservasion ID</small>
              <p className='fw-bold mb-0'>{order.id}</p>
            </Col>
            <Col xs={6} className='mb-3'>
              <small className='text-muted'>{t('full_name')}</small>
              <p className='fw-bold mb-0'>{order.full_name}</p>
            </Col>
            <hr />
            <Col xs={6} className=''>
              <small className='text-muted'>{t('phone')}</small>
              <p className='fw-bold mb-0'>{order.phone}</p>
            </Col>
            <Col xs={6}>
              <small className='text-muted'>{t('pick_up_location')}</small>
              <p className='fw-bold mb-0'>{order.pick_up_location}</p>
            </Col>
            <hr />
            <Col xs={6}>
              <small className='text-muted'>{t('drop _off_location')}</small>
              <p className='fw-bold mb-0'>{order.drop_off_location}</p>
            </Col>
            <Col xs={6}>
              <small className='text-muted'>{t('pick_up_date')}</small>
              <p className='fw-bold mb-0'>{new Date(order.pick_up_date).toLocaleString('tr-TR')}</p>
            </Col>
            <hr />
            <Col xs={6}>
              <small className='text-muted'>{t('passenger_count')}</small>
              <p className='fw-bold mb-0'>{order.passenger_count}</p>
            </Col>
            <Col xs={6}>
              <small className='text-muted'>{t('status')}</small>
              <p className='fw-bold mb-0'>{order.status}</p>
            </Col>
            <hr />
            <Col xs={6}>
              <small className='text-muted'>{t('created_at')}</small>
              <p className='fw-bold mb-0'>{new Date(order.created_at).toLocaleString('tr-TR')}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default ReservationDetailCard