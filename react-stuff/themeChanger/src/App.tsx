import { useEffect, useState } from 'react'
import { Card } from './components'
import { ThemeProvider } from './context/theme';

function App() {
  const [themeMode, setThemeMode] = useState('dark');

  const lightTheme = () => {
    setThemeMode('light');
  };

  const darkTheme = () => {
    setThemeMode('dark');
  };

  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      html.classList.remove("light", "dark");
      html.classList.add(themeMode);
    };
  }, [themeMode]);


  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <div className='w-full min-h-screen mid bg-sky-800'>
        <div className='relative mid'>
          <Card />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
