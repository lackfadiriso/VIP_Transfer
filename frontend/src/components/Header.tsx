import { useTranslation } from 'react-i18next'
import { FaSun, FaMoon } from 'react-icons/fa'
import useTheme from '../hooks/useTheme'


const Header = () => {
    const { i18n, t } = useTranslation()
    const { theme, setTheme } = useTheme()

    const changeLang = (lang: string) => {
        i18n.changeLanguage(lang)
        localStorage.setItem('lang', lang)
        window.location.reload()
    }

  return (
        <nav className={`navbar navbar-expand-md`} style={{opacity: 1}}>
            <div className='container'>
                <a href="/"><img src="/move.png" className='car border-0 img-fluid'></img></a>

                <button
                    className='navbar-toggler'
                    type='button' 
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarNav'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav ms-auto align-items-center'>
                        <li className='nav-item'>
                            <a className='nav-link' href='/'>{t('reservation')}</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='/check-reservation'>{t('my_reservation')}</a>
                        </li>
                        <li className='nav-item'>
                            <button 
                                className='btn btn-link nav-link'
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            >
                                {theme === 'dark' ? <FaSun size={18} className=' text-warning'/> : <FaMoon size={18} />}
                            </button>
                        </li>
                                        <li className="nav-item dropdown" style={{ listStyle: 'none' }}>
                        <a 
                            className="dropdown-toggle text-decoration-none" 
                            href="#" 
                            role="button" 
                            data-bs-toggle="dropdown"
                        >
                            🌐 {i18n.language.toUpperCase()}
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end opacity-100">
                            <li><button className="dropdown-item" onClick={() => changeLang('tr')}>🇹🇷 Türkçe</button></li>
                            <li><button className="dropdown-item" onClick={() => changeLang('en')}>🇬🇧 English</button></li>
                            <li><button className="dropdown-item" onClick={() => changeLang('ru')}>🇷🇺 Русский</button></li>
                        </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
  )
}

export default Header