import { useState, useEffect } from 'react';

export const useHomeAnimation = () => {
  const [showLogo, setShowLogo] = useState(false);
  const [showHomeText, setShowHomeText] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setShowLogo(true);
    
    const timer = setTimeout(() => {
      setShowLogo(false);
      setTimeout(() => {
        setShowHomeText(true);
      }, 800);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return {
    showLogo: isClient ? showLogo : false,
    showHomeText: isClient ? showHomeText : true,
  };
};
