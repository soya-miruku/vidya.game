import { useCallback, useContext, useState } from "react";
import { ThemeContext } from "../common/providers/ThemeProvider";


export const useDarkMode = () => {
  const {isDarkMode, toggleMode} = useContext(ThemeContext);

  return {isDarkMode, toggleMode};
}