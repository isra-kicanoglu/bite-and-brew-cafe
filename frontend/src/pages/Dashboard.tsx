import React, { useContext, useState } from 'react'; // useState eklendi
import { AppContext } from '../context/AppContext';
import { Coffee, Award, ChevronRight, Clock, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react'; // İkonlar eklendi
import { Link, Navigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const context = useContext(AppContext);
  const [showAll, setShowAll] = useState(false); // Tabloyu genişletmek için state
  
  if (!context?.user) {
    return <Navigate to="/login" />;
  }

  const { user, stamps } = context;
  const stampsRemaining = 6 - stamps;

  // MOCK DATA: Tabloyu genişletmek için daha fazla veri ekledik
  const previousOrders = [
    { id: "#BB-1024", date: "May 10, 2026", items: "Latte, San Sebastian", total: "225 TL", status: "Completed" },
    { id: "#BB-0985", date: "May 08, 2026", items: "Iced Americano", total: "75 TL", status: "Completed" },
    { id: "#BB-0842", date: "May 05, 2026", items: "Caramel Macchiato, Brownie", total: "205 TL", status: "Completed" },
    { id: "#BB-0712", date: "May 01, 2026", items: "Filter Coffee, Cheesecake", total: "155 TL", status: "Completed" },
    { id: "#BB-0650", date: "April 28, 2026", items: "Mocha, Cookie", total: "130 TL", status: "Completed" },
    { id: "#BB-0590", date: "April 25, 2026", items: "Flat White", total: "85 TL", status: "Completed" },
  ];

  // Eğer showAll false ise sadece ilk 3 siparişi göster
  const visibleOrders = showAll ? previousOrders : previousOrders.slice(0, 3);

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-10 text-center">
          <h2 className="display-5 fw-bold text-brown mb-2">Hello, {user}! 👋</h2>
          <p className="lead text-muted mb-5">Track your rewards and check your order history.</p>

          {/* 1. SADAKAT KARTI */}
          <div className="card shadow-lg border-0 rounded-5 p-5 mb-5 position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #4d2319 0%, #2b130d 100%)', color: 'white' }}>
            <div className="position-absolute top-0 end-0 opacity-10 m-4">
              <Award size={150} />
            </div>
            <h3 className="fw-bold mb-5 d-flex align-items-center justify-content-center text-warning position-relative z-1">
              <Award className="me-2" /> Digital Loyalty Card
            </h3>
            <div className="d-flex justify-content-center flex-wrap gap-3 mb-4 position-relative z-1">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className={`rounded-circle d-flex align-items-center justify-content-center shadow-sm
                    ${i < stamps ? 'bg-warning text-dark' : 'bg-white bg-opacity-10 text-white-50 border border-secondary border-dashed'}`} 
                  style={{ width: '70px', height: '70px', transition: 'all 0.3s ease' }}
                >
                  <Coffee size={32} />
                </div>
              ))}
            </div>
            <div className="bg-white bg-opacity-10 p-3 rounded-3 mt-3 d-inline-block position-relative z-1">
              <p className="mb-0 fs-5">
                Only <span className="text-warning fw-bold fs-4">{stampsRemaining}</span> coffees left until your free one!
              </p>
            </div>
          </div>

          {/* 2. SİPARİŞ GEÇMİŞİ TABLOSU */}
          <div className="text-start mt-5">
            <h3 className="fw-bold text-brown mb-4 d-flex align-items-center">
              <Clock className="me-2 text-warning" /> Recent Orders
            </h3>
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="ps-4 py-3 text-uppercase small fw-bold text-muted">Order ID</th>
                      <th className="py-3 text-uppercase small fw-bold text-muted">Date</th>
                      <th className="py-3 text-uppercase small fw-bold text-muted">Items</th>
                      <th className="py-3 text-uppercase small fw-bold text-muted">Total</th>
                      <th className="py-3 text-uppercase small fw-bold text-muted text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleOrders.map((order) => (
                      <tr key={order.id} className="fade-in-animation">
                        <td className="ps-4 fw-bold text-brown">{order.id}</td>
                        <td className="text-muted">{order.date}</td>
                        <td className="text-muted">{order.items}</td>
                        <td className="fw-bold text-brown">{order.total}</td>
                        <td className="text-center">
                          <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">
                             <CheckCircle size={14} className="me-1" /> {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* DÜZELTİLEN BUTON: Artık sayfa değiştirmiyor, listeyi genişletiyor */}
            <div className="text-center mt-4">
               <button 
                onClick={() => setShowAll(!showAll)} 
                className="btn btn-outline-brown rounded-pill px-4 fw-bold d-inline-flex align-items-center"
               >
                  {showAll ? (
                    <><ChevronUp className="me-2" size={18} /> Show Less</>
                  ) : (
                    <><ChevronDown className="me-2" size={18} /> View Full History</>
                  )}
               </button>
            </div>
          </div>

          <div className="mt-5 pt-4">
            <Link to="/menu" className="btn btn-brown btn-lg rounded-pill fw-bold px-5 shadow">
              Order New Coffee <ChevronRight size={20} className="ms-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;