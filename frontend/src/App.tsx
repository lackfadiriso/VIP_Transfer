import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Contacts from './components/Contacts'

const HomePage = lazy(() => import('./pages/HomePage'))
const CheckReservation = lazy(() => import('./pages/CheckReservation'))


function App() {
  return (
  <div className='d-flex flex-column min-vh-100'>
    <Header/>
    <main className='flex-grow-1'>
      <Suspense fallback={<div className='text-center'>Loading...</div>}>
        <Routes>
          <Route path='/' element={<HomePage /> } />
          <Route path='/check-reservation' element={<CheckReservation />}/>
        </Routes>
      </Suspense>
    </main>
    <Contacts/>
    <Footer/>
  </div>
  )
}

export default App
