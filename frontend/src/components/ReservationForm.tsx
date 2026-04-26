import { useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import api from '../services/api'
import type { CreateOrder } from '../types'
import { useTranslation } from 'react-i18next'


const ReservationForm = () => {
  const [passengerCount, setPassengerCount] = useState<number>(1)
  const [message, setMessage] = useState<string>('')
  const [color, setColor] = useState<string>('success')
  const { t } = useTranslation()

  const [formData, setFormData] = useState<CreateOrder>({
    full_name: '',
    phone: '',
    pick_up_location: '',
    drop_off_location: '',
    pick_up_date: '',
    passenger_count: 1,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(t('loading'))
    try{
    await api.post('orders/', {
      ...formData,
      passenger_count: passengerCount
    })
    setColor('success')
    setMessage(t('success_message'))
    }catch (error: any) {
      if (error.response) {
        if (error.response.status === 400) {
          setColor('danger')
          if (error.response.data?.phone){
            setMessage(t('error_existing_reservation'))
          } 
          else if(error.response.data?.pick_up_date){
            setMessage(t('error_past_date'))
          }else{
            setMessage(t('error_invalid_data'))
          }
        } else if (error.response.status >= 500) {
          setColor('warning')
          setMessage(t('error_server'))
        } else {
          setMessage(t('error_unknown'))
        }
      } else {
        setColor('danger')
        setMessage(t('error_network'))
      }
    }
  }

  return (
    <Container className='my-4 justify-content-center'>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>{t('full_name')}</Form.Label>
              <Form.Control type='text' name='full_name' value={formData.full_name} onChange={handleChange} placeholder={t('placeholder_full_name')} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>{t('phone')}</Form.Label>
              <Form.Control type='tel' name='phone' value={formData.phone} onChange={handleChange} placeholder={t('placeholder_phone')} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>{t('pick_up_location')}</Form.Label>
              <Form.Control type='text' name='pick_up_location' value={formData.pick_up_location} onChange={handleChange} placeholder={t('placeholder_pick_up_location')} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>{t('drop_off_location')}</Form.Label>
              <Form.Control type='text' name='drop_off_location' value={formData.drop_off_location} onChange={handleChange} placeholder={t('placeholder_drop_off_location')} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>{t('pick_up_date')}</Form.Label>
              <Form.Control type='datetime-local' name='pick_up_date' value={formData.pick_up_date} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={6} className='mx-auto'>
            <Form.Group className='text-center'>
              <Form.Label>{t('passenger_count')}</Form.Label>
              <div className='d-flex justify-content-center align-items-center gap-2'>
                <Button variant='outline-secondary' onClick={() => setPassengerCount(prev => Math.max(1, prev - 1))}>-</Button>
                <span className='fw-bold'>{passengerCount}</span>
                <Button variant='outline-secondary' onClick={() => setPassengerCount(prev => prev + 1)}>+</Button>
              </div>
            </Form.Group>
          </Col>
          <Col md={12} className='text-center mt-4'>
            <Button type='submit'>{t('submit')}</Button>
          </Col>
          <Col md={12} className={`text-${color} text-center`}>
            <span>{message}</span>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

export default ReservationForm