import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProvider } from './context/AppContext';

// Bileşenleri ve Sayfaları içeri aktarıyoruz
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { AuthPage } from './pages/Auth';
import Dashboard from './pages/Dashboard';
// Menu sayfası birazdan eklenecek, şimdilik placeholder kullanıyoruz

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
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          <Route path="/menu" element={<Placeholder title="Menu" />} />
          <Route path="/checkout" element={<Placeholder title="Checkout" />} />
          <Route path="/abouts" element={<Placeholder title="About Us" />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;