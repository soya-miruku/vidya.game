import { useState, createContext } from "react"

const initialValue = {
  isDarkMode: true,
}

export const ThemeContext = createContext<any>(initialValue);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      if(typeof(window) !== 'undefined'){
        const item = window.localStorage.getItem("isDarkMode");
        return item ? JSON.parse(item) : initialValue.isDarkMode;
      }
      return true;
    } catch (error) {
      return initialValue.isDarkMode;
    }
  });
  
  const toggleMode = () => {
    const newMode = !isDarkMode;
    window.localStorage.setItem("isDarkMode", JSON.stringify(newMode));
    setIsDarkMode(!isDarkMode);
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  )
}