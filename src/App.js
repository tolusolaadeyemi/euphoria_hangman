import React,{ useState, useEffect } from 'react';
import Header from './components/Header';
import Instructions from './components/Instructions';
import Figure from './components/Figure';
import Logo from './components/Logo';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Notification from './components/Notification';
import Popup from './components/Popup';
import { showNotification as show } from './helpers/helpers';
import './App.css';

const words = ['ruby', 'rue','bennett','lexi','howard','fez','fezco','cal','jacobs','maddy','perez','nate','jacobs','zendaya','kat','leslie','gia','jules','vaughn','chris','mckay','cassie','howard','ali','ash','ashtray','ethan','elliot','suze','tyler','custer','mouse','laurie','faye','bobbi','marsha','labrinth','derek','glitter','gesmtones'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeydown = event => {
      const {key, keyCode} = event;
        if (playable && keyCode >= 65 && keyCode <= 90) {
          const letter = key.toLowerCase();
    
          if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
              setCorrectLetters(currentLetters => [...currentLetters, letter]);
            } else {
              show(setShowNotification);
            }
          } else {
            if (!wrongLetters.includes(letter)) {
              setWrongLetters(wrongLetters => [...wrongLetters, letter]);
            } else {
              show(setShowNotification);
            }
          }
        }
      }
      window.addEventListener('keydown', handleKeydown)
      
      return () => window.removeEventListener('keydown', handleKeydown )
      
      
  }, [correctLetters, wrongLetters, playable]); //prevents this from getting called everytime the app renders
  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  return (
    <>
      <Logo/>
      <Header />
      <Instructions />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters}/> 
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain}/>
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;
