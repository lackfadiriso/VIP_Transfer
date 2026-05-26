import { useTranslation } from 'react-i18next'
import React, { useState } from 'react'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import type { OrderDetail } from '../types'
import ReservationDetailCard from '../components/ReservationDetailCard'
import api from '../services/api'

const CheckReservation = () => {
  const { t } = useTranslation()
  const [fullName, setFullName] = useState<string>(localStorage.getItem('name') || '')
  const [phone, setPhone] = useState<string>(localStorage.getItem('phone') || '')
  const [order, setOrder] = useState<OrderDetail | null>(null)
  const [message, setMessage] = useState<string | null>(null)


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(t('loading'))
    try{
      const response = await api.get('my-orders/', {
        params: {
          phone: phone,
          full_name: fullName
        }
      })
      setOrder(response.data[0])
      setMessage('')
    }
    catch (error: any){
      setMessage(t('error_reservation_not_found'))
    }
  }

  return (
    <div className='mt-10'>
      {order ? <ReservationDetailCard order={order}/> :
      (<Container>
        <Row className='justify-content-center'>
        <Col md={6}>
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
                  placeholder='056789012**'
                  value={phone.trim()}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={12} className='my-2 text-center'>
              <Button type='submit'>{t('check_reservation')}</Button>
            </Col>
          </Row>
        </Form>
      </Col>
      </Row>
      </Container>)}
      {message && <p className='text-center text-danger'>{message}</p>}
      
    </div>
  )
}

export default CheckReservation