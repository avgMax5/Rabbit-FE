import { useState, useEffect } from 'react';

export const useHomeAnimation = () => {
  const [showLogo, setShowLogo] = useState(true);
  const [showHomeText, setShowHomeText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
      setTimeout(() => {
        setShowHomeText(true);
      }, 800);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return {
    showLogo,
    showHomeText,
  };
};
