import "./App.css";
import { useState } from "react";

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

const getCombos = () => {
  const colors = ["black", "red"];
  const numOptions = 8;
  const combos = [];
  let counter = 0;

  for (let x = 0; x < colors.length; x++) {
    for (let y = 0; y < colors.length; y++) {
      for (let i = 0; i < numOptions; i++) {
        for (let j = 0; j < numOptions; j++) {
          combos.push({
            color1: colors[x],
            number1: i + 1,
            color2: colors[y],
            number2: j + 1,
            id: ++counter,
          });
        }
      }
    }
  }
  return combos;
};

const combos = getCombos();

const shuffleIds = () => {
  const numbersArray = shuffle(Array.from({ length: 256 }, (_, i) => i + 1));

  for (let i = 0; i < combos.length; i++) {
    combos[i].id = numbersArray[i];
  }
};

const pairElement = (combo) => {
  return (
    <tr key={combo.id}>
      <td>{combo.id}:</td>
      <td>
        (<span style={{ color: combo.color1 }}>{combo.number1}</span>,
        <span style={{ color: combo.color2 }}>{combo.number2}</span>)
      </td>
    </tr>
  );
};

function App() {
  const [shuffledCombos, setShuffledCombos] = useState(combos);

  const shuffleCombos = () => {
    shuffleIds();
    setShuffledCombos([...combos]);
  };

  return (
    <div className="App">
      <button onClick={shuffleCombos} style={{ marginTop: "1rem" }}>
        Shuffle Combos
      </button>

      <table
        style={{
          paddingTop: "1rem",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {shuffledCombos?.map((combo) => {
          return pairElement(combo);
        })}
      </table>
    </div>
  );
}

export default App;
