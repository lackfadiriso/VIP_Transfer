import { useEffect, useState, useRef } from 'react'
import { Container } from 'react-bootstrap'
import { VehicleCard } from './VehicleCard'
import { useTranslation } from 'react-i18next'

import type { Vehicle } from '../types'
import api from '../services/api'
import gsap from 'gsap'

const VehicleList = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const sliderRef = useRef<HTMLDivElement>(null)

  const { t } = useTranslation()

  useEffect(() => {
    api.get('vehicles/').then(res => {
      const data = Array.isArray(res.data) ? res.data : res.data.results ?? []
      setVehicles(data)
      setLoading(false)
    })
  }, [])

  const scroll = (dir: 'left' | 'right') => {
    if (!sliderRef.current) return
    gsap.to(sliderRef.current, {
      scrollLeft: sliderRef.current.scrollLeft + (dir === 'right' ? 300 : -300),
      duration: 0.5,
      ease: 'power2.out',
    })
  }

  return (
    <Container className='py-5'>
      <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
        <h2 className="text-muted text-uppercase fw-semibold text-center" style={{ letterSpacing: '0.05em' }}>
            {t('transfer_cars')}
        </h2>
      </div>
      <div className='position-relative px-4'>
        <button
          onClick={() => scroll('left')}
          className='btn btn-dark rounded-circle position-absolute top-50 translate-middle-y'
          style={{ left: '0', zIndex: 10, width: '40px', height: '40px' }}
        >
          ‹
        </button>

        <div
          ref={sliderRef}
          className='vehicle-slider d-flex gap-3 py-2'
          style={{ overflowX: 'auto', maxWidth: '100%', width: '100%' }}
        >
          {loading ? (
            [1, 2, 3].map(i => (
              <div
                key={i}
                className='rounded-4 placeholder-glow flex-shrink-0'
                style={{ width: 'clamp(240px, 80vw, 320px)', minWidth: 'clamp(240px, 80vw, 320px)', height: '280px' }}
              >
                <span className='placeholder w-100 h-100 rounded-4' />
              </div>
            ))
          ) : (
            vehicles.map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))
          )}
        </div>

        <button
          onClick={() => scroll('right')}
          className='btn btn-dark rounded-circle position-absolute top-50 translate-middle-y'
          style={{ right: '0', zIndex: 10, width: '40px', height: '40px' }}
        >
          ›
        </button>
      </div>

      <style>{`
        .vehicle-slider::-webkit-scrollbar { display: none; }
        .vehicle-slider { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </Container>
  )
}

export default VehicleList