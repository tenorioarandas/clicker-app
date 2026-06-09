import { useEffect, useState } from "react";
import { PiCursorClickLight } from "react-icons/pi";
import { MdOutlineTimer } from "react-icons/md";

import "./App.css";

function App() {
  const [counter, setCounter] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const rank = getRank();

  const clickPerSecond = getCPS();

  useEffect(() => {
    if (!gameStarted) return;

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer >= 5) {
          clearInterval(interval);
          return 5;
        }

        return prevTimer + 0.01;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [gameStarted]);

  function handleClick() {
    if (!gameStarted) {
      setGameStarted(true);
    }

    if (timer < 5) {
      setCounter((prevCounter) => prevCounter + 1);
    }
  }

  function getRank() {
    if (counter < 10) return "🐢 Beginner";
    if (counter < 20) return "🐇 Fast Clicker";
    if (counter < 30) return "🐺 Wild Clicker";
    if (counter < 40) return "🐆 Pro Clicker";
    if (counter < 45) return "⚡ Lightning";
    if (counter < 49) return "👹 Speed Demon";

    return "👑 Click King";
  }

  function getCPS() {
    if (timer === 0) return 0;

    return (counter / timer).toFixed(1);
  }

  const seconds = Math.floor(timer);

  const milliseconds = Math.floor((timer % 1) * 100);

  const formattedTimer =
    `${String(seconds).padStart(2, "0")}:` +
    `${String(milliseconds).padStart(2, "0")}`;

  return (
    <section>
      <div className="box-timer">
        <MdOutlineTimer color="#5500FF" size="5em" />
        <div className="flex-box">
          <p>TEMPO RESTANTE:</p>
          <p className="timer">{formattedTimer}</p>
        </div>
      </div>

      <h1>CONTADOR DE CLIQUES</h1>

      <p className="counter">{counter}</p>

      <button onClick={handleClick} disabled={timer >= 5}>
        <PiCursorClickLight size="1.5em" />
        CLICAR
      </button>
      <div className="rank">
        <p>{rank}</p>
        <p>{clickPerSecond}</p>
      </div>
    </section>
  );
}

export default App;
