import { useTranslation } from 'react-i18next'
import React, { useState } from 'react'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import type { OrderDetail } from '../types'
import ReservationDetailCard from '../components/ReservationDetailCard'
import api from '../services/api'

const CheckReservation = () => {
  const { t } = useTranslation()
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [order, setOrder] = useState<OrderDetail | null>(null)
  const [message, setMessage] = useState<string>('')


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(t('loading'))
    const response = await api.get('my-orders/', {
      params: {
        phone: phone,
        full_name: fullName
      }
    })
    if (!order){
      setMessage(t('error_reservation_not_found'))
    }

    console.log(response.data)
    setOrder(response.data[0])
  }

  return (
    <>
      <Container className='my-2'>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>{t('full_name')}</Form.Label>
                <Form.Control
                  type='text'
                  placeholder={t('placeholder_full_name')}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>{t('phone')}</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='05678901234'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={12} className='my-2 text-center'>
              <Button type='submit'>{t('check_reservation')}</Button>
            </Col>
          </Row>
        </Form>
      </Container>

      {order ? <ReservationDetailCard order={order}/> : <p className='text-center text-danger'>{message}</p>}
    </>
  )
}

export default CheckReservation