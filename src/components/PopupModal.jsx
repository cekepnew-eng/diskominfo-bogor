import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Clock, AlertTriangle, X } from 'lucide-react';

const PopupModal = ({ isOpen, onClose, title, message, type = 'success' }) => {
  // Determine icon and colors based on type
  let Icon = CheckCircle;
  let colorTheme = 'emerald';

  switch (type) {
    case 'success':
      Icon = CheckCircle;
      colorTheme = 'emerald';
      break;
    case 'process':
      Icon = Clock;
      colorTheme = 'sky';
      break;
    case 'error':
    case 'not-found':
      Icon = XCircle;
      colorTheme = 'rose';
      break;
    case 'warning':
      Icon = AlertTriangle;
      colorTheme = 'amber';
      break;
    default:
      break;
  }

  const bgClasses = {
    emerald: 'bg-emerald-100 text-emerald-600',
    sky: 'bg-sky-100 text-sky-600',
    rose: 'bg-rose-100 text-rose-600',
    amber: 'bg-amber-100 text-amber-600',
  };

  const buttonClasses = {
    emerald: 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30',
    sky: 'bg-sky-500 hover:bg-sky-600 shadow-sky-500/30',
    rose: 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/30',
    amber: 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/30',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-8 text-center">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${bgClasses[colorTheme]}`}>
                <Icon size={40} />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-800 mb-3">{title}</h3>
              
              <div className="text-slate-600 mb-8 whitespace-pre-wrap leading-relaxed">
                {message}
              </div>

              <button
                onClick={onClose}
                className={`w-full py-3.5 px-8 text-white font-bold rounded-xl shadow-lg transition-all hover:-translate-y-0.5 ${buttonClasses[colorTheme]}`}
              >
                Mengerti
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PopupModal;
