import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProvider } from './context/AppContext';

// Bileşenler ve Sayfalar
import Navbar from './components/Navbar';
import Menu from './pages/Menu';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import { AuthPage } from './pages/Auth';
import Dashboard from './pages/Dashboard';

const Placeholder = ({ title }: { title: string }) => (
  <div className="container mt-5 text-center">
    <h2>{title} - Under Construction 🚧</h2>
  </div>
);

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/abouts" element={<Placeholder title="About Us" />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;