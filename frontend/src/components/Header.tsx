import { useTranslation } from 'react-i18next'
import { FaSun, FaMoon } from 'react-icons/fa'
import useTheme from '../hooks/useTheme'

const Header = () => {
    const { i18n, t } = useTranslation()
    const { theme, setTheme } = useTheme()

  return (
    <nav className={`navbar navbar-expand-md navbar-dark ${theme == 'light' ? 'bg-dark' : 'light'}`}>
        <div className='container'>
            <a className='navbar-brand slide-in' href='/'>Antalya <span className='diamond-text fw-bold'>VIP</span> Transfer</a>

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
                    <li className="nav-item dropdown">
                        <a 
                            className="nav-link dropdown-toggle" 
                            href="#" 
                            role="button" 
                            data-bs-toggle="dropdown"
                        >
                            🌐 {i18n.language.toUpperCase()}
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <button className="dropdown-item" onClick={() => i18n.changeLanguage('tr')}>
                                    🇹🇷 Türkçe
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item" onClick={() => i18n.changeLanguage('en')}>
                                    🇬🇧 English
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item" onClick={() => i18n.changeLanguage('ru')}>
                                    🇷🇺 Русский
                                </button>
                            </li>
                        </ul>
                    </li>
                    <li className='nav-item ms-2'>
                        <button 
                            className='btn btn-link nav-link'
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        >
                            {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Header