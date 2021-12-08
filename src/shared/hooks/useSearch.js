import { useRef, useState } from "react";

const DURATION = 600;

export const useSearch = () => {
  const timeSearch = useRef(null);
  const [inputValue, setInputValue] = useState();
  
  const handleSearch = (action) => {
    return (e) => {
      const value = e.target.value?.trim() || null;
      setInputValue(value);
      if(timeSearch?.current) {
        clearTimeout(timeSearch?.current);
      }
      timeSearch.current = setTimeout(() => {
        action(value);
      }, DURATION);
    }
  }

  return { handleSearch, inputValue };
}