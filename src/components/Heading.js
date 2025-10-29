// src/components/Heading.jsx
import React, { useState, useRef, useEffect } from 'react';
import { NavLink} from 'react-router-dom';
import logo from '../assets/logo.png';
import './Heading.css';

const Heading = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const triggerRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const onDown = (e) => {
      if (
        triggerRef.current?.contains(e.target) ||
        menuRef.current?.contains(e.target)
      ) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="header">
      <img src={logo} alt="My Logo" className="logo" />

      <nav className="nav">
        <ul className="nav-links">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>

          {/* Portfolio dropdown (click to toggle) */}
          <li className="dropdown">
            <button
              ref={triggerRef}
              type="button"
              className="dropdown-trigger"
              aria-haspopup="menu"
              aria-expanded={open}
              onClick={() => setOpen(v => !v)}
            >
              Portfolio <span className="caret">▾</span>
            </button>

            {open && (
              <ul className="dropdown-menu" role="menu" ref={menuRef}>
                <li role="none"><NavLink to="/portfolio/projects" onClick={close} role="menuitem">Personal Projects</NavLink></li>
                <li role="none"><NavLink to="/portfolio/experience" onClick={close} role="menuitem">Work Experience</NavLink></li>
                <li role="none"><NavLink to="/portfolio/skills" onClick={close} role="menuitem">Skills</NavLink></li>
              </ul>
            )}
          </li>

          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default Heading;
