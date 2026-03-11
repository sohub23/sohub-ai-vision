import { useEffect, useState } from 'react';

const WhatsAppChat = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const whatsappNumber = "+8801784457062"; // Replace with actual SOHUB WhatsApp number
  const defaultMessage = "Hi! I'm interested in SOHUB AI Vision products. Can you help me?";

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(defaultMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-primary hover:scale-110 rounded-full shadow-lg transition-transform duration-200 flex items-center justify-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  className="w-7 h-7 text-white"
       ><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
    </button>
  );
};

export default WhatsAppChat;