import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // This tells the browser to scroll smoothly to the top
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // This is the magic part!
    });
  }, [pathname]);

  return null; 
};

export default ScrollToTop;