import { useTranslation } from 'react-i18next'

const Header = () => {
    const { i18n, t } = useTranslation()

  return (
    <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
        <div className='container'>
            <a className='navbar-brand' href='/'><span className='diamond-text fw-bold'>VIP</span> Transfer</a>

            <button
                className='navbar-toggler'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#navbarNav'
            >
                <span className='navbar-toggler-icon'></span>
            </button>

            <div className='collapse navbar-collapse' id='navbarNav'>
                <ul className='navbar-nav ms-auto'>
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
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Header