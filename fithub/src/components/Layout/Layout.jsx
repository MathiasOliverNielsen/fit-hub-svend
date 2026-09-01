import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Navigation } from '../Navigation/Navigation'
import './Layout.scss'

export function Layout({ children }) {
  const [navOpen, setNavOpen] = useState(false)
  const location = useLocation()
  const isWelcomePage = location.pathname === '/'
  const showNavButton = !isWelcomePage

  return (
    <div className="layout">
      {showNavButton && (
        <button
          className="hamburger-button"
          onClick={() => setNavOpen(true)}
          aria-label="Open menu"
        >
          <img src="/imgs/Burger Nav Icon.svg" alt="Menu" />
        </button>
      )}
      <main className="layout-main">{children}</main>
      {showNavButton && (
        <Navigation isOpen={navOpen} onClose={() => setNavOpen(false)} />
      )}
    </div>
  )
}
