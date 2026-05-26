import { useTranslation } from 'react-i18next'
import ReservationForm from '../components/ReservationForm'

import About from '../components/About'
import Header from '../components/Header'
import Prices from '../components/Prices'
import VehicleList from '../components/VehicleList'


const HomePage = () => {
  const { t } = useTranslation()
  return (
      <div style={{ marginBottom: '125px'}}>
            <div className='background-image min-vh-50 mt-2 border-2'>
        <Header/>
        <div className='text-center' style={{
          color: '#0A192F',
          textShadow: '1px 1px 3px rgba(255,255,255,0.5)'
        }}>
          <h1>{t('hero_title')}</h1>
          <h5>{t('hero_subtitle')}</h5>
        </div>
        <ReservationForm/>
      </div>
        <Prices/>
        <About/>
        <VehicleList/>
      </div>
  )
}

export default HomePage
