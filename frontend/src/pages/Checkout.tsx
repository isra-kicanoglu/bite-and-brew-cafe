import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, ArrowLeft, Trash2, PartyPopper } from 'lucide-react';

const Checkout: React.FC = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ name: '', address: '', card: '', expiry: '', cvv: '' });
  
  // Yeni: Hata mesajı ve Başarı durumu için State'ler
  const [errorMessage, setErrorMessage] = useState("");
  const [orderComplete, setOrderComplete] = useState(false);
  const [finalTotal, setFinalTotal] = useState(0);

  if (!context) return null;

  const cartTotal = context.cart.reduce((total, item) => total + item.price, 0);

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value.replace(/\D/g, '');
    if (rawValue.length > 16) {
      rawValue = rawValue.slice(0, 16);
    }
    const formattedValue = rawValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    setFormData({ ...formData, card: formattedValue });
    setErrorMessage(""); // Kullanıcı yazmaya başlayınca hatayı temizle
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Çirkin alert'ler yerine kendi şık hata mesajımızı kullanıyoruz
    const rawCardNumber = formData.card.replace(/\s/g, '');
    if (rawCardNumber.length !== 16) {
      setErrorMessage("Please enter a valid 16-digit credit card number.");
      return;
    }

    if (!formData.name || !formData.address) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    // Başarılı ödeme senaryosu!
    setErrorMessage("");
    setFinalTotal(cartTotal); // Sepet sıfırlanmadan önce son fiyatı hafızaya al
    setOrderComplete(true);   // Şık başarı ekranını tetikle
    context.clearCart();      // Arka planda sepeti temizle
  };

  // YENİ: Şık Başarı Ekranı (Alert kutusu yerine bu gelecek)
  if (orderComplete) {
    return (
      <div className="container mt-5 pt-5 text-center d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
        <div className="mb-4" style={{ animation: 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
          <CheckCircle size={80} color="#10B981" />
        </div>
        <h2 className="fw-bold mb-3" style={{ color: '#1A1A1A' }}>Payment Successful!</h2>
        <p className="text-muted mb-4 fs-5" style={{ maxWidth: '500px' }}>
          Thank you, <span className="fw-bold text-dark">{formData.name}</span>! Your order of <span className="fw-bold text-dark">${finalTotal.toFixed(2)}</span> has been received and is currently being prepared by our baristas.
        </p>
        <button onClick={() => navigate('/menu')} className="btn rounded-pill px-5 py-3 fw-bold mt-2 shadow-sm d-flex align-items-center" style={{ backgroundColor: '#1A1A1A', color: 'white' }}>
          <PartyPopper size={20} className="me-2" /> Continue Shopping
        </button>

        {/* Küçük bir pop-in animasyonu */}
        <style>
          {`
            @keyframes popIn {
              0% { transform: scale(0.5); opacity: 0; }
              100% { transform: scale(1); opacity: 1; }
            }
          `}
        </style>
      </div>
    );
  }

  // Sepet boşsa gösterilecek ekran
  if (context.cart.length === 0) {
    return (
      <div className="container mt-5 pt-5 text-center" style={{ minHeight: '80vh' }}>
        <h3 className="fw-bold mb-3" style={{ color: '#1A1A1A' }}>Your cart is empty</h3>
        <p className="text-muted mb-4">Looks like you haven't added any items yet.</p>
        <button onClick={() => navigate('/menu')} className="btn rounded-pill px-4 py-2 fw-bold" style={{ backgroundColor: '#1A1A1A', color: 'white' }}>
          <ArrowLeft size={18} className="me-2" /> Back to Menu
        </button>
      </div>
    );
  }

  // Normal Ödeme Ekranı
  return (
    <div style={{ backgroundColor: '#FAFAFA', minHeight: '100vh', paddingBottom: '80px' }}>
      
      <div className="bg-white border-bottom py-4 mb-5">
        <div className="container d-flex align-items-center">
          <button onClick={() => navigate('/menu')} className="btn btn-link text-dark text-decoration-none p-0 d-flex align-items-center fw-bold">
            <ArrowLeft size={20} className="me-2" /> Back
          </button>
          <h4 className="fw-bold mb-0 mx-auto" style={{ color: '#1A1A1A', transform: 'translateX(-20px)' }}>Checkout</h4>
        </div>
      </div>

      <div className="container">
        <div className="row g-5">
          
          <div className="col-lg-7">
            <div className="bg-white p-4 p-md-5 rounded-4 border-0" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <h4 className="fw-bold mb-4" style={{ color: '#1A1A1A' }}>Payment Details</h4>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-bold small text-muted">FULL NAME</label>
                  <input 
                    type="text" 
                    className="form-control form-control-lg bg-light border-0" 
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => { setFormData({...formData, name: e.target.value}); setErrorMessage(""); }}
                  />
                </div>
                
                <div className="mb-4">
                  <label className="form-label fw-bold small text-muted">DELIVERY ADDRESS</label>
                  <textarea 
                    className="form-control form-control-lg bg-light border-0" 
                    rows={3}
                    placeholder="Enter your full delivery address..."
                    value={formData.address}
                    onChange={(e) => { setFormData({...formData, address: e.target.value}); setErrorMessage(""); }}
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold small text-muted">CARD NUMBER</label>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text bg-light border-0 text-muted"><CreditCard size={20} /></span>
                    <input 
                      type="text" 
                      className="form-control bg-light border-0" 
                      placeholder="0000 0000 0000 0000"
                      value={formData.card}
                      onChange={handleCardChange}
                    />
                  </div>
                </div>

                {errorMessage && (
                  <div className="alert alert-danger border-0 rounded-3 small py-2 mb-4" role="alert">
                    {errorMessage}
                  </div>
                )}

                <button type="submit" className="btn w-100 py-3 rounded-pill fw-bold text-white d-flex justify-content-center align-items-center shadow-sm" style={{ backgroundColor: '#1A1A1A', fontSize: '1.1rem' }}>
                  <CheckCircle size={20} className="me-2" /> Pay ${cartTotal.toFixed(2)}
                </button>
              </form>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="bg-white p-4 p-md-5 rounded-4 border-0 sticky-top" style={{ top: '100px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0" style={{ color: '#1A1A1A' }}>Order Summary</h4>
                <span className="badge bg-light text-dark border px-3 py-2 rounded-pill">{context.cart.length} Items</span>
              </div>
              
              <div className="mb-4" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {context.cart.map((item, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
                    <div>
                      <h6 className="fw-bold mb-1 text-dark">{item.name}</h6>
                      <small className="text-muted">{item.category}</small>
                    </div>
                    <span className="fw-bold" style={{ color: '#1A1A1A' }}>${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-between align-items-center pt-2 mb-4">
                <span className="text-muted fw-bold">Subtotal</span>
                <span className="fw-bold fs-5" style={{ color: '#1A1A1A' }}>${cartTotal.toFixed(2)}</span>
              </div>
              
              <button onClick={() => context.clearCart()} className="btn btn-outline-danger w-100 rounded-pill fw-bold d-flex justify-content-center align-items-center">
                <Trash2 size={18} className="me-2" /> Clear Cart
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;