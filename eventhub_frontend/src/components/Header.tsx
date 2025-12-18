import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Header.scss";

const Header = () => {
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <header className="header">
      <nav className="nav-header">
        <div className="nav-links">
          <Link className="nav-link link-header" to="/">Accueil</Link>
          <Link className="nav-link link-header" to="/events">Événements</Link>
        </div>

        <div className="nav-account" ref={menuRef}>
          <button
            type="button"
            className="account-trigger"
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={open}
          >
            {user ? `${user.name} (${user.role})` : "Mon compte"}
            <span className={`chevron ${open ? "open" : ""}`} />
          </button>

          {open && (
            <div className="account-menu" role="menu">
              {user ? (
                <>
                  {(user.role === "organizer" || user.role === "admin") && (
                    <Link
                      className="account-item"
                      to="/events/new"
                      role="menuitem"
                      onClick={() => setOpen(false)}
                    >
                      Créer un événement
                    </Link>
                  )}

                  {user.role === "admin" && (
                    <Link
                      className="account-item"
                      to="/admin"
                      role="menuitem"
                      onClick={() => setOpen(false)}
                    >
                      Tableau de bord administrateur
                    </Link>
                  )}

                  <button
                    type="button"
                    className="account-item danger"
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    role="menuitem"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link
                    className="account-item"
                    to="/login"
                    role="menuitem"
                    onClick={() => setOpen(false)}
                  >
                    Connexion
                  </Link>
                  <Link
                    className="account-item"
                    to="/register"
                    role="menuitem"
                    onClick={() => setOpen(false)}
                  >
                    Inscription
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
