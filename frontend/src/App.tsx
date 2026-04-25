import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import './App.css'
import Header from './components/Header'

const HomePage = lazy(() => import('./pages/HomePage'))
const CheckReservation = lazy(() => import('./pages/CheckReservation'))


function App() {
  return (
  <div>
    <Header/>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/' element={<HomePage /> } />
        <Route path='/check-reservation' element={<CheckReservation />}/>
      </Routes>
    </Suspense>
  </div>
  )
}

export default App
