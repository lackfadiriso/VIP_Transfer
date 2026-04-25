import type { OrderDetail } from '../types'
import { Card, Row, Col, Container } from 'react-bootstrap'

type Props = {
  order: OrderDetail
}

const ReservationDetailCard = ({order}: Props) => {
  return (
    <Container>
      <Card className='mt-4 shadow-sm gap-2'>
        <Card.Header className='bg-dark text-white'>
          <h5 className='mb-0'>Reservation Detail</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <small className='text-muted'>Reservasion ID</small>
              <p className='fw-bold mb-0'>{order.id}</p>
            </Col>
            <Col md={6} className='mb-3'>
              <small className='text-muted'>Full Name</small>
              <p className='fw-bold mb-0'>{order.full_name}</p>
            </Col>
            <Col md={6} className=''>
              <small className='text-muted'>Phone</small>
              <p className='fw-bold mb-0'>{order.phone}</p>
            </Col>
            <Col md={6}>
              <small className='text-muted'>Pick Up Location</small>
              <p className='fw-bold mb-0'>{order.pick_up_location}</p>
            </Col>
            <Col md={6}>
              <small className='text-muted'>Drop Off Location</small>
              <p className='fw-bold mb-0'>{order.drop_off_location}</p>
            </Col>
            <Col md={6}>
              <small className='text-muted'>Pick Up Date</small>
              <p className='fw-bold mb-0'>{new Date(order.pick_up_date).toLocaleString('tr-TR')}</p>
            </Col>
            <Col md={6}>
              <small className='text-muted'>Passenger Count</small>
              <p className='fw-bold mb-0'>{order.passenger_count}</p>
            </Col>
            <Col md={6}>
              <small className='text-muted'>Status</small>
              <p className='fw-bold mb-0'>{order.status}</p>
            </Col>
            <Col md={6}>
              <small className='text-muted'>Created At</small>
              <p className='fw-bold mb-0'>{new Date(order.created_at).toLocaleString('tr-TR')}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default ReservationDetailCard