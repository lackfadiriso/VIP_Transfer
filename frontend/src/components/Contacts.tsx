import { FaWhatsapp, FaPhone } from "react-icons/fa"

const Contacts = () => {
    const btnStyle: React.CSSProperties = {
        position: 'fixed',
        right: '2rem',
        width: '52px',
        height: '52px',
        borderRadius: '50%',
        textDecoration: 'none', 
        background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 15px rgba(185,147,255,0.3)',
        zIndex: 999,
        transition: 'transform 0.2s, box-shadow 0.2s',
    }

  return (
    <div>
        <a
        href="https://wa.me/905530819922"
        style={{ ...btnStyle, bottom: '8rem' }}
        target="_blank"
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
            <FaWhatsapp color="rgba(220,200,255,0.95)" size={26} />
        </a>
        <a 
        href="tel:+905530819922"
        style={{ ...btnStyle, bottom: '4rem' }}
        target="_blank"
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
            <FaPhone color="rgba(220,200,255,0.95)" size={20}/>
        </a>
    </div>
  )
}

export default Contacts
