import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle, Check, Send } from 'lucide-react';
import { Language, translations } from '../translations';

interface WhatsAppContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  whatsappNumber: string;
  initialTopicId?: string;
  context?: string; // e.g. training name or shop item
}

export const WhatsAppContactModal: React.FC<WhatsAppContactModalProps> = ({
  isOpen,
  onClose,
  language,
  whatsappNumber,
  initialTopicId,
  context
}) => {
  const t = translations[language] || translations.DE;
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [customMessage, setCustomMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (initialTopicId) {
        setSelectedTopics([initialTopicId]);
      } else {
        setSelectedTopics([]);
      }
      setCustomMessage('');
    }
  }, [isOpen, initialTopicId]);

  const toggleTopic = (id: string) => {
    setSelectedTopics(prev => 
      prev.includes(id) 
        ? prev.filter(t => t !== id) 
        : [...prev, id]
    );
  };

  const handleSend = () => {
    const selectedOptions = t.contact.options.filter(opt => selectedTopics.includes(opt.id));
    
    let message = '';
    
    if (context) {
      message += `${context}\n\n`;
    }

    if (selectedOptions.length > 0) {
      message += selectedOptions.map(opt => opt.text).join('\n');
    }

    if (customMessage.trim()) {
      message += `\n\n${customMessage}`;
    }

    if (!message) {
      message = t.contact.options[0].text; // Fallback
    }

    const encodedMsg = encodeURIComponent(message);
    const cleanNumber = whatsappNumber.replace(/\+/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodedMsg}`, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-dark/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg glass-card border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-brand-primary/10 to-transparent">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-primary text-brand-dark rounded-xl">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold uppercase tracking-tight">{t.contact.whatsappTitle}</h3>
                  <p className="text-[10px] text-brand-primary font-bold uppercase tracking-widest">{t.contact.whatsappSubtitle}</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-[var(--text-dim)]"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 overflow-y-auto scrollbar-hide">
              {context && (
                <div className="p-4 bg-brand-primary/5 border border-brand-primary/20 rounded-2xl">
                  <p className="text-[10px] text-brand-primary font-bold uppercase tracking-widest mb-1">Kontext</p>
                  <p className="text-sm font-medium">{context}</p>
                </div>
              )}

              <div className="grid gap-3">
                {t.contact.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => toggleTopic(opt.id)}
                    className={`p-4 rounded-2xl border transition-all text-left flex items-center justify-between group ${
                      selectedTopics.includes(opt.id) 
                        ? 'bg-brand-primary/10 border-brand-primary text-brand-primary' 
                        : 'bg-white/5 border-white/10 text-[var(--text-muted)] hover:border-white/20'
                    }`}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold uppercase tracking-tight">{opt.label}</span>
                      <span className="text-[10px] opacity-60 line-clamp-1">{opt.text}</span>
                    </div>
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      selectedTopics.includes(opt.id) 
                        ? 'border-brand-primary bg-brand-primary text-brand-dark' 
                        : 'border-white/10 group-hover:border-white/30'
                    }`}>
                      {selectedTopics.includes(opt.id) && <Check size={14} strokeWidth={4} />}
                    </div>
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                <label className="text-[10px] text-[var(--text-dim)] font-bold uppercase tracking-widest">
                  {language === 'DE' ? 'Zusätzliche Nachricht (Optional)' : 'Mensagem Adicional (Opcional)'}
                </label>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder={language === 'DE' ? 'Schreib uns etwas...' : 'Escreva para nós...'}
                  className="w-full h-24 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 pt-0">
              <button 
                onClick={handleSend}
                className="w-full py-4 bg-brand-primary text-brand-dark rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20 hover:scale-[1.02] transition-transform active:scale-95 group"
              >
                <Send size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                {t.contact.sendBtn}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
