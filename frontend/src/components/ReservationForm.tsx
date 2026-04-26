import { useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import api from '../services/api'
import type { CreateOrder } from '../types'

const ReservationForm = () => {
  const [passengerCount, setPassengerCount] = useState<number>(1)
  const [message, setMessage] = useState<string>('')
  const [color, setColor] = useState<string>('success')
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
    setMessage("Loading...")
    try{
    await api.post('orders/', {
      ...formData,
      passenger_count: passengerCount
    })
    setColor('success')
    setMessage('Reservation request created successfully. You can track the status on the "My Reservation" page.')
    }catch (error: any) {
      if (error.response) {
        if (error.response.status === 400) {
          setColor('danger')
          if (error.response.data?.phone){
            setMessage('You are have a reservation')
          } 
          else if(error.response.data?.pick_up_date){
            setMessage('You cannot make a reservation for a past date.')
          }else{
            setMessage('Invalid data submitted.')
          }
        } else if (error.response.status >= 500) {
          setColor('warning')
          setMessage('Server error.')
        } else {
          setMessage('An unknown error occurred.')
        }
      } else {
        setColor('danger')
        setMessage('Network error.')
      }
    }
  }

  return (
    <Container className='my-4 justify-content-center'>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control type='text' name='full_name' value={formData.full_name} onChange={handleChange} placeholder='Enter Your Full Name' />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type='tel' name='phone' value={formData.phone} onChange={handleChange} placeholder='05678901234' />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Pick Up Location</Form.Label>
              <Form.Control type='text' name='pick_up_location' value={formData.pick_up_location} onChange={handleChange} placeholder='Enter Pick Up Location' />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Drop Off Location</Form.Label>
              <Form.Control type='text' name='drop_off_location' value={formData.drop_off_location} onChange={handleChange} placeholder='Enter Drop Off Location' />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Pick Up Date</Form.Label>
              <Form.Control type='datetime-local' name='pick_up_date' value={formData.pick_up_date} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={6} className='mx-auto'>
            <Form.Group className='text-center'>
              <Form.Label>Passenger Count</Form.Label>
              <div className='d-flex justify-content-center align-items-center gap-2'>
                <Button variant='outline-secondary' onClick={() => setPassengerCount(prev => Math.max(1, prev - 1))}>-</Button>
                <span className='fw-bold'>{passengerCount}</span>
                <Button variant='outline-secondary' onClick={() => setPassengerCount(prev => prev + 1)}>+</Button>
              </div>
            </Form.Group>
          </Col>
          <Col md={12} className='text-center mt-4'>
            <Button type='submit'>Create Reservation</Button>
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