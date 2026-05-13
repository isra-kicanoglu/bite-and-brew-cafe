import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './Home.css'; 

import { Search, UserCircle, ShoppingBag, Clock, Gift, Globe, Camera, MessageCircle, ChevronRight, Coffee, Star, Sparkles, Send, Quote, CheckCircle } from 'lucide-react';

const Home: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false); // Renk değişimi için state

  const sliderImages = [
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800", 
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800", 
    "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800"  
  ];

  const cakeImages = {
    raspberry: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400",
    chocolate: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400",
    caramel:   "https://images.unsplash.com/photo-1586985289906-406988974504?auto=format&fit=crop&w=400"
  };

  const favoriteItems = [
    { id: 1, name: "Caramel Macchiato", desc: "Perfect harmony of caramel and vanilla syrups.", price: "95 TL", img: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=400" },
    { id: 2, name: "Iced White Mocha", desc: "Signature espresso with white chocolate sauce.", price: "105 TL", img: "https://images.pexels.com/photos/4226806/pexels-photo-4226806.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 3, name: "San Sebastian", desc: "Creamy Spanish cheesecake with a burnt top.", price: "140 TL", img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=400" }
  ];

  const testimonials = [
    { id: 1, name: "Jessica Lane", text: "The loyalty program is a game changer. My 7th cup was totally free!", rating: 5 },
    { id: 2, name: "David Chen", text: "Best Iced White Mocha in town. Highly recommended!", rating: 5 },
    { id: 3, name: "Mark Peterson", text: "Professional service and a great atmosphere for work.", rating: 4 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % sliderImages.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  // Butona tıklandığında çalışan fonksiyon
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true); // Rengi yeşile çevirir
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 3000); // 3 saniye sonra sarıya döner
  };

  return (
    <div className="home-container bg-creme">
      {/* 1. Navigation */}
      <nav className="navbar navbar-expand-lg navbar-creme py-3 shadow-sm sticky-top">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center fw-bold fs-3 text-brown" to="/">
            Bite & Brew
          </Link>
          <div className="navbar-nav ms-auto align-items-center flex-row gap-3">
            <Link className="nav-link text-brown" to="/"><Search size={20} /></Link>
            <Link className="nav-link text-brown" to="/login"><UserCircle size={20} /></Link>
            <Link className="btn btn-brown d-flex align-items-center rounded-pill px-3" to="/checkout">
              <ShoppingBag size={18} className="me-2" />
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="hero-section py-5 bg-creme">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-md-6 text-start position-relative">
              <div className="brush-stroke-hero top-0 start-0 opacity-10 position-absolute"></div>
              <h1 className="display-3 fw-bold text-brown mb-3 position-relative z-1">Sweet Moments<br />Start Here.</h1>
              <p className="lead text-brown mb-4 w-75 position-relative z-1">Freshly roasted coffee and delightful desserts to make every moment special. Join our loyalty program and get every 7th cup for free!</p>
              <Link to="/menu" className="btn btn-brown btn-lg fw-bold px-5 rounded-pill shadow position-relative z-1 bounce-on-hover">
                Explore Menu
              </Link>
            </div>
            <div className="col-md-6 text-center hero-coffee-img position-relative" style={{ height: '400px' }}>
                <div className="brush-stroke-hero-right top-0 start-0 opacity-10 position-absolute"></div>
                <img key={currentImage} src={sliderImages[currentImage]} alt="Cafe Atmosphere" className="img-fluid rounded-circle shadow-lg hero-img position-relative z-1 hero-img-transition" style={{ objectFit: 'cover', width: '350px', height: '350px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Info Blocks & Campaign */}
      <section className="py-5 bg-creme border-bottom">
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className="col-md-5 d-flex align-items-center p-4 rounded-4 bg-creme-dark shadow-sm border border-light">
              <div className="icon-block bg-creme rounded-circle p-3 shadow-sm me-4">
                 <Clock size={32} className="text-brown" />
              </div>
              <div>
                <h4 className="fw-bold text-brown mb-1">Opening Hours</h4>
                <p className="text-muted mb-0">Everyday <br /> 08:00 AM - 10:00 PM</p>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center p-4 rounded-4 highlight-campaign shadow-lg ms-md-4">
               <div className="icon-block bg-warning rounded-circle p-3 shadow-sm me-4">
                 <Gift size={32} className="text-brown" />
               </div>
              <div>
                <h4 className="fw-bold mb-1 text-white">Special Offer!</h4>
                <p className="mb-0 fw-medium text-white">Buy 6 coffees, get 1 completely <span className="text-warning fw-bold fs-5">FREE!</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Favorites of the Month */}
      <section className="py-5 bg-creme-dark">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold text-brown d-inline-flex align-items-center">
              <Sparkles className="me-2 text-warning" size={36} />
              Favorites of the Month
              <Sparkles className="ms-2 text-warning" size={36} />
            </h2>
            <p className="text-muted el-yazisi fs-5 mt-2">The legendary flavors most loved by our community!</p>
          </div>
          <div className="row justify-content-center g-4">
            {favoriteItems.map(item => (
              <div key={item.id} className="col-md-4">
                <div className="card h-100 border-0 shadow-lg rounded-5 position-relative overflow-hidden favorite-card-hover">
                  <div className="position-absolute top-0 end-0 bg-warning text-brown px-3 py-2 rounded-bottom-start fw-bold shadow-sm d-flex align-items-center z-1" style={{ borderBottomLeftRadius: '15px' }}>
                    <Star size={18} className="me-1" fill="currentColor" /> Top Choice
                  </div>
                  <img src={item.img} alt={item.name} className="img-fluid w-100" style={{ height: '240px', objectFit: 'cover' }} />
                  <div className="card-body p-4 bg-white d-flex flex-column text-center">
                    <h4 className="fw-bold text-brown mb-2">{item.name}</h4>
                    <p className="text-muted small mb-4">{item.desc}</p>
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <span className="fs-4 fw-bold text-brown">{item.price}</span>
                      <Link to="/menu" className="btn btn-brown rounded-pill px-4 fw-semibold bounce-on-hover">
                        Order Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Signature Desserts Section */}
      <section className="py-5 bg-creme cake-cards-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold text-brown">Our Signature Desserts</h2>
          </div>
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-lg rounded-5 bg-cake-pink p-4 flex-column">
                <h3 className="fw-bold text-brown mb-4">Berry Dream</h3>
                <img src={cakeImages.raspberry} alt="Berry Dream Cake" className="img-fluid rounded-4 mb-4 mx-auto cake-card-img" style={{objectFit: 'cover'}}/>
                <div className="mt-auto d-flex flex-column align-items-center w-100">
                    <p className="text-brown fw-semibold el-yazisi mb-2">Forest Fruits & Cream</p>
                    <Link to="/menu" className="btn btn-brown-light w-100 rounded-pill fw-semibold btn-sm mt-2 bounce-on-hover">Order Now</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-lg rounded-5 bg-cake-orange p-4 flex-column">
                <h3 className="fw-bold text-brown mb-4">Choco Passion</h3>
                <img src={cakeImages.chocolate} alt="Chocolate Passion Cake" className="img-fluid rounded-4 mb-4 mx-auto cake-card-img" style={{objectFit: 'cover'}}/>
                 <div className="mt-auto d-flex flex-column align-items-center w-100">
                    <p className="text-brown fw-semibold el-yazisi mb-2">Double Dark Chocolate</p>
                    <Link to="/menu" className="btn btn-brown w-100 rounded-pill fw-semibold btn-sm mt-2 bounce-on-hover">Order Now</Link>
                 </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-lg rounded-5 bg-cake-purple p-4 flex-column">
                <h3 className="fw-bold text-brown mb-4">Caramel Mocha</h3>
                <img src={cakeImages.caramel} alt="Caramel Mocha Cake" className="img-fluid rounded-4 mb-4 mx-auto cake-card-img" style={{objectFit: 'cover'}}/>
                <div className="mt-auto d-flex flex-column align-items-center w-100">
                    <p className="text-brown fw-semibold el-yazisi mb-2">Caramel & Coffee Blend</p>
                    <Link to="/menu" className="btn btn-brown-light w-100 rounded-pill fw-semibold btn-sm mt-2 bounce-on-hover">Order Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="py-5 bg-white border-top">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold text-brown">Trusted by Coffee Lovers</h2>
          </div>
          <div className="row g-4">
            {testimonials.map(t => (
              <div key={t.id} className="col-md-4">
                <div className="card border-0 shadow-sm p-4 rounded-4 h-100 testimonial-card">
                  <Quote className="text-warning mb-3 opacity-50" size={32} />
                  <p className="el-yazisi mb-3 fs-5 italic">"{t.text}"</p>
                  <div className="mt-auto d-flex align-items-center">
                    <div className="bg-brown text-white rounded-circle p-2 me-3 fw-bold shadow-sm" style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>{t.name.charAt(0)}</div>
                    <div>
                      <h6 className="fw-bold mb-0">{t.name}</h6>
                      <div className="text-warning">
                        {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Loyalty Program Section (3x2 GRID) */}
      <section className="sadakat-section py-5 bg-creme-dark border-top border-bottom">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-md-6 text-center position-relative">
                <div className="brush-stroke-latte-art top-0 start-0 opacity-10 position-absolute"></div>
                <div className="loyalty-card-visual p-4 rounded-5 shadow-lg position-relative z-1 mx-auto bg-creme" style={{ maxWidth: '400px' }}>
                  <div className="loyalty-card-inner p-4 rounded-4 d-flex flex-column align-items-center">
                    <h4 className="fw-bold text-brown mb-4 el-yazisi">Bite & Brew Rewards</h4>
                    <div className="container-fluid mb-4">
                      <div className="row g-3 justify-content-center">
                        {[...Array(6)].map((_, index) => (
                          <div key={index} className="col-4 d-flex justify-content-center">
                             <div className="stamp-box bg-brown text-creme rounded-circle shadow-sm pop-in-animation" style={{ animationDelay: `${index * 0.15}s` }}>
                                <Coffee size={28} />
                             </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="w-100 pt-3 border-top border-brown-dashed d-flex flex-column align-items-center mt-2">
                      <span className="small text-brown-light fw-bold mb-3 text-uppercase tracking-wider">7th Coffee is on Us!</span>
                      <div className="stamp-box bg-warning text-brown rounded-circle shadow border border-3 border-white pulse-gift" style={{width:'80px', height:'80px'}}>
                        <Gift size={36} />
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div className="col-md-6 text-start">
              <h2 className="fw-bold text-brown mb-3">Loyalty Has Its Perks.</h2>
              <p className="lead text-brown mb-4 position-relative z-1">Start earning with every sip! Fill up your digital loyalty card, and get your 7th coffee completely on us. Sign up today to start collecting stamps.</p>
              <div className="text-start position-relative z-1">
                <Link to="/login" className="btn btn-brown-light btn-lg fw-bold px-5 rounded-pill shadow d-inline-flex align-items-center bounce-on-hover">
                    Join the Club
                    <ChevronRight size={20} className="ms-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Newsletter Section (DÜZELTİLEN KISIM) */}
      <section className="py-5 bg-dark text-white text-center newsletter-section">
        <div className="container py-5">
          <h2 className="fw-bold display-5 mb-3">Keep In Touch</h2>
          <p className="mb-4 opacity-75 fs-5">Subscribe for exclusive weekly rewards and 10% off your next order.</p>
          <form 
            onSubmit={handleSubscribe} 
            className="d-flex justify-content-center gap-0 mx-auto newsletter-form flex-nowrap"
            style={{ maxWidth: '550px' }}
          >
            <input 
              type="email" 
              className="form-control form-control-lg border-0 shadow-none newsletter-input" 
              placeholder="Your Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <button 
              type="submit" 
              className={`btn ${isSubscribed ? 'btn-success' : 'btn-warning'} btn-lg fw-bold shadow newsletter-btn transition-all`}
            >
               {isSubscribed ? (
                 <><CheckCircle size={18} className="me-2 d-none d-sm-inline"/> Joined!</>
               ) : (
                 <><Send size={18} className="me-2 d-none d-sm-inline"/> Join Now</>
               )}
            </button>
          </form>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="footer py-5 bg-dark text-white position-relative overflow-hidden">
        <div className="container position-relative z-1">
          <div className="row align-items-center justify-content-between g-4">
             <div className="col-md-6 text-start">
                 <h4 className="fw-bold mb-3 text-warning">Bite & Brew</h4>
                 <p className="small opacity-75 el-yazisi">Freshness in every bite, perfection in every brew.</p>
             </div>
             <div className="col-md-6 d-flex justify-content-end gap-3">
                 <a href="#" className="text-warning"><Globe size={24} /></a>
                 <a href="#" className="text-warning"><Camera size={24} /></a>
                 <a href="#" className="text-warning"><MessageCircle size={24} /></a>
             </div>
          </div>
          <hr className="my-4 opacity-25" />
          <p className="text-center small opacity-50 mb-0">© 2026 Bite & Brew Cafe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;