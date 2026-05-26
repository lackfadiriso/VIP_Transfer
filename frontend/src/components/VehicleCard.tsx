import { useRef } from 'react'
import gsap from 'gsap'
import type { Vehicle } from '../types'

interface Props {
  vehicle: Vehicle
}

export const VehicleCard = ({ vehicle }: Props) => {
  const imgRef = useRef<HTMLImageElement>(null)

  const handleMouseEnter = () => {
    gsap.to(imgRef.current, { scale: 1.07, duration: 0.4, ease: 'power2.out' })
  }

  const handleMouseLeave = () => {
    gsap.to(imgRef.current, { scale: 1, duration: 0.4, ease: 'power2.out' })
  }

  return (
    <div
      className='rounded-4 overflow-hidden flex-shrink-0'
      style={{
        width: 'clamp(200px, 80vw, 320px)',
        minWidth: 'clamp(200px, 80vw, 320px)',
        background: 'linear-gradient(145deg, #1a1a2e, #16213e)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ overflow: 'hidden', height: '220px' }}>
        <img
          ref={imgRef}
          src={vehicle.image}
          alt={vehicle.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div className='p-3 d-flex justify-content-between align-items-center'>
        <span className='fw-semibold' style={{ color: '#f0f0f0' }}>
          {vehicle.name}
        </span>
        <span
          className='px-2 py-1 rounded-2'
          style={{ background: 'rgba(255,255,255,0.1)', color: '#a0a0b0', fontSize: '13px' }}
        >
          {vehicle.capacity} kişi
        </span>
      </div>
    </div>
  )
}