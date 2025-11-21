import React from "react";
import "./Header.css";

import Logo from "../assets/images/logo.png";

const Header = () =>{

  const navItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Événements', href: '/evenements' },
    { label: 'Mes billets', href: '/tickets' },
    { label: 'Organisateur', href: '/organizer' },
    { label: 'Support', href: '/support' }
  ];

  return (
    <>
      <header className="header">
        <a href={navItems[0].href}>
          <img src={Logo} alt="Logo"/> 
        </a>
        <nav className="navHeader">
            {navItems.map((item, index) => (
              <a className="linkHeader" key={index} href={item.href}>
                {item.label}
              </a>
            ))}
        </nav>
      </header>
    </>
  );
};

export default Header;