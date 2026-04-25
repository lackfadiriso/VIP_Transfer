const Header = () => {
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
                        <a className='nav-link' href='/'>Rezervasyon</a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href='/check-reservation'>Rezervasyon Sorgulama</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Header