import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // التخزين ممتلئ أو ممنوع: التطبيق يكمل بدون حفظ
    }
  }, [key, value]);

  return [value, setValue];
}
export default useLocalStorage;