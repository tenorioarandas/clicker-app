import { useEffect, useState } from "react";
import { PiCursorClickLight } from "react-icons/pi";
import { MdOutlineTimer } from "react-icons/md";
import { HiMiniChartBar } from "react-icons/hi2";
import { BiSolidTrophy } from "react-icons/bi";
import { VscDebugRestart } from "react-icons/vsc";

import "./App.css";

function App() {
  const [counter, setCounter] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [record, setRecord] = useState(0);
  const [showRestart, setShowRestart] = useState(false);

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

  useEffect(() => {
    if (timer >= 5) {
      setTimeout(() => {
        setShowRestart(true);
      }, 1000);
    }
  }, [timer]);

  function handleClick() {
    if (!gameStarted) {
      setGameStarted(true);
    }

    if (timer < 5) {
      setCounter((prevCounter) => {
        const newCounter = prevCounter + 1;

        if (newCounter > record) {
          setRecord(newCounter);
        }

        return newCounter;
      });
    }
  }

  function getCPS() {
    if (timer === 0) return 0;

    return (counter / timer).toFixed(1);
  }

  function restartGame() {
    setCounter(0);
    setTimer(0);
    setGameStarted(false);

    setShowRestart(false);
  }

  const seconds = Math.floor(timer);

  const milliseconds = Math.floor((timer % 1) * 100);

  const formattedTimer =
    `${String(seconds).padStart(2, "0")}:` +
    `${String(milliseconds).padStart(2, "0")}`;

  return (
    <section>
      <div className="timer-box">
        <MdOutlineTimer color="#5500FF" size="5em" />
        <div className="timer-content">
          <p>TEMPO RESTANTE:</p>
          <p className="timer">{formattedTimer}</p>
        </div>
      </div>
      <h1>CONTADOR DE CLIQUES</h1>
      <p className="counter">{counter}</p>

      {timer < 5 && (
        <button
          className="btn btn-start"
          onClick={handleClick}
          disabled={timer >= 5}
        >
          <PiCursorClickLight size="1.5em" />
          CLICAR
        </button>
      )}

      {showRestart && (
        <button className="btn btn-restart" onClick={restartGame}>
          <VscDebugRestart size="1.5em" />
          RECOMEÇAR
        </button>
      )}

      <div className="game-stats">
        <div className="record">
          <div className="record-left">
            <p className="record-icon">
              <BiSolidTrophy size="4rem" />
            </p>
          </div>
          <div className="record-right">
            <p className="record-info">MELHOR PONTUAÇÃO</p>
            <p className="record-content">{record}</p>
          </div>
        </div>

        <div className="cps">
          <div className="cps-left">
            <p className="cps-icon">
              <HiMiniChartBar size="4rem" />
            </p>
          </div>
          <div className="cps-right">
            <p className="cps-info">CLIQUES POR SEGUNDO</p>
            <p className="cps-content">{clickPerSecond}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
