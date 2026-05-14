import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Coffee, Award, ChevronRight, Clock, CheckCircle, ChevronUp, Gift, PartyPopper, ShoppingBasket } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const context = useContext(AppContext);
  const [showAll, setShowAll] = useState(false);
  
  if (!context?.user) return <Navigate to="/login" />;

  const { user, stamps, addToCart, cart } = context; 

  const earnedRewards = Math.floor(stamps / 6); 
  const currentProgress = stamps % 6;           
  const stampsRemaining = 6 - currentProgress;  

  const handleClaimReward = () => {
    // Sepetteki ödülleri kontrol et
    const rewardsAlreadyInCart = cart.filter(item => item.price === 0).length;

    if (earnedRewards > 0) {
      if (rewardsAlreadyInCart < earnedRewards) {
        addToCart({ 
          id: 9999,
          name: "Loyalty Reward Coffee", 
          price: 0, 
          category: "Reward",
          description: "Your 7th coffee for being a loyal customer!",
          image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800"
        });
        alert("Free reward coffee added! 🎁");
      } else {
        alert("You have already added your available rewards to the cart!");
      }
    }
  };

  const previousOrders = [
    { id: "#BB-1024", date: "May 10, 2026", items: "Latte, San Sebastian", total: "225 $", status: "Completed" },
    { id: "#BB-0985", date: "May 08, 2026", items: "Iced Americano", total: "75 $", status: "Completed" },
    { id: "#BB-0842", date: "May 05, 2026", items: "Caramel Macchiato, Brownie", total: "205 $", status: "Completed" },
    { id: "#BB-0712", date: "May 01, 2026", items: "Filter Coffee, Cheesecake", total: "155 $", status: "Completed" },
    { id: "#BB-0650", date: "April 28, 2026", items: "Mocha, Cookie", total: "130 $", status: "Completed" },
  ];

  const visibleOrders = showAll ? previousOrders : previousOrders.slice(0, 3);

  return (
    <div className="container mt-5 mb-5 text-dark">
      <div className="row justify-content-center">
        <div className="col-md-10 text-center">
          <h2 className="display-5 fw-bold text-brown mb-2">Hello, {user}! 👋</h2>
          <p className="lead text-muted mb-5 small">Track your rewards and check your order history.</p>

          <div className="card shadow-lg border-0 rounded-5 mb-4 position-relative overflow-hidden" 
               style={{ background: '#3e1b12', minHeight: '260px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="position-absolute end-0 top-50 translate-middle-y me-4 opacity-25 d-none d-md-block"><Award size={120} color="white" /></div>
            <div className="card-body p-0 d-flex flex-column align-items-center justify-content-center position-relative z-1">
              <h5 className="fw-bold mb-4 d-flex align-items-center text-warning"><Award size={20} className="me-2" /> Digital Loyalty Card</h5>
              <div className="d-flex justify-content-center gap-2 mb-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: '45px', height: '45px', backgroundColor: i < currentProgress ? '#ffc107' : 'rgba(255,255,255,0.1)', border: i < currentProgress ? 'none' : '1px dashed rgba(255,255,255,0.3)' }}>
                    <Coffee size={20} color={i < currentProgress ? '#3e1b12' : 'rgba(255,255,255,0.4)'} />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-100 py-3" style={{ background: 'rgba(0,0,0,0.2)' }}>
              <p className="mb-0 text-white small opacity-90">
                {earnedRewards > 0 ? (
                  <span className="text-warning fw-bold"><PartyPopper size={16} className="me-1"/> You have a free reward ready!</span>
                ) : (
                  <>Only <span className="text-warning fw-bold">{stampsRemaining}</span> more coffees left!</>
                )}
              </p>
            </div>
          </div>

          {earnedRewards > 0 && (
            <div className="card border-warning border-2 rounded-4 mb-5 p-3" style={{ background: '#fff9e6' }}>
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                <div className="d-flex align-items-center">
                  <div className="bg-warning p-2 rounded-circle me-3"><Gift className="text-dark" size={24} /></div>
                  <div className="text-start">
                    <h5 className="fw-bold mb-0">Available Rewards</h5>
                    <p className="text-muted small mb-0">You have <strong>{earnedRewards}</strong> free coffee(s) waiting!</p>
                  </div>
                </div>
                <button onClick={handleClaimReward} className="btn btn-warning fw-bold rounded-pill px-4 shadow-sm">Use Reward</button>
              </div>
            </div>
          )}

          <div className="text-start mt-5">
            <h4 className="fw-bold text-brown mb-4 d-flex align-items-center"><Clock className="me-2 text-warning" size={24} /> Recent Orders</h4>
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light text-muted small text-uppercase">
                  <tr><th className="ps-4 py-3">Order ID</th><th>Date</th><th>Items</th><th>Total</th><th className="text-center">Status</th></tr>
                </thead>
                <tbody>
                  {visibleOrders.map((order) => (
                    <tr key={order.id} className="small">
                      <td className="ps-4 fw-bold text-brown">{order.id}</td>
                      <td>{order.date}</td><td>{order.items}</td><td className="fw-bold">{order.total}</td>
                      <td className="text-center"><span className="badge bg-success-subtle text-success rounded-pill px-3 py-2"><CheckCircle size={12} className="me-1" /> {order.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center mt-4">
               <button onClick={() => setShowAll(!showAll)} className="btn btn-link text-brown fw-bold text-decoration-none small shadow-none">
                  {showAll ? "Show Less" : "View Full History"}
               </button>
            </div>
          </div>
          <div className="mt-5"><Link to="/menu" className="btn btn-warning btn-lg rounded-pill fw-bold px-5 shadow-sm text-dark">Order Coffee <ChevronRight size={18} /></Link></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;