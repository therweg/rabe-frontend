import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { logout } from '../store/auth/actions';

const Nav = (props) => {
  const { auth, logout } = props;
  const router = useRouter();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-lg-5 mb-3">
      <Link href="/">
        <a className="navbar-brand rabe-logo">RaBe</a>
      </Link>
      {auth.isAuthenticated
        && (
        <>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span
              className="navbar-toggler-icon"
            />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className={`nav-item${router.pathname === '/rooms' ? ' active' : ''}`}>
                <Link href="/rooms">
                  <a className="nav-link">
                      Räume
                  </a>
                </Link>
              </li>
              <li className={`nav-item dropdown ${router.pathname.includes('/supervisor') ? ' active' : ''}`}>
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdownMenuBetreuer"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Betreuer
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <Link href="/supervisor/defects">
                    <a className="dropdown-item">Gemeldete Mängel</a>
                  </Link>
                  <Link href="/supervisor/rooms">
                    <a className="dropdown-item">Betreute Räume</a>
                  </Link>
                  <Link href="/supervisor/common-defects">
                    <a className="dropdown-item">Häufige Mängel</a>
                  </Link>
                </div>
              </li>
              <li className={`nav-item dropdown ${router.pathname.includes('/admin') ? ' active' : ''}`}>
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdownMenuAdmin"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Administration
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <Link href="/admin/teachers">
                    <a className="dropdown-item">Lehrerverwaltung</a>
                  </Link>
                  <Link href="/admin/rooms">
                    <a className="dropdown-item">Raumverwaltung</a>
                  </Link>
                </div>
              </li>
              <li className={`nav-item dropdown ${router.pathname.includes('/user') ? ' active' : ''}`}>
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuUser"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Benutzer
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <Link href="/user/reset-password">
                    <a className="dropdown-item">Passwort ändern</a>
                  </Link>
                  <button type="button" className="dropdown-item" onClick={logout}>Abmelden</button>
                </div>
              </li>
            </ul>
          </div>
        </>
        )}
    </nav>
  );
};

Nav.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
  }),
  logout: PropTypes.func,
};

Nav.defaultProps = {
  auth: {
    isAuthenticated: false,
  },
  logout: () => ({}),
};

export default connect(
  (state) => ({
    auth: state.auth,
  }),
  (dispatch) => ({
    logout: () => dispatch(logout()),
  }),
)(Nav);
