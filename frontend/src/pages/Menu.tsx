import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Product } from '../types';
import { Plus } from 'lucide-react';
import { menuDatabase } from '../data/database';
import { useNavigate } from 'react-router-dom';
import SmartBarista from '../components/SmartBarista';

const categories = ["Hot Drinks", "Cold Drinks", "Desserts", "Savory Bites"];

const Menu: React.FC = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [milkPreference, setMilkPreference] = useState("Regular Milk");
  const [activeCategory, setActiveCategory] = useState("Hot Drinks");

  if (!context) return null;

  const cartTotal = context.cart.reduce((total, item) => total + item.price, 0);

  const handleItemClick = (product: Product) => {
    if (product.hasMilkOption) {
      setSelectedProduct(product);
      setMilkPreference("Regular Milk");
    } else {
      addToCartAndStamp(product);
    }
  };

  // İŞTE YENİLENEN MATEMATİK ALGORİTMAMIZ
  const handleModalConfirm = () => {
    if (selectedProduct) {
      let additionalCost = 0;
      let cleanMilkName = milkPreference;

      // Seçilen süte göre fiyatı ve ismi ayarla
      if (milkPreference === "Oat Milk (+$0.75)") {
        additionalCost = 0.75;
        cleanMilkName = "Oat Milk";
      } else if (milkPreference === "Almond Milk (+$0.75)") {
        additionalCost = 0.75;
        cleanMilkName = "Almond Milk";
      }

      const customizedProduct = { 
        ...selectedProduct, 
        name: `${selectedProduct.name} (${cleanMilkName})`,
        price: selectedProduct.price + additionalCost // Ekstra ücreti buraya ekliyoruz!
      };
      
      addToCartAndStamp(customizedProduct);
      setSelectedProduct(null);
    }
  };

  const addToCartAndStamp = (product: Product) => {
    context.addToCart(product);
    if (product.category === "Hot Drinks" || product.category === "Cold Drinks") {
      context.addStamp(); 
    }
  };

  const scrollToCategory = (category: string) => {
    setActiveCategory(category);
    const element = document.getElementById(category);
    if (element) {
      const yOffset = -120; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ backgroundColor: '#FAFAFA', minHeight: '100vh', paddingBottom: '120px' }}>
      
      {/* Sticky Kategori Barı */}
      <div className="sticky-top bg-white border-bottom shadow-sm py-3" style={{ top: '56px', zIndex: 1020 }}>
        <div className="container">
          <div className="d-flex gap-3 overflow-auto" style={{ scrollbarWidth: 'none', whiteSpace: 'nowrap' }}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => scrollToCategory(category)}
                className="btn rounded-pill px-4 fw-bold"
                style={{
                  backgroundColor: activeCategory === category ? '#1A1A1A' : '#F3F4F6',
                  color: activeCategory === category ? '#FFFFFF' : '#4B5563',
                  border: 'none',
                  transition: 'all 0.2s'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mt-5">
        {categories.map((category) => (
          <div key={category} id={category} className="mb-5 pt-3">
            <h2 className="fw-bold mb-4" style={{ color: '#1A1A1A', borderBottom: '2px solid #E5E7EB', paddingBottom: '10px' }}>
              {category}
            </h2>
            
            <div className="row g-4">
              {menuDatabase.filter(item => item.category === category).map(product => (
                <div key={product.id} className="col-12 col-md-6 col-lg-4">
                  <div className="card h-100 border-0 bg-white rounded-4 overflow-hidden" 
                       style={{ 
                         boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                         transition: 'transform 0.2s'
                       }}
                       onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                       onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <div style={{ height: '240px', backgroundColor: '#F3F4F6' }}>
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-100 h-100 object-fit-cover"
                        onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=500&q=80"; }}
                      />
                    </div>
                    
                    <div className="card-body p-4 d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5 className="fw-bold mb-0 text-dark">{product.name}</h5>
                        <span className="fw-bold fs-5" style={{ color: '#1A1A1A' }}>${product.price.toFixed(2)}</span>
                      </div>
                      <p className="text-muted small mb-4">{product.description}</p>
                      
                      <button 
                        onClick={() => handleItemClick(product)} 
                        className="btn w-100 mt-auto rounded-pill fw-bold"
                        style={{ backgroundColor: '#1A1A1A', color: 'white' }}
                      >
                        <Plus size={18} className="me-1" /> Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Cart */}
      {context.cart.length > 0 && (
        <div className="fixed-bottom p-4 d-flex justify-content-center" style={{ zIndex: 1030, pointerEvents: 'none' }}>
          <button
            onClick={() => navigate('/checkout')}
            className="btn rounded-pill shadow-lg d-flex justify-content-between align-items-center px-4 py-3"
            style={{ 
              backgroundColor: '#1A1A1A', 
              color: 'white', 
              width: '100%', 
              maxWidth: '450px', 
              pointerEvents: 'auto', 
              transition: 'transform 0.2s',
              border: 'none'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div className="d-flex align-items-center">
              <div className="bg-white text-dark fw-bold rounded-circle d-flex justify-content-center align-items-center" style={{ width: '32px', height: '32px' }}>
                {context.cart.length}
              </div>
            </div>
            <span className="fw-bold fs-6">View Order</span>
            <span className="fw-bold fs-6">${cartTotal.toFixed(2)}</span>
          </button>
        </div>
      )}

      {/* Süt Seçimi Pop-up */}
      {selectedProduct && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header border-0 pb-0 pt-4 px-4">
                <h5 className="modal-title fw-bold">Customize {selectedProduct.name}</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedProduct(null)}></button>
              </div>
              <div className="modal-body px-4">
                <div className="d-grid gap-2">
                  {["Regular Milk", "Lactose-Free Milk", "Oat Milk (+$0.75)", "Almond Milk (+$0.75)"].map(milk => (
                    <button 
                      key={milk}
                      onClick={() => setMilkPreference(milk)}
                      className="btn text-start p-3 rounded-3 fw-bold"
                      style={{ 
                        backgroundColor: milkPreference === milk ? '#1A1A1A' : '#F3F4F6',
                        color: milkPreference === milk ? '#FFFFFF' : '#4B5563',
                        border: 'none'
                      }}
                    >
                      {milkPreference === milk && <span className="me-2">✓</span>}
                      {milk}
                    </button>
                  ))}
                </div>
              </div>
              <div className="modal-footer border-0 pt-2 pb-4 px-4">
                <button 
                  type="button" 
                  className="btn w-100 py-3 rounded-pill fw-bold text-white" 
                  style={{ backgroundColor: '#1A1A1A' }}
                  onClick={handleModalConfirm}
                >
                  Add to Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* YENİ EKLENEN AKILLI BARİSTA */}
      <SmartBarista onAddToCart={(product) => {
        // Eğer süt seçeneği varsa Modal açılsın, yoksa direkt eklensin
        if (product.hasMilkOption) {
          setSelectedProduct(product);
          setMilkPreference("Regular Milk");
        } else {
          addToCartAndStamp(product);
        }
      }} />

    
    </div>
    
  );
};

export default Menu;