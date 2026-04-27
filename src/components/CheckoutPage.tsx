import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, MessageCircle, Send, ShoppingBag, CreditCard, User, Mail, FileText, Shirt, Music, Zap, Footprints, Target, Trophy } from 'lucide-react';
import { Language, translations } from '../translations';

interface CheckoutPageProps {
  isOpen: boolean;
  onClose: () => void;
  cart: any[];
  total: number;
  onOrder: (formData: any) => void;
  language: Language;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ 
  isOpen, onClose, cart, total, onOrder, language 
}) => {
  const t = translations[language] || translations.DE;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    note: ''
  });

  if (!isOpen) return null;

  return (
    <div id="checkout-page" className="open">
      <div className="co-wrap">
        <button onClick={onClose} className="co-back">
          <ChevronLeft size={20} /> Zurück zum Shop
        </button>

        <header className="mb-8">
          <h1 className="co-h">Kasse</h1>
          <p className="co-sub">Fast geschafft! Schließe deine Bestellung ab.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="co-section">
              <h3 className="co-section-title"><User size={18} className="text-brand-primary" /> Deine Daten</h3>
              <div className="co-form-grid">
                <input 
                  type="text" 
                  placeholder="Dein Name" 
                  className="co-input full" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required
                />
                <input 
                  type="email" 
                  placeholder="E-Mail Adresse" 
                  className="co-input full"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  required
                />
                <textarea 
                  placeholder="Nachricht oder Anmerkung (Größe, Farbe, etc.)" 
                  className="co-input full h-32"
                  value={formData.note}
                  onChange={e => setFormData({...formData, note: e.target.value})}
                />
              </div>
            </div>

            <div className="co-section">
              <h3 className="co-section-title"><CreditCard size={18} className="text-brand-primary" /> Zahlung & Versand</h3>
              <div className="co-order-note">
                <p><strong>Hinweis:</strong> Die Zahlung erfolgt per Vorkasse oder bar vor Ort. Nach der Bestellung kontaktieren wir dich per E-Mail oder WhatsApp mit den Details.</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="co-section">
              <h3 className="co-section-title"><ShoppingBag size={18} className="text-brand-primary" /> Zusammenfassung</h3>
              <div className="space-y-1">
                {cart.map(item => (
                  <div key={item.id} className="co-item-row">
                    <div className="co-item-ico text-brand-primary">
                      {item.icon === 'Shirt' ? <Shirt size={20} /> : 
                       item.icon === 'Music' ? <Music size={20} /> : 
                       item.icon === 'Zap' ? <Zap size={20} /> :
                       item.icon === 'Footprints' ? <Footprints size={20} /> :
                       item.icon === 'Target' ? <Target size={20} /> :
                       item.icon === 'Trophy' ? <Trophy size={20} /> :
                       <ShoppingBag size={20} />}
                    </div>
                    <div className="co-item-name">
                      <div>{item.name}</div>
                      <div className="co-item-detail">{item.quantity}x {item.category}</div>
                    </div>
                    <div className="co-item-price">{item.price}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/5 space-y-2">
                <div className="co-summary-row">
                  <span>Zwischensumme</span>
                  <span className="co-s-val">{total}€</span>
                </div>
                <div className="co-summary-row">
                  <span>Versand</span>
                  <span className="co-s-val">0€</span>
                </div>
                <div className="co-summary-row total pt-4">
                  <span>Gesamt</span>
                  <span className="co-s-val">{total}€</span>
                </div>
              </div>
            </div>

            <div className="co-actions">
              <button 
                className="co-wa-btn w-full"
                onClick={() => onOrder(formData)}
                disabled={!formData.name || !formData.email}
              >
                <MessageCircle size={20} /> Bestellung per WhatsApp absenden
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
