import { useEffect, useState } from 'react'

const useTheme = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        return (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
    })

    useEffect(() => {
        localStorage.setItem('theme', theme)
        document.body.classList.toggle('dark', theme === 'dark')
    }, [theme])
  return { theme, setTheme}
}

export default useTheme
