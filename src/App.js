import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [screenColor, setScreenColor] = useState('black')
  const [message, setMessage] = useState('')
  // const [running, setRunning] = useState(false)
  const morse = {
    'a': '.-',
    'b': '-...',
    'c': '-.-.',
    'd': '-..',
    'e': '.',
    'f': '..-.',
    'g': '--.',
    'h': '....',
    'i': '..',
    'j': '.---',
    'k': '-.-',
    'l': '.-..',
    'm': '--',
    'n': '-.',
    'o': '---',
    'p': '.--.',
    'q': '--.-',
    'r': '.-.',
    's': '...',
    't': '-',
    'u': '..-',
    'v': '...-',
    'w': '.--',
    'x': '-..-',
    'y': '-.--',
    'z': '--..',
    '0': '-----',
    '1': '.----',
    '2': '..---',
    '3': '...--',
    '4': '....-',
    '5': '.....',
    '6': '-....',
    '7': '--...',
    '8': '---..',
    '9': '----.',
    " ": "....."
  };
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );
  useEffect( () => {

    axios.get(`http://localhost:8000/morse/1`)
    .then(
      res => {
        let json = res.data.morse.message
        let morseMessage = getMorse(json)
        console.log(json, morseMessage);
        setMessage(morseMessage)
      }
    )

    const onKeyDown = (e) => {
      if (e.key === ' ') {
        setScreenColor('white');
      }
    }
    const onKeyUp = async (e) => {
      let key = e.key
      console.log(e.key);
      if (key === ' ') {
        setScreenColor('black');
      }
      if (e.key === '-') {
        await line()
        return
      } if (e.key === '.') {
        dot()
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    }
  }, [])

  async function recurringMessage(string) {
    for (let i = 0; i < string.length; i++) {
      if (string.charAt(i) === '-') await line()
      if (string.charAt(i) === '.') await dot()
      if (string.charAt(i) === ' ') await delay(1000)
    }
    return
  }

  async function dot() {
    setScreenColor('white')
    await delay(200)
    setScreenColor('black')
    await delay(400)
    return
  }
  async function line() {
    setScreenColor('white')
    await delay(600)
    setScreenColor('black')
    await delay(400)
    return
  }

  function getMorse(string) {
    let morseString = "";
    for (let i = 0; i < string.length; i++) {
      const carattere = string[i];
      if (morse[carattere]) {
        morseString += morse[carattere] + ' ';
      } else if (carattere === ' ') {
        morseString += ' ';
      } else {
        morseString += '';
      }
    }

    return morseString.trim();
  }

  const handleClick = async () => {
    recurringMessage(message)
    setInterval(() => {
      recurringMessage(message)
    }, 60000);
  }

  return (
    <div className={`App ${screenColor}`}>
      <button onClick={handleClick}>start message</button>
    </div>
  );
}

export default App;
