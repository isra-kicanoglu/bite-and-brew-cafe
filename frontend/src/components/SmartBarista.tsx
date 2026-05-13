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
    { id: 1, sender: 'bot', text: 'Hi! I am your AI Barista. You can ask me anything about our coffees. For example: "What is the difference between Latte and Flat White?"' }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // --- GERÇEK YAPAY ZEKA (LLM & RAG) MİMARİSİ ---
  const generateBotResponse = async (userInput: string) => {
    
    // 1. RAG (Retrieval-Augmented Generation) Bağlamı
    // Veritabanımızı AI'a öğretiyoruz ve ona bir rol veriyoruz.
    const systemContext = `Sen Bite & Brew Cafe'nin kibar ve profesyonel yapay zeka baristasısın. 
    İşte kafemizin güncel menüsü ve veritabanı: ${JSON.stringify(menuDatabase)}
    Müşteri sana kahvelerle ilgili sorular soracak. Cevaplarını kısa, samimi ve sadece menüdeki içeriklere sadık kalarak ver.
    Eğer müşteriye menüden spesifik bir kahve önerirsen, mesajının EN SONUNA o kahvenin ID'sini tam olarak [ID:X] formatında gizlice ekle. Örnek: "Size Classic Latte öneririm. [ID:1]"`;

    try {
      /*
        TODO: GERÇEK API ENTEGRASYONU BURAYA GELECEK
        Bir OpenAI veya Google Gemini API Key aldığında, aşağıdaki yorum satırlarını kaldırıp bağlayabiliriz.
      */
      
      /*
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer SENIN_API_ANAHTARIN_BURAYA_GELECEK`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: systemContext },
            { role: "user", content: userInput }
          ]
        })
      });

      const data = await response.json();
      const aiResponseText = data.choices[0].message.content;
      */

      // API Key girene kadar sistemin çökmeksizin sana API simülasyonu yapması için geçici yanıt:
      let aiResponseText = "Harika bir soru! Latte daha bol sütlü ve yumuşak içimlidir. Flat White ise daha az süt içerir ve kahve tadı (espresso) çok daha yoğundur. Eğer kahvenin gerçek tadını almak istiyorsan sana kesinlikle Flat White öneririm! [ID:2]";

      // Eğer kullanıcı başka bir şey sorarsa dinamik tepki simülasyonu
      if(userInput.toLowerCase().includes("uyku") || userInput.toLowerCase().includes("soğuk")) {
        aiResponseText = "Madem uykunu açmak ve ferahlamak istiyorsun, 18 saat demlenmiş ve kafein oranı çok yüksek olan Cold Brew tam sana göre! [ID:12]";
      }

      // 2. AI'ın Cevabından [ID:X] Etiketini Ayıklama (Regex)
      const idMatch = aiResponseText.match(/\[ID:(\d+)\]/);
      let recommendedProduct: Product | undefined;
      let cleanResponse = aiResponseText;

      // Eğer AI bir kahve önerdiyse ve sonuna ID koyduysa:
      if (idMatch) {
        const productId = parseInt(idMatch[1]);
        recommendedProduct = menuDatabase.find(p => p.id === productId);
        // Kullanıcı ekranda [ID:2] yazısını görmesin diye metinden temizliyoruz
        cleanResponse = aiResponseText.replace(/\[ID:\d+\]/, '').trim();
      }

      setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: cleanResponse, product: recommendedProduct }]);

    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: "Connection error. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMsg: Message = { id: Date.now(), sender: 'user', text: inputValue };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    
    setIsTyping(true);
    // Gerçek API gibi davranması için 1.5 saniye bekleme süresi ekliyoruz
    setTimeout(() => generateBotResponse(inputValue), 1500);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="btn rounded-circle shadow-lg d-flex justify-content-center align-items-center"
        style={{ position: 'fixed', bottom: '30px', right: '30px', width: '65px', height: '65px', backgroundColor: '#1A1A1A', color: 'white', zIndex: 1040, transition: 'transform 0.3s' }}
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
                    <div className="bg-white text-dark rounded-circle p-2">
                      <Bot size={20} />
                    </div>
                    <span className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle" style={{ width: '10px', height: '10px' }}></span>
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold">AI Barista</h6>
                    <small className="text-light opacity-75" style={{ fontSize: '0.75rem' }}>Online • Powered by AI</small>
                  </div>
                </div>
                <button className="btn text-white p-0" onClick={() => setIsOpen(false)}>
                  <X size={22} />
                </button>
              </div>

              <div className="flex-grow-1 p-3" style={{ overflowY: 'auto', backgroundColor: '#F9FAFB' }}>
                {messages.map((msg) => (
                  <div key={msg.id} className={`d-flex flex-column mb-3 ${msg.sender === 'user' ? 'align-items-end' : 'align-items-start'}`}>
                    
                    <div 
                      className={`p-3 rounded-4 shadow-sm ${msg.sender === 'user' ? 'bg-dark text-white' : 'bg-white text-dark'}`}
                      style={{ 
                        maxWidth: '85%', 
                        borderBottomRightRadius: msg.sender === 'user' ? '4px' : '1rem',
                        borderBottomLeftRadius: msg.sender === 'bot' ? '4px' : '1rem',
                      }}
                    >
                      <p className="mb-0" style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>{msg.text}</p>
                    </div>

                    {msg.product && (
                      <div className="mt-2 bg-white rounded-4 shadow-sm border p-2 d-flex align-items-center" style={{ width: '250px', animation: 'popIn 0.3s ease-out' }}>
                        <img src={msg.product.imageUrl} alt={msg.product.name} className="rounded-3 object-fit-cover" style={{ width: '50px', height: '50px' }} />
                        <div className="ms-2 flex-grow-1">
                          <h6 className="mb-0 fw-bold" style={{ fontSize: '0.85rem' }}>{msg.product.name}</h6>
                          <small className="text-muted fw-bold">${msg.product.price.toFixed(2)}</small>
                        </div>
                        <button 
                          onClick={() => {
                            onAddToCart(msg.product!);
                            setIsOpen(false);
                          }}
                          className="btn btn-dark rounded-circle p-1 d-flex justify-content-center align-items-center"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="d-flex align-items-start mb-3">
                    <div className="bg-white p-3 rounded-4 shadow-sm d-flex align-items-center gap-1" style={{ borderBottomLeftRadius: '4px' }}>
                      <span className="spinner-grow spinner-grow-sm text-secondary" style={{ width: '6px', height: '6px', animationDelay: '0s' }}></span>
                      <span className="spinner-grow spinner-grow-sm text-secondary" style={{ width: '6px', height: '6px', animationDelay: '0.2s' }}></span>
                      <span className="spinner of-grow spinner-grow-sm text-secondary" style={{ width: '6px', height: '6px', animationDelay: '0.4s' }}></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-3 bg-white border-top">
                <form onSubmit={handleSendMessage} className="d-flex align-items-center bg-light rounded-pill px-3 py-1 border">
                  <input 
                    type="text" 
                    className="form-control border-0 bg-transparent shadow-none" 
                    placeholder="Ask about coffee..." 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    style={{ fontSize: '0.95rem' }}
                  />
                  <button type="submit" className="btn border-0 text-dark p-2" disabled={!inputValue.trim()}>
                    <Send size={20} />
                  </button>
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