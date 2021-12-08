import { useEffect } from "react";

export const useScroll = () => {
  useEffect(() => {
    document.body.classList.add('scroll-window');
    return () => {
      document.body.classList.remove('scroll-window');
    }
  }, []);
}