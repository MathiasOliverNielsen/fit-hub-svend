import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navigation } from "../Navigation/Navigation";
import "./Layout.scss";

export function Layout({ children }) {
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isWelcomePage = location.pathname === "/";
  const isHomePage = location.pathname === "/home";
  const isMySchedulePage = location.pathname === "/my-schedule";
  const showNavButton = !isWelcomePage;
  const showBackButton = !isWelcomePage && !isHomePage && !isMySchedulePage;

  return (
    <div className="layout">
      {showBackButton && (
        <button className="back-button" onClick={() => navigate(-1)} aria-label="Go back">
          <img src="/imgs/BackButton.svg" alt="Back" />
        </button>
      )}
      {showNavButton && (
        <button className="hamburger-button" onClick={() => setNavOpen(true)} aria-label="Open menu">
          <img src="/imgs/Burger Nav Icon.svg" alt="Menu" />
        </button>
      )}
      <main className="layout-main">{children}</main>
      {showNavButton && <Navigation isOpen={navOpen} onClose={() => setNavOpen(false)} />}
    </div>
  );
}
