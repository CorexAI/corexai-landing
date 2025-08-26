'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineCheck, HiOutlineX, HiOutlineExclamation, HiOutlineInformationCircle } from 'react-icons/hi';
import { useEffect } from 'react';

export interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ id, type, title, message, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <HiOutlineCheck className="w-5 h-5 text-green-500" />;
      case 'error':
        return <HiOutlineX className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <HiOutlineExclamation className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <HiOutlineInformationCircle className="w-5 h-5 text-blue-500" />;
      default:
        return <HiOutlineInformationCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'border-green-500/20 bg-green-500/10 text-green-400';
      case 'error':
        return 'border-red-500/20 bg-red-500/10 text-red-400';
      case 'warning':
        return 'border-yellow-500/20 bg-yellow-500/10 text-yellow-400';
      case 'info':
        return 'border-blue-500/20 bg-blue-500/10 text-blue-400';
      default:
        return 'border-blue-500/20 bg-blue-500/10 text-blue-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`relative flex items-start gap-3 p-4 rounded-lg border ${getStyles()} shadow-lg overflow-hidden`}
    >
      {/* Progress bar */}
      <motion.div
        className={`absolute bottom-0 left-0 h-1 ${
          type === 'success' ? 'bg-green-500' :
          type === 'error' ? 'bg-red-500' :
          type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
        }`}
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: duration / 1000, ease: 'linear' }}
      />
      
      <div className="flex-shrink-0 mt-0.5">
        {getIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm">{title}</h4>
        <p className="text-sm opacity-90 mt-1">{message}</p>
      </div>
      
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 ml-2 p-1 rounded-md opacity-60 hover:opacity-100 transition-opacity"
      >
        <HiOutlineX className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default Toast;
