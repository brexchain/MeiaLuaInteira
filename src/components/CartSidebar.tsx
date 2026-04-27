import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Shirt, Music, Zap, Footprints, Target, Trophy } from 'lucide-react';
import { Language, translations } from '../translations';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: any[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  total: number;
  language: Language;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, onClose, cart, onUpdateQty, onRemove, onCheckout, total, language 
}) => {
  const t = translations[language] || translations.DE;

  return (
    <>
      <div 
        id="cart-overlay" 
        className={isOpen ? 'open' : ''} 
        onClick={onClose}
      />
      <div id="cart-sidebar" className={isOpen ? 'open' : ''}>
        <div className="cart-hd">
          <h2 className="cart-title">Warenkorb</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="cart-body scroller">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={48} className="cart-empty-icon mx-auto" />
              <p>Dein Warenkorb ist leer</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-ico text-brand-primary">
                    {item.icon === 'Shirt' ? <Shirt size={24} /> : 
                     item.icon === 'Music' ? <Music size={24} /> : 
                     item.icon === 'Zap' ? <Zap size={24} /> :
                     item.icon === 'Footprints' ? <Footprints size={24} /> :
                     item.icon === 'Target' ? <Target size={24} /> :
                     item.icon === 'Trophy' ? <Trophy size={24} /> :
                     <ShoppingBag size={24} />}
                  </div>
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-sub">{item.category}</div>
                    <div className="cart-qty">
                      <button onClick={() => onUpdateQty(item.id, -1)}><Minus size={12} /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onUpdateQty(item.id, 1)}><Plus size={12} /></button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="cart-item-price">{item.price}</div>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="cart-item-del mt-2"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-foot">
            <div className="cart-total-row">
              <span className="cart-total-lbl">Gesamtbetrag:</span>
              <span className="cart-total-val">{total}€</span>
            </div>
            <button 
              className="shop-add w-full py-4 rounded-2xl justify-center text-lg mt-4"
              onClick={onCheckout}
            >
              Weiter zur Kasse <ArrowRight size={20} className="ml-2" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};
