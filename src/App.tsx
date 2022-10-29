import { ChangeEvent, useMemo, useState } from "react";
import "./App.css";
import { MUSICALS_LIST } from "./musicalsList";
import { shuffleMusicals } from "./util";

type GameState = "win" | "lose" | "playing";

function App() {
  const [count, setCount] = useState(1);
  const [score, setScore] = useState(0);

  const [guessText, setGuessText] = useState("");
  const [guesses, setGuesses] = useState(["", "", "", "", "", ""]);
  const [gameState, setGameState] = useState<GameState>("playing");

  const [musicals, setMusicals] = useState(shuffleMusicals(MUSICALS_LIST));
  const [musicalsCount, setMusicalsCount] = useState(0);

  // Shuffle the order of the musicals every game.
  const { name: musical, emojis } = useMemo(
    () => musicals[musicalsCount],
    [musicals, musicalsCount]
  );

  const isCorrectGuess = (guess: string) => {
    return guess.toLowerCase() === musical.toLowerCase();
  };

  const makeGuess = () => {
    // Don't accept blank guesses.
    if (guessText.length <= 0) {
      return;
    }

    if (isCorrectGuess(guessText)) {
      triggerWin();
    }

    let current = guesses;
    current[count - 1] = guessText;
    setGuesses(current);
    setCount(count + 1);

    if (count === emojis.length) {
      // Game is over
      triggerLose();
    }
  };

  const resetGame = (result: GameState, delay: number) => {
    setGameState(result);

    setTimeout(() => {
      setCount(1);
      setGuesses(["", "", "", "", "", ""]);
      setGameState("playing");

      if (result === "win") {
        setScore(score + 1);
        setMusicals(shuffleMusicals(MUSICALS_LIST));
      } else if (result === "lose") {
        setScore(0);
        setMusicalsCount(musicalsCount + 1);
      }
    }, delay);
  };

  const triggerWin = () => {
    resetGame("win", 2000);

    if (musicalsCount > MUSICALS_LIST.length) {
      alert("Game Over"); // TODO test, ask Moxon what they wanna do here.
    }
  };

  // TODO could delete?
  const triggerLose = () => {
    resetGame("lose", 1000);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Update guess per key change.
    setGuessText(event.target.value);
  };

  const handleKeypress = (e: { charCode: number }) => {
    // Trigger guess if user presses enter.
    if (e.charCode === 13) {
      makeGuess();
    }
  };

  return (
    <div className="App bg-[url('musicle-bg.png')] bg-contain bg-no-repeat bg-[#FFF5CD] bg-center-top">
      <header className="App-header">
        <div className="w-[300px]">
          <div>{musical}</div>
          <div className="flex flex-row justify-center items-center py-20">
            {emojis.map((emoji, index) => (
              <div key={emoji} className="md:text-5xl text-2xl">
                {count > index ? emoji : ""}
              </div>
            ))}
          </div>

          <div className="flex flex-col">
            {guesses.map((guess, i) => {
              if (gameState === "win" && isCorrectGuess(guess)) {
                return (
                  <input
                    type="text"
                    className="p-2 my-1 text-sm rounded-md bg-green-100 border border-green-500 text-gray-900"
                    disabled={true}
                    value={`🎉  ${musical}  🎉`}
                    key={i}
                  ></input>
                );
              } else if (gameState === "lose" && i === guesses.length - 1) {
                return (
                  <input
                    type="text"
                    className="p-2 my-1 text-sm rounded-md bg-red-100 border border-red-500 text-gray-900"
                    disabled={true}
                    value={guess}
                    key={i}
                  ></input>
                );
              } else {
                return (
                  <input
                    type="text"
                    className="p-2 my-1 text-sm rounded-md bg-gray-50 border border-gray-300 text-gray-900"
                    disabled={true}
                    value={guess}
                    key={i}
                  ></input>
                );
              }
            })}
          </div>

          <input
            type="text"
            className="w-full my-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            placeholder={"Musical name"}
            onChange={(e) => handleChange(e)}
            onKeyPress={handleKeypress}
            disabled={count > emojis.length}
          ></input>
          <button
            className="bg-[url('guess.png')] bg-[#EDFCCC] w-40 h-20 bg-contain bg-no-repeat bg-center py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={() => makeGuess()}
          ></button>
        </div>
      </header>
    </div>
  );
}

export default App;
