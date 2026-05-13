import React, { useState, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Coffee, LogIn, UserPlus, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');

    // Validation (Software Quality)
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('cafe_users') || '[]');

    if (isLogin) {
      const foundUser = storedUsers.find((u: any) => u.email === email);
      if (!foundUser) {
        setError("User not found. Check your email or register.");
      } else if (foundUser.password !== password) {
        setError("Incorrect password. Access denied.");
      } else {
        context?.login(foundUser.username);
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => navigate('/dashboard'), 1500);
      }
    } else {
      const userExists = storedUsers.some((u: any) => u.email === email);
      if (userExists) {
        setError("This email is already registered.");
      } else {
        storedUsers.push({ username, email, password });
        localStorage.setItem('cafe_users', JSON.stringify(storedUsers));
        setSuccess("Registration successful! You can now login.");
        setTimeout(() => navigate('/login'), 2000);
      }
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="card border-0 shadow-2xl rounded-5 overflow-hidden" style={{ maxWidth: '450px', width: '100%' }}>
        <div className="bg-dark p-5 text-center text-white">
          <Coffee className="text-warning mb-3" size={50} />
          <h2 className="fw-bold">Bite & Brew</h2>
          <p className="text-white-50 mb-0">Loyalty Portal</p>
        </div>

        <div className="card-body p-5">
          <h3 className="fw-bold mb-4">{isLogin ? "Sign In" : "Sign Up"}</h3>

          {error && <div className="alert alert-danger py-2 rounded-4 small d-flex align-items-center shadow-sm"><AlertCircle size={16} className="me-2"/> {error}</div>}
          {success && <div className="alert alert-success py-2 rounded-4 small d-flex align-items-center shadow-sm"><CheckCircle size={16} className="me-2"/> {success}</div>}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-floating mb-3">
                <input type="text" className="form-control rounded-4" placeholder="Name" value={username} onChange={e => setUsername(e.target.value)} required />
                <label>Full Name</label>
              </div>
            )}
            <div className="form-floating mb-3">
              <input type="email" className="form-control rounded-4" placeholder="email@biz.com" value={email} onChange={e => setEmail(e.target.value)} required />
              <label>Email</label>
            </div>
            <div className="form-floating mb-4 position-relative">
              <input type={showPassword ? "text" : "password"} className="form-control rounded-4" placeholder="Pass" value={password} onChange={e => setPassword(e.target.value)} required />
              <label>Password</label>
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="btn position-absolute end-0 top-50 translate-middle-y border-0 text-muted shadow-none">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <button type="submit" className="btn btn-warning btn-lg w-100 rounded-pill fw-bold shadow d-flex align-items-center justify-content-center">
              {isLogin ? <><LogIn size={20} className="me-2"/> Sign In</> : <><UserPlus size={20} className="me-2"/> Create Account</>}
            </button>
          </form>

          <div className="text-center mt-4 pt-3 border-top border-light">
            <p className="text-muted small">{isLogin ? "Don't have an account?" : "Member?"} 
              <Link to={isLogin ? "/register" : "/login"} className="text-warning fw-bold ms-2 text-decoration-none">
                {isLogin ? "Register Now" : "Sign In Instead"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};