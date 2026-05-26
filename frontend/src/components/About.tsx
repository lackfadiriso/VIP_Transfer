import { useEffect, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import type { AboutData } from '../types'
import api from '../services/api'


const About = () => {
  const { t } = useTranslation()
  const [about, setAbout] = useState<AboutData | null>(null)

  useEffect(() => {
    api.get('about/').then(res => {
      const data = Array.isArray(res.data) ? res.data[0] : res.data
      setAbout(data)
    })
    console.log(about)
  }, [])

  return (
    <Container className='py-5 mt-2'>
      <h2 className='text-muted text-uppercase fw-semibold text-center mb-5' style={{ letterSpacing: '0.05em'}}>
        {t('about')}
      </h2>
      <Row className='align-items-center g-4'>
        <Col md={6} className='d-flex justify-content-center'>
          <img
            src="about.png"
            alt="About"
            style={{ width: '100%', maxWidth: '300px', height: 'auto' }}
          />
        </Col>
        <Col md={6}>
          <p className='text-start mb-4' style={{ lineHeight: '1.7' }}>
            {about?.about_text}
          </p>
          <div className='d-flex gap-3'>
            <div className='text-center p-3 rounded-3 flex-fill' style={{ background: 'var(--card-bg)' }}>
              <p className='fw-semibold mb-1' style={{ fontSize: '24px' }}>
                {about?.years_experience}+
              </p>
              <small className='text-muted'>{t('years_experience')}</small>
            </div>
            <div className='text-center p-3 rounded-3 flex-fill' style={{ background: 'var(--card-bg)' }}>
              <p className='fw-semibold mb-1' style={{ fontSize: '24px' }}>
                {about?.happy_customer}
              </p>
              <small className='text-muted'>{t('satisfied_customers')}</small>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default About