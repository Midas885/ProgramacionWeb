import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const Layout = ({ children, userInfo, handleSignOut }) => {
  const navigate = useNavigate();
  
  const handleSignOutClick = async () => {
    try {
      await handleSignOut();
      navigate('/login'); 
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/">ITLA-CRUSH</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>

              {userInfo && (
                <li className="nav-item">
                  <Link className="nav-link" to="/confession">Confession</Link>
                </li>
              )}

            </ul>
            <ul className="navbar-nav">
              {userInfo ? (
                <li className="nav-item">
                  <button className="nav-link btn btn-link fw-bold" onClick={handleSignOutClick}>
                    Cerrar sesión {userInfo.firstName}!
                  </button>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link fw-bold" to="/login">Iniciar Sesión!</Link>
                </li>
              )}

            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;
