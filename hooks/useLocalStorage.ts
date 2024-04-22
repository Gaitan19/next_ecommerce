import { useState, useEffect } from 'react';

const useLocalStorage = (key: string, defaultValue: any) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    if (value !== defaultValue) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value]);

  return [value, setValue];
};

export default useLocalStorage;
