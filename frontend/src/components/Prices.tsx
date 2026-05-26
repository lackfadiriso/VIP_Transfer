import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import api from '../services/api'

interface Price {
  id: number
  from_location: string
  to_location: string
  price: string
  currency: string
}

const Prices = () => {
  const [prices, setPrices] = useState<Price[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation()

  useEffect(() => {
      api.get('prices/').then(res => {
          console.log(res.data)
          const data = Array.isArray(res.data) ? res.data : res.data.results ?? []
          setPrices(data)
          setLoading(false)
      })
  }, [])

  return (
    <Container className="col-md-8 col-lg-6 mx-auto mt-5">
    <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
      <h2 className="text-muted text-uppercase fw-semibold text-center" style={{ letterSpacing: '0.05em' }}>
          {t('price_list')}
      </h2>
    </div>

    <div className="row g-2">
      {loading ? (
        [1, 2, 3, 4].map(i => (
          <div key={i} className="col-12 col-md-6">
            <div className="rounded-3 placeholder-glow" style={{ height: 60 }}>
              <span className="placeholder w-100 h-100 rounded-3" />
            </div>
          </div>
        ))
      ) : (
        prices.map(item => (
          <div key={item.id} className="col-12 col-md-6 price-card selection">
            <div className="d-flex align-items-center justify-content-between px-3 py-3 rounded-3 border h-100"
              style={{ transition: 'border-color 0.15s' }}
            >
              <div className="d-flex align-items-center gap-2 fw-semibold">
                <span>{item.from_location}</span>
                <span className="text-muted">→</span>
                <span>{item.to_location}</span>
              </div>
              <span className="px-3 py-1 rounded-2 fw-semibold"
                style={{ background: '#E1F5EE', color: '#085041', whiteSpace: 'nowrap' }}
              >
                {item.price} {item.currency}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
    </Container>
  )
}

export default Prices