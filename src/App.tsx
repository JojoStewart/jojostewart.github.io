import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import { MUSICALS_LIST } from "./musicalsList";
import Logo from "./musicle-logo.png";

const shuffledMusicals = () => {
  return MUSICALS_LIST.map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

// TODO add win streak

function App() {
  const [count, setCount] = useState(1);
  const [guesses, setGuesses] = useState(["", "", "", "", "", ""]);
  const [won, setWon] = useState(false);

  const [musicals, _] = useState(shuffledMusicals()); // TODO useEffect?
  const [musicalsCount, setMusicalsCount] = useState(0);

  const [guessText, setGuessText] = useState("");

  const { name: musical, emojis } = musicals[musicalsCount];

  const triggerWin = () => {
    alert("Yay you win");
  };

  const triggerLose = () => {
    alert("Oh no you lose");
  };

  const guess = () => {
    if (guessText.toLowerCase() === musical.toLowerCase()) {
      triggerWin();
    }

    let current = guesses;
    current[count - 1] = guessText;
    setGuesses(current);

    if (count === emojis.length) {
      // Game is over
      alert("Game over");
    } else {
      setCount(count + 1);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGuessText(event.target.value);

    console.log("value is:", event.target.value);
  };

  return (
    <div className="App bg-[url('musicle-bg.png')] bg-contain bg-no-repeat bg-[#FFF5CD] bg-center-top	">
      <header className="App-header">
        <div className="">
          <div className="flex flex-row justify-center items-center py-20">
            {emojis.map((emoji, index) => (
              <div key={emoji} className="md:text-5xl text-2xl">
                {count > index ? emoji : ""}
              </div>
            ))}
          </div>

          <div className="flex flex-col">
            {guesses.map((guess, i) => (
              <input
                className="p-2 my-1 text-sm rounded-md bg-gray-50 border border-gray-300 text-gray-900"
                type="text"
                disabled={true}
                value={guess}
                key={i}
              ></input>
            ))}
          </div>

          <input
            className="w-[200px] my-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            type="text"
            onChange={(e) => handleChange(e)}
          ></input>
          <button
            // className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            className="bg-[url('guess.png')] bg-[#EDFCCC] w-40 h-20 bg-contain bg-no-repeat bg-center py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={() => guess()}
          ></button>
        </div>
      </header>
    </div>
  );
}

export default App;
