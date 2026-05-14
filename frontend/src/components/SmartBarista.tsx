import React, { useState, useRef, useEffect } from 'react';
import { menuDatabase } from '../data/database';
import { Product } from '../types';
import { Bot, X, Send, Plus } from 'lucide-react';

interface SmartBaristaProps {
  onAddToCart: (product: Product) => void;
}

interface Message {
  id: number;
  sender: 'user' | 'bot';
  text: string;
  product?: Product; 
}

const SmartBarista: React.FC<SmartBaristaProps> = ({ onAddToCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'bot', text: "Hello! I'm your AI Barista. I can help you choose the perfect coffee or describe our flavors. What are you in the mood for today?" }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // --- IMPROVED ENGLISH AI SIMULATION ---
  const generateBotResponse = async (userInput: string) => {
    const query = userInput.toLowerCase();
    
    // Simulating thinking time
    setTimeout(() => {
      let responseText = "";
      let recommendedProduct: Product | undefined;

      // SCENARIO 1: Comparison - Latte vs Flat White
      if (query.includes("difference") && query.includes("latte") && query.includes("flat white")) {
        responseText = "Great question! A Latte is creamier with more steamed milk, while a Flat White has a stronger espresso taste with a velvety micro-foam texture. If you like coffee-forward drinks, go for the Flat White! [ID:2]";
      }
      // SCENARIO 2: Feeling Tired / Energy
      else if (query.includes("tired") || query.includes("wake up") || query.includes("energy") || query.includes("strong")) {
        responseText = "Sounds like you need a boost! Our Cold Brew is steeped for 18 hours for maximum caffeine, or you could try a double shot of Espresso. [ID:12]";
      }
      // SCENARIO 3: Sweet Tooth
      else if (query.includes("sweet") || query.includes("sugar") || query.includes("caramel") || query.includes("chocolate")) {
        responseText = "If you're craving something sweet, you'll love our Caramel Macchiato or the White Chocolate Mocha. They are legendary! [ID:6]";
      }
      // SCENARIO 4: Healthy / Matcha
      else if (query.includes("healthy") || query.includes("matcha") || query.includes("diet")) {
        responseText = "For a healthy and vibrant choice, I highly recommend our Iced Matcha Latte. It's full of antioxidants and tastes amazing! [ID:16]";
      }
      // SCENARIO 5: Hunger / Food
      else if (query.includes("hungry") || query.includes("food") || query.includes("eat") || query.includes("sandwich")) {
        responseText = "We have great savory bites! Our Grilled Club Sandwich is very satisfying, or you could try the Avocado Toast. [ID:30]";
      }
      // SCENARIO 6: Dessert recommendation
      else if (query.includes("dessert") || query.includes("cake") || query.includes("treat")) {
        responseText = "You must try our San Sebastian Cheesecake! It's our best-selling dessert with a perfect burnt top and creamy center. [ID:21]";
      }
      // FALLBACK
      else {
        responseText = "That sounds interesting! To give you the best recommendation, tell me: Do you prefer your drink hot or iced? And do you like it milky or strong?";
      }

      // Regex to find ID and match with database
      const idMatch = responseText.match(/\[ID:(\d+)\]/);
      if (idMatch) {
        const productId = parseInt(idMatch[1]);
        recommendedProduct = menuDatabase.find(p => p.id === productId);
        responseText = responseText.replace(/\[ID:\d+\]/, '').trim();
      }

      setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: responseText, product: recommendedProduct }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMsg: Message = { id: Date.now(), sender: 'user', text: inputValue };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);
    generateBotResponse(inputValue);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="btn rounded-circle shadow-lg d-flex justify-content-center align-items-center"
        style={{ position: 'fixed', bottom: '30px', right: '30px', width: '65px', height: '65px', backgroundColor: '#3e1b12', color: 'white', zIndex: 1040, transition: 'transform 0.3s' }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
      >
        <Bot size={30} />
      </button>

      {isOpen && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(3px)', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '400px' }}>
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden" style={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
              
              <div className="bg-dark text-white p-3 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div className="position-relative me-3">
                    <div className="bg-warning text-dark rounded-circle p-2"><Bot size={20} /></div>
                    <span className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle" style={{ width: '10px', height: '10px' }}></span>
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold">AI Barista</h6>
                    <small className="text-white-50" style={{ fontSize: '0.75rem' }}>Online • Virtual Assistant</small>
                  </div>
                </div>
                <button className="btn text-white p-0 shadow-none" onClick={() => setIsOpen(false)}><X size={22} /></button>
              </div>

              <div className="flex-grow-1 p-3" style={{ overflowY: 'auto', backgroundColor: '#F9FAFB' }}>
                {messages.map((msg) => (
                  <div key={msg.id} className={`d-flex flex-column mb-3 ${msg.sender === 'user' ? 'align-items-end' : 'align-items-start'}`}>
                    <div className={`p-3 rounded-4 shadow-sm ${msg.sender === 'user' ? 'bg-dark text-white' : 'bg-white text-dark border'}`}
                      style={{ 
                        maxWidth: '85%', 
                        borderBottomRightRadius: msg.sender === 'user' ? '4px' : '1rem',
                        borderBottomLeftRadius: msg.sender === 'bot' ? '4px' : '1rem',
                        fontSize: '0.9rem'
                      }}
                    >
                      <p className="mb-0">{msg.text}</p>
                    </div>

                    {msg.product && (
                      <div className="mt-2 bg-white rounded-4 shadow-sm border p-2 d-flex align-items-center" style={{ width: '260px', animation: 'popIn 0.3s ease-out' }}>
                        <img src={msg.product.imageUrl } alt={msg.product.name} className="rounded-3 object-fit-cover" style={{ width: '50px', height: '50px' }} />
                        <div className="ms-2 flex-grow-1">
                          <h6 className="mb-0 fw-bold" style={{ fontSize: '0.8rem' }}>{msg.product.name}</h6>
                          <small className="text-success fw-bold">${msg.product.price.toFixed(2)}</small>
                        </div>
                        <button onClick={() => { onAddToCart(msg.product!); setIsOpen(false); }} className="btn btn-warning rounded-circle p-1 d-flex justify-content-center align-items-center shadow-sm">
                          <Plus size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="d-flex align-items-start mb-3">
                    <div className="bg-white p-3 rounded-4 border shadow-sm d-flex align-items-center gap-1">
                      <span className="spinner-grow spinner-grow-sm text-warning" style={{ width: '6px', height: '6px' }}></span>
                      <span className="spinner-grow spinner-grow-sm text-warning" style={{ width: '6px', height: '6px', animationDelay: '0.2s' }}></span>
                      <span className="spinner-grow spinner-grow-sm text-warning" style={{ width: '6px', height: '6px', animationDelay: '0.4s' }}></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-3 bg-white border-top">
                <form onSubmit={handleSendMessage} className="d-flex align-items-center bg-light rounded-pill px-3 py-1 border shadow-sm">
                  <input type="text" className="form-control border-0 bg-transparent shadow-none" placeholder="Ask me something..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                  <button type="submit" className="btn border-0 text-warning p-2" disabled={!inputValue.trim()}><Send size={20} /></button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SmartBarista;