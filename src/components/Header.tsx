import { Globe, Newspaper, Settings, User } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <a href="/" className="header__brand">
            <Newspaper className="header__icon" size={32} />
            <h1 className="header__title">Innoreader</h1>
          </a>
          <nav className="header__nav">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `header__link ${isActive ? "header__link--active" : ""}`
              }
            >
              <User size={16} />
              You
            </NavLink>

            <NavLink
              to="/search"
              className={({ isActive }) =>
                `header__link ${isActive ? "header__link--active" : ""}`
              }
            >
              <Globe size={16} />
              Explore
            </NavLink>
            <NavLink
              to="/preferences"
              className={({ isActive }) =>
                `header__link ${isActive ? "header__link--active" : ""}`
              }
            >
              <Settings size={16} />
              Settings
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
