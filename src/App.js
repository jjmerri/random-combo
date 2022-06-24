import "./App.css";
import { useCallback, useState } from "react";

const getCombos = () => {
  const colors = ["black", "red"];
  const numOptions = 8;
  const combos = [];

  for (let x = 0; x < colors.length; x++) {
    for (let y = 0; y < colors.length; y++) {
      for (let i = 0; i < numOptions; i++) {
        for (let j = 0; j < numOptions; j++) {
          combos.push({
            color1: colors[x],
            number1: i + 1,
            color2: colors[y],
            number2: j + 1,
            id: combos.length + 1,
          });
        }
      }
    }
  }
  return combos;
};

function shuffle(original) {
  const array = [...original];
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const combos = getCombos();

function App() {
  const [shuffledHistory, setShuffledHistory] = useState([combos]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const shuffleCombos = useCallback(() => {
    setHistoryIndex(shuffledHistory.length);
    const shuffled = [...shuffle(combos)];
    setShuffledHistory((prev) => [...prev, shuffled]);
  }, [shuffledHistory]);

  return (
    <div className="App">
      <button onClick={shuffleCombos} style={{ marginTop: "1rem" }}>
        Shuffle Combos
      </button>
      <button
        onClick={() => setHistoryIndex((prev) => prev - 1)}
        disabled={historyIndex === 0}
        style={{ marginTop: "1rem" }}
      >
        Previous Result
      </button>
      <button
        onClick={() => setHistoryIndex((prev) => prev + 1)}
        disabled={historyIndex === shuffledHistory.length - 1}
        style={{ marginTop: "1rem" }}
      >
        Next Result
      </button>

      <table
        style={{ paddingTop: "1rem", marginLeft: "auto", marginRight: "auto" }}
      >
        <tbody>
          {shuffledHistory[historyIndex]?.map((combo, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}:</td>
                <td>
                  (<span style={{ color: combo.color1 }}>{combo.number1}</span>,
                  <span style={{ color: combo.color2 }}>{combo.number2}</span>)
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
