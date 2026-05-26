import { useRef, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useGSAP } from '@gsap/react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import gsap from 'gsap'

import api from '../services/api'
import CheckReservation from '../pages/CheckReservation'
import type { CreateOrder } from '../types'


const ReservationForm = () => {
  const [passengerCount, setPassengerCount] = useState<number>(1)
  const [message, setMessage] = useState<string>('')
  const [color, setColor] = useState<string>('success')
  const [roundTrip, setRoundTrip] = useState<boolean>(false)
  const [checkReservation, setCheckReservation] = useState<boolean>(false)
  const [mapTarget, setMapTarget] = useState<'pick_up' | 'drop_off' | null>(null)
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  
  const location = useLocation()
  const navigate = useNavigate()

  const handleMapSelect = async (latlng: { lat: number; lng: number }) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json`,
      {
        headers: {
          'Accept-Language': 'tr'
        }
      }
    )
    const data = await res.json()
    const address = data.display_name

    if (mapTarget === 'pick_up') {
      setFormData(prev => ({ ...prev, pick_up_location: address }))
    } else if (mapTarget === 'drop_off') {
      setFormData(prev => ({ ...prev, drop_off_location: address }))
    }
    setMapTarget(null)
  }

  interface Props{
    onSelect: (latlng: { lat: number; lng: number }) => void
  }

  const LocationPicker = ({ onSelect }: Props) => {
    useMapEvents({
      click(e) {
        onSelect(e.latlng)
      }
    })
    return null
  }


  const [formData, setFormData] = useState<CreateOrder>({
    full_name: '',
    phone: '',
    pick_up_location: '',
    drop_off_location: '',
    pick_up_date: '',
    return_date: '',
    passenger_count: 1,
  })

  useEffect(() => {
    if (location.pathname === '/check-reservation') {
      setCheckReservation(true)
    } else {
      setCheckReservation(false)
    }
  }, [location.pathname])

  useGSAP(() => {
    if (checkReservation) {
      gsap.to(".flip-card", {
        rotateY: 180,
        duration: 0.8,
        ease: "power2.inOut",
      })
    } else {
      gsap.to(".flip-card", {
        rotateY: 0,
        duration: 0.8,
        ease: "power2.inOut",
      })
    }
  }, { dependencies: [checkReservation], scope: containerRef })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.pick_up_location || !formData.full_name || !formData.phone || !formData.pick_up_date) {
      setColor('danger')
      setMessage(t('error_invalid_data'))
      return
    }

    setMessage(t('loading'))
    try {
      await api.post('orders/', {
        ...formData,
        return_date: formData.return_date || null,
        passenger_count: passengerCount
      })

      setColor('success')
      setMessage(t('success_message'))
      localStorage.setItem('name', formData.full_name)
      localStorage.setItem('phone', formData.phone)
      navigate('/check-reservation')

    } catch (error: any) {
      if (error.response) {
        setColor('danger')
        if (error.response.status === 400) {
          const data = error.response.data
          if (data?.phone?.[0] === 'existing_reservation') {
            setMessage(t('error_existing_reservation'))
          } else if (data?.pick_up_date) {
            setMessage(t('error_past_date'))
          } else {
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
    <div ref={containerRef} style={{ perspective: 1000, background: 'transparent', width: '100%' }}>
      <div className="flip-card" style={{ transformStyle: 'preserve-3d', position: 'relative', width: '100%' }}>
        
        <div style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', position: 'relative', zIndex: checkReservation ? 1 : 2 }}>
          <Container className='px-3 px-md-4'>
            <div className='form-container rounded-4 py-4 px-3 px-md-4'>
              <Form onSubmit={handleSubmit} style={{ minHeight: '448px' }}>
                <Row className='g-3'>
                 <Col xs={12}>
                  <div className='d-flex gap-2 mb-2'>
                    <Button size='sm' variant={mapTarget === 'pick_up' ? 'primary' : 'outline-primary'} onClick={() => setMapTarget('pick_up')}>
                      {t('pick_up_location')}
                    </Button>
                    <Button size='sm' variant={mapTarget === 'drop_off' ? 'primary' : 'outline-primary'} onClick={() => setMapTarget('drop_off')}>
                      {t('drop_off_location')}
                    </Button>
                  </div>
                  {mapTarget && (
                    <MapContainer center={[36.5, 32.0]} zoom={10} style={{ height: '300px', borderRadius: '8px' }}>
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <LocationPicker onSelect={handleMapSelect} />
                    </MapContainer>
                  )}
                </Col>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label className='fw-semibold'>{t('pick_up_location')}</Form.Label>
                      <Form.Control type='text' name='pick_up_location' value={formData.pick_up_location} onChange={handleChange} placeholder={t('placeholder_pick_up_location')} />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label className='fw-semibold'>{t('drop_off_location')}</Form.Label>
                      <Form.Control type='text' name='drop_off_location' value={formData.drop_off_location} onChange={handleChange} placeholder={t('placeholder_drop_off_location')} />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label className='fw-semibold'>{t('full_name')}</Form.Label>
                      <Form.Control type='text' name='full_name' value={formData.full_name} onChange={handleChange} placeholder={t('placeholder_full_name')} />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label className='fw-semibold'>{t('phone')}</Form.Label>
                      <Form.Control type='tel' name='phone' value={formData.phone.trim()} onChange={handleChange} placeholder={t('placeholder_phone')} />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={roundTrip ? 6 : 12}>
                    <Form.Group>
                      <Form.Label className='fw-semibold'>{t('pick_up_date')}</Form.Label>
                      <Form.Control type='datetime-local' name='pick_up_date' value={formData.pick_up_date} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                  {!roundTrip && (
                    <Col xs={12}>
                      <Button variant='outline-secondary' className='w-100' onClick={() => setRoundTrip(true)}>
                        {t('two_way_button')}
                      </Button>
                    </Col>
                  )}

                  {roundTrip && (
                    <Col xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className='fw-semibold'>{t('return_date')}</Form.Label>
                        <Form.Control type='datetime-local' name='return_date' value={formData.return_date} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                  )}
                  <Col xs={12}>
                    <div className='d-flex gap-3'>
                      <Form.Check type="radio" id="type-one-way" name='tripType' label={t('one_way')} checked={roundTrip === false} onChange={() => setRoundTrip(false)} />
                      <Form.Check type="radio" name='tripType' id="type-round-trip" checked={roundTrip === true} onChange={() => setRoundTrip(true)} label={t('two_way')} />
                    </div>
                  </Col>
                  <Col xs={12}>
                    <Form.Group className='text-center'>
                      <Form.Label className='fw-semibold d-block'>{t('passenger_count')}</Form.Label>
                      <div className='d-flex justify-content-center align-items-center gap-3'>
                        <Button variant='outline-secondary' onClick={() => setPassengerCount(prev => Math.max(1, prev - 1))}>-</Button>
                        <span className='fw-bold fs-5'>{passengerCount}</span>
                        <Button variant='outline-secondary' onClick={() => setPassengerCount(prev => prev + 1)}>+</Button>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col xs={12} className='text-center mt-2'>
                    <Button type='submit' className='px-5'>{t('submit')}</Button>
                  </Col>
                  <Col xs={12} className={`text-${color} text-center`}>
                    <small>{message}</small>
                  </Col>
                </Row>
              </Form>
            </div>
          </Container>
        </div>

        <div style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transform: 'rotateY(180deg)', zIndex: checkReservation ? 2 : 1 }}>
          <Container className='px-3 px-md-4'>
            <div className='form-container rounded-4 py-4 px-3 px-md-4' style={{ minHeight: '448px' }}>
              <CheckReservation />
            </div>
          </Container>
        </div>

      </div>
    </div>
  )
}

export default ReservationForm