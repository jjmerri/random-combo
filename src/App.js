import "./App.css";
import { useState } from "react";

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

function shuffle(array) {
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
  const [shuffledCombos, setShuffledCombos] = useState(combos);

  const shuffleCombos = () => {
    setShuffledCombos([...shuffle(combos)]);
  };

  return (
    <div className="App">
      <button onClick={shuffleCombos} style={{ marginTop: "1rem" }}>
        Shuffle Combos
      </button>

      <table
        style={{ paddingTop: "1rem", marginLeft: "auto", marginRight: "auto" }}
      >
        {shuffledCombos?.map((combo, index) => {
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
      </table>
    </div>
  );
}

export default App;
