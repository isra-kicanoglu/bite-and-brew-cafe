import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, ArrowLeft, Trash2, PartyPopper, Coffee } from 'lucide-react';

const Checkout: React.FC = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ name: '', address: '', card: '', expiry: '', cvv: '' });
  const [errorMessage, setErrorMessage] = useState("");
  const [orderComplete, setOrderComplete] = useState(false);
  const [finalTotal, setFinalTotal] = useState(0);
  const [earnedStamps, setEarnedStamps] = useState(0); 

  if (!context) return null;

  const cartTotal = context.cart.reduce((total, item) => total + item.price, 0);

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value.replace(/\D/g, '');
    if (rawValue.length > 16) rawValue = rawValue.slice(0, 16);
    const formattedValue = rawValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    setFormData({ ...formData, card: formattedValue });
    setErrorMessage(""); 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const rawCardNumber = formData.card.replace(/\s/g, '');
    if (rawCardNumber.length !== 16) {
      setErrorMessage("Please enter a valid 16-digit credit card number.");
      return;
    }

    if (!formData.name || !formData.address) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    // --- MANTIK GÜNCELLEMESİ ---
    // 1. Sadece ücretli kahvelerden pul kazan (Hediye kahve pul kazandırmaz)
    const paidItemsCount = context.cart.filter(item => item.price > 0).length;
    
    // 2. Eğer sepette hediye kahve varsa, pullardan 6 eksilt (Hediye kullanıldı)
    const freeItemsCount = context.cart.filter(item => item.price === 0).length;
    const stampAdjustment = paidItemsCount - (freeItemsCount * 6);

    setEarnedStamps(paidItemsCount);
    context.setStamps(context.stamps + stampAdjustment);

    setErrorMessage("");
    setFinalTotal(cartTotal); 
    setOrderComplete(true);   
    context.clearCart();      
  };

  if (orderComplete) {
    return (
      <div className="container mt-5 pt-5 text-center d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
        <div className="mb-4" style={{ animation: 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
          <CheckCircle size={80} color="#10B981" />
        </div>
        <h2 className="fw-bold mb-3" style={{ color: '#1A1A1A' }}>Payment Successful!</h2>
        <p className="text-muted mb-4 fs-5" style={{ maxWidth: '500px' }}>
          Thank you, <span className="fw-bold text-dark">{formData.name}</span>! Your order of <span className="fw-bold text-dark">${finalTotal.toFixed(2)}</span> has been received.
        </p>

        <div className="bg-warning bg-opacity-10 p-3 rounded-4 mb-4 border border-warning border-opacity-25 d-flex align-items-center">
            <Coffee className="text-warning me-2" size={24} />
            <span className="fw-bold text-dark">Order processed! Your loyalty rewards have been updated.</span>
        </div>

        <div className="d-flex gap-3">
            <button onClick={() => navigate('/dashboard')} className="btn rounded-pill px-4 py-3 fw-bold shadow-sm" style={{ backgroundColor: '#ffc107', color: '#3e1b12' }}>
                View My Rewards
            </button>
            <button onClick={() => navigate('/menu')} className="btn rounded-pill px-4 py-3 fw-bold shadow-sm" style={{ backgroundColor: '#1A1A1A', color: 'white' }}>
                <PartyPopper size={20} className="me-2" /> Continue Shopping
            </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#FAFAFA', minHeight: '100vh', paddingBottom: '80px' }}>
      <div className="bg-white border-bottom py-4 mb-5 shadow-sm">
        <div className="container d-flex align-items-center">
          <button onClick={() => navigate('/menu')} className="btn btn-link text-dark text-decoration-none p-0 d-flex align-items-center fw-bold"><ArrowLeft size={20} className="me-2" /> Back</button>
          <h4 className="fw-bold mb-0 mx-auto" style={{ color: '#1A1A1A', transform: 'translateX(-20px)' }}>Checkout</h4>
        </div>
      </div>

      <div className="container">
        <div className="row g-5">
          <div className="col-lg-7">
            <div className="bg-white p-4 p-md-5 rounded-4 border-0" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <h4 className="fw-bold mb-4" style={{ color: '#1A1A1A' }}>Payment Details</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-4"><label className="form-label fw-bold small text-muted">FULL NAME</label><input type="text" className="form-control form-control-lg bg-light border-0" placeholder="John Doe" value={formData.name} onChange={(e) => { setFormData({...formData, name: e.target.value}); setErrorMessage(""); }} required /></div>
                <div className="mb-4"><label className="form-label fw-bold small text-muted">DELIVERY ADDRESS</label><textarea className="form-control form-control-lg bg-light border-0" rows={3} placeholder="Full address..." value={formData.address} onChange={(e) => { setFormData({...formData, address: e.target.value}); setErrorMessage(""); }} required></textarea></div>
                <div className="mb-4"><label className="form-label fw-bold small text-muted">CARD NUMBER</label><div className="input-group input-group-lg"><span className="input-group-text bg-light border-0 text-muted"><CreditCard size={20} /></span><input type="text" className="form-control bg-light border-0" placeholder="0000 0000 0000 0000" value={formData.card} onChange={handleCardChange} required /></div></div>
                {errorMessage && <div className="alert alert-danger border-0 rounded-3 small py-2 mb-4">{errorMessage}</div>}
                <button type="submit" className="btn w-100 py-3 rounded-pill fw-bold text-white shadow-sm" style={{ backgroundColor: '#1A1A1A', fontSize: '1.1rem' }}><CheckCircle size={20} className="me-2" /> Pay ${cartTotal.toFixed(2)}</button>
              </form>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="bg-white p-4 p-md-5 rounded-4 border-0 sticky-top" style={{ top: '100px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <h4 className="fw-bold mb-4">Order Summary</h4>
              <div className="mb-4" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {context.cart.map((item, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
                    <div><h6 className="fw-bold mb-1">{item.name}</h6><small className="text-muted">{item.category}</small></div>
                    <span className="fw-bold">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-between align-items-center pt-2 mb-4"><span className="text-muted fw-bold">Subtotal</span><span className="fw-bold fs-5">${cartTotal.toFixed(2)}</span></div>
              <button onClick={() => context.clearCart()} className="btn btn-outline-danger w-100 rounded-pill fw-bold"><Trash2 size={18} className="me-2" /> Clear Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;