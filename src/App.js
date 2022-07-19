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

const shuffle = (original) => {
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
};

const combos = getCombos();

function App() {
  const [shuffledHistory, setShuffledHistory] = useState([combos]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [filterVal, setFilterVal] = useState({
    color1: "black",
    number1: 4,
    color2: "red",
    number2: 5,
  });

  const shuffleCombos = useCallback(() => {
    setHistoryIndex(shuffledHistory.length);
    const shuffled = [...shuffle(combos)];
    setShuffledHistory((prev) => [...prev, shuffled]);
  }, [shuffledHistory]);

  const calcFilterVal = (val) => {
    var comboRegEx = /^([BR])([1-8])([BR])([1-8])$/g;
    var match = comboRegEx.exec(val.toUpperCase());

    if (match) {
      const color1 = match[1] === "B" ? "black" : "red";
      const number1 = parseInt(match[2]);
      const color2 = match[3] === "B" ? "black" : "red";
      const number2 = parseInt(match[4]);

      setFilterVal({ color1, number1, color2, number2 });
    } else {
      setFilterVal({});
    }
  };

  return (
    <div className="App">
      <button onClick={shuffleCombos} style={{ marginTop: "1rem" }}>
        Shuffle Combos
      </button>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <label>
          {"Find: "}
          <input
            placeholder="B4R5"
            style={{ marginRight: "1rem" }}
            onChange={(e) => calcFilterVal(e.target.value)}
            defaultValue="B4R5"
            size="8"
          />
        </label>
        <label>
          {shuffledHistory[historyIndex].findIndex(
            (combo) =>
              combo.color1 === filterVal.color1 &&
              combo.number1 === filterVal.number1 &&
              combo.color2 === filterVal.color2 &&
              combo.number2 === filterVal.number2
          ) + 1}
        </label>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <button
          onClick={() => setHistoryIndex((prev) => prev - 1)}
          disabled={historyIndex === 0}
        >
          Prev Combo
        </button>
        <span style={{ marginLeft: "1rem", marginRight: "1rem" }}>
          {historyIndex + 1}
        </span>
        <button
          onClick={() => setHistoryIndex((prev) => prev + 1)}
          disabled={historyIndex === shuffledHistory.length - 1}
        >
          Next Combo
        </button>
      </div>
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
