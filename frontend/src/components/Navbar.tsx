import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Coffee, ShoppingCart } from 'lucide-react';

const Navbar: React.FC = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  if (!context) return null;
  const { user, cart, logout } = context;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
          <Coffee className="me-2 text-warning" /> Bite & Brew
        </Link>
        <div className="navbar-nav ms-auto align-items-center flex-row gap-3">
          <Link className="nav-link" to="/menu">Menü</Link>
          {user ? (
            <>
              <Link className="nav-link" to="/dashboard">Sadakat Kartım</Link>
              <Link className="btn btn-warning d-flex align-items-center fw-bold btn-sm" to="/checkout">
                <ShoppingCart size={18} className="me-2"/> ({cart.length})
              </Link>
              <button onClick={handleLogout} className="btn btn-outline-light btn-sm">Çıkış Yap</button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">Giriş Yap</Link>
              <Link className="btn btn-outline-warning btn-sm" to="/register">Kayıt Ol</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
