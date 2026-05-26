import { lazy } from 'react'

import './App.css'
import Footer from './components/Footer'
import Contacts from './components/Contacts'

const HomePage = lazy(() => import('./pages/HomePage'))


function App() {
  return (
  <div className='d-flex flex-column min-vh-100'>
      <main className='flex-grow-1'>
        <HomePage/>
      </main>
    <Contacts/>
    <div className='flex-grow-1'></div>
    <Footer/>
  </div>
  )
}

export default App
