import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';

// Sayfaları birazdan oluşturacağız, şimdilik yer tutucu koyalım
const Placeholder = ({ title }: { title: string }) => <div className="container mt-5 text-center"><h2>{title} Yapım Aşamasında</h2></div>;

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Placeholder title="Ana Sayfa" />} />
          <Route path="/menu" element={<Placeholder title="Menü" />} />
          <Route path="/dashboard" element={<Placeholder title="Dashboard" />} />
          <Route path="/login" element={<Placeholder title="Giriş / Kayıt" />} />
          <Route path="/register" element={<Placeholder title="Giriş / Kayıt" />} />
          <Route path="/checkout" element={<Placeholder title="Ödeme" />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;