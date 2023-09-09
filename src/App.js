import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [screenColor, setScreenColor] = useState('black')

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === ' ') {
        setScreenColor('white');
      }
    }
    const onKeyUp = (e) => {
      if (e.key === ' ') {
        setScreenColor('black');
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    }
  }, [])

  return (
    <div className={`App ${screenColor}`}>
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
