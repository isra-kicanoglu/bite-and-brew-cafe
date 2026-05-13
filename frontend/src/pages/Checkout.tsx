import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, ArrowLeft, Trash2, PartyPopper, Coffee, Plus, Minus, Gift } from 'lucide-react';

const Checkout: React.FC = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ name: '', address: '', card: '', expiry: '', cvv: '' });
  const [errorMessage, setErrorMessage] = useState("");
  const [orderComplete, setOrderComplete] = useState(false);
  const [finalTotal, setFinalTotal] = useState(0);
  
  // Özet ekranda göstermek için yeni state'ler
  const [stampsEarnedThisOrder, setStampsEarnedThisOrder] = useState(0);
  const [rewardsUsedThisOrder, setRewardsUsedThisOrder] = useState(0);

  if (!context) return null;

  const cartTotal = context.cart.reduce((total, item) => total + item.price, 0);

  // Ürünleri gruplandırma (x2, x3 ve Gift x1 ayrımı için)
  const groupedCart = context.cart.reduce((acc: any[], item) => {
    const existing = acc.find(i => i.name === item.name);
    if (existing) {
      existing.quantity += 1;
      existing.totalPrice += item.price;
    } else {
      acc.push({ ...item, quantity: 1, totalPrice: item.price });
    }
    return acc;
  }, []);

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

    // --- MANTIK DÜZELTMESİ BURADA ---
    // 1. Sadece fiyatı 0'dan büyük olanlar yeni pul kazandırır
    const paidItems = context.cart.filter(item => item.price > 0).length;
    // 2. Sadece fiyatı 0 olanlar (Hediye) pul düşürür
    const freeItems = context.cart.filter(item => item.price === 0).length;
    
    setStampsEarnedThisOrder(paidItems);
    setRewardsUsedThisOrder(freeItems);

    // Yeni pul sayısı = Mevcut + (Kazanılanlar) - (Kullanılan Ödüller * 6)
    // Math.max ile puanın 0'ın altına düşmesini engelliyoruz
    const newStampTotal = Math.max(0, context.stamps + paidItems - (freeItems * 6));
    
    context.setStamps(newStampTotal);
    setFinalTotal(cartTotal); 
    setOrderComplete(true);   
    context.clearCart();      
  };

  if (orderComplete) {
    return (
      <div className="container mt-5 pt-5 text-center d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
        <div className="mb-4" style={{ animation: 'popIn 0.5s forwards' }}>
          <CheckCircle size={80} color="#10B981" />
        </div>
        <h2 className="fw-bold mb-3" style={{ color: '#1A1A1A' }}>Order Confirmed!</h2>
        
        <div className="card border-0 shadow-sm rounded-4 p-4 mb-4" style={{ maxWidth: '450px', backgroundColor: '#f8f9fa' }}>
            <p className="text-muted mb-3">Thank you, <strong>{formData.name}</strong>! Your coffee is being prepared.</p>
            
            <div className="d-flex flex-column gap-2">
                {/* Sadece kazanılan puan varsa göster */}
                {stampsEarnedThisOrder > 0 && (
                    <div className="d-flex align-items-center justify-content-center text-success small fw-bold bg-white p-2 rounded-3 shadow-sm">
                        <Coffee size={16} className="me-2" /> +{stampsEarnedThisOrder} New Stamps Earned
                    </div>
                )}
                {/* Sadece ödül kullanıldıysa göster */}
                {rewardsUsedThisOrder > 0 && (
                    <div className="d-flex align-items-center justify-content-center text-brown small fw-bold bg-warning bg-opacity-25 p-2 rounded-3 shadow-sm">
                        <Gift size={16} className="me-2" /> {rewardsUsedThisOrder} Reward Used (Points Deducted)
                    </div>
                )}
            </div>
        </div>

        <button onClick={() => navigate('/dashboard')} className="btn btn-dark rounded-pill px-5 py-3 fw-bold shadow-sm d-flex align-items-center">
            <PartyPopper size={20} className="me-2" /> Go to My Rewards
        </button>
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
            <div className="bg-white p-4 p-md-5 rounded-4 border-0 shadow-sm">
              <h4 className="fw-bold mb-4" style={{ color: '#1A1A1A' }}>Payment Details</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-4"><label className="form-label fw-bold small text-muted">FULL NAME</label><input type="text" className="form-control form-control-lg bg-light border-0" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required /></div>
                <div className="mb-4"><label className="form-label fw-bold small text-muted">DELIVERY ADDRESS</label><textarea className="form-control form-control-lg bg-light border-0" rows={3} value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} required></textarea></div>
                <div className="mb-4"><label className="form-label fw-bold small text-muted">CARD NUMBER</label><div className="input-group input-group-lg"><span className="input-group-text bg-light border-0"><CreditCard size={20} /></span><input type="text" className="form-control bg-light border-0" placeholder="0000 0000 0000 0000" value={formData.card} onChange={handleCardChange} required /></div></div>
                {errorMessage && <div className="alert alert-danger border-0 rounded-3 small py-2 mb-4">{errorMessage}</div>}
                <button type="submit" className="btn w-100 py-3 rounded-pill fw-bold text-white shadow-sm" style={{ backgroundColor: '#1A1A1A' }}>Pay ${cartTotal.toFixed(2)}</button>
              </form>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="bg-white p-4 p-md-5 rounded-4 border-0 sticky-top" style={{ top: '100px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">Order Summary</h4>
                <span className="badge bg-dark text-white rounded-pill px-3">{context.cart.length} Items</span>
              </div>
              
              <div className="mb-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {groupedCart.map((item, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
                    <div style={{ flex: 1 }}>
                      <h6 className="fw-bold mb-0">{item.name}</h6>
                      <small className="text-muted">${item.price.toFixed(2)}</small>
                    </div>

                    <div className="d-flex align-items-center gap-2 mx-3">
                      {item.price > 0 ? (
                        <>
                          <button onClick={() => context.removeFromCart(item.name)} className="btn btn-sm btn-outline-dark rounded-circle p-1"><Minus size={14} /></button>
                          <span className="fw-bold">{item.quantity}</span>
                          <button onClick={() => context.addToCart(item)} className="btn btn-sm btn-dark rounded-circle p-1"><Plus size={14} /></button>
                        </>
                      ) : (
                        <span className="badge bg-warning text-dark rounded-pill shadow-sm">Gift x{item.quantity}</span>
                      )}
                    </div>

                    <span className="fw-bold" style={{ minWidth: '70px', textAlign: 'right' }}>${item.totalPrice.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-between align-items-center pt-2 mb-4">
                <span className="text-muted fw-bold">Grand Total</span>
                <span className="fw-bold fs-4">${cartTotal.toFixed(2)}</span>
              </div>
              
              <button onClick={() => context.clearCart()} className="btn btn-outline-danger w-100 rounded-pill fw-bold border-0">
                <Trash2 size={18} className="me-2" /> Clear All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;