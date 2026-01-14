import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose, title, children, type = 'info' }) => {
  const typeStyles = {
    info: { icon: 'ℹ️', gradient: 'from-accent to-geo-accent' },
    success: { icon: '✅', gradient: 'from-geo-accent to-emerald-400' },
    warning: { icon: '⚠️', gradient: 'from-amber-500 to-orange-500' },
    error: { icon: '❌', gradient: 'from-red-500 to-rose-500' },
  };

  const { icon, gradient } = typeStyles[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
          >
            {/* Header with gradient */}
            <div className={`h-2 bg-gradient-to-r ${gradient}`} />

            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-xl shadow-lg`}>
                  {icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-display font-bold text-text-primary mb-2">
                    {title}
                  </h3>
                  <div className="text-text-secondary">
                    {children}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-glass-border">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl font-medium text-text-secondary hover:bg-secondary-bg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={onClose}
                  className={`px-6 py-2.5 rounded-xl font-medium text-white bg-gradient-to-r ${gradient} hover:shadow-lg transition-shadow`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;