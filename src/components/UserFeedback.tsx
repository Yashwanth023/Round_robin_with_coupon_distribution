
import React, { useState, useEffect } from 'react';
import { FeedbackMessage } from '@/types';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

interface UserFeedbackProps {
  message: FeedbackMessage | null;
}

const UserFeedback: React.FC<UserFeedbackProps> = ({ message }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    if (message) {
      setVisible(true);
      
      // Auto-hide the message after duration (default: 5 seconds)
      const timeout = setTimeout(() => {
        setVisible(false);
      }, message.duration || 5000);
      
      return () => clearTimeout(timeout);
    }
  }, [message]);
  
  if (!message || !visible) {
    return null;
  }
  
  // Icon based on message type
  const getIcon = () => {
    switch (message.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };
  
  // Background color based on message type
  const getBackgroundClass = () => {
    switch (message.type) {
      case 'success':
        return 'bg-green-50 border-green-100';
      case 'error':
        return 'bg-red-50 border-red-100';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-100';
    }
  };
  
  return (
    <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-slide-in ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-md ${getBackgroundClass()} border max-w-md`}>
        {getIcon()}
        <span className="text-sm font-medium">{message.message}</span>
      </div>
    </div>
  );
};

export default UserFeedback;
