import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Coffee, ShoppingBag, LogOut, Menu, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  if (!context) return null;
  const { user, cart, logout } = context;

  const isActive = (path: string) => location.pathname === path ? 'border-bottom border-warning border-3 text-warning' : 'text-white';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-lg py-3">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center fw-bold fs-3 text-warning" to="/">
          <Coffee className="me-2" size={32} /> Bite & Brew
        </Link>
        
        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <Menu size={28} />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto gap-lg-4 mt-3 mt-lg-0">
            <li className="nav-item">
              <Link className={`nav-link text-uppercase fw-bold px-0 ${isActive('/')}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link text-uppercase fw-bold px-0 ${isActive('/menu')}`} to="/menu">Menu</Link>
            </li>
            {user && (
              <li className="nav-item">
                <Link className={`nav-link text-uppercase fw-bold px-0 ${isActive('/dashboard')}`} to="/dashboard">My Rewards</Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            {user ? (
              <>
                <span className="text-white-50 small fw-bold d-none d-lg-inline d-flex align-items-center">
                  <User size={16} className="me-1" /> Hi, {user}
                </span>
                <Link className="btn btn-warning rounded-pill px-3 d-flex align-items-center fw-bold shadow-sm" to="/checkout">
                  <ShoppingBag size={18} className="me-2"/> ({cart.length})
                </Link>
                <button onClick={() => { logout(); navigate('/login'); }} className="btn btn-outline-danger rounded-circle p-2 shadow-sm">
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <Link className="btn btn-warning rounded-pill px-4 fw-bold shadow-sm" to="/login">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;