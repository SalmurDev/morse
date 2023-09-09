import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [screenColor, setScreenColor] = useState('black')
  const morse = new Map([
    ['a', '.-'],
    ['b', '-...'],
    ['c', '-.-.'],
    ['d', '-..'],
    ['e', '.'],
    ['f', '..-.'],
    ['g', '--.'],
    ['h', '....'],
    ['i', '..'],
    ['j', '.---'],
    ['k', '-.-'],
    ['l', '.-..'],
    ['m', '--'],
    ['n', '-.'],
    ['o', '---'],
    ['p', '.--.'],
    ['q', '--.-'],
    ['r', '.-.'],
    ['s', '...'],
    ['t', '-'],
    ['u', '..-'],
    ['v', '...-'],
    ['w', '.--'],
    ['x', '-..-'],
    ['y', '-.--'],
    ['z', '--..'],
    ['0', '-----'],
    ['1', '.----'],
    ['2', '..---'],
    ['3', '...--'],
    ['4', '....-'],
    ['5', '.....'],
    ['6', '-....'],
    ['7', '--...'],
    ['8', '---..'],
    ['9', '----.'],
    [" ", "....."],
  ])
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === ' ') {
        setScreenColor('white');
      }
    }
    const onKeyUp = (e) => {
      let key = e.key
      let phrases = ['1', '2']
      console.log(e.key);
      if (key === ' ') {
        setScreenColor('black');
      } else if(phrases.includes(key)) {
        console.log('entered');
        try {
          async function getMessage(key) {
            let res = await axios.get(`http://localhost:8000/morses/${key}`)
            let json = res.data            
            return
          }          
        } catch (error) {
          console.log(error);
        }
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
    </div>
  );
}

export default App;
