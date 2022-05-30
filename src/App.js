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

const combos = getCombos();

function App() {
  const [comboHistory, setComboHistory] = useState([]);

  const getCombo = () => {
    setComboHistory([...comboHistory, combos[Math.floor(Math.random() * 256)]]);
  };

  return (
    <div className="App">
      <button onClick={getCombo} style={{ marginTop: "1rem" }}>
        Random Combo
      </button>

      {comboHistory
        ?.map((combo, index) => {
          return (
            <p
              key={index}
              style={{
                fontWeight:
                  index === comboHistory.length - 1 ? "bold" : "normal",
              }}
            >{`${combo.id} - (${combo.color1}:${combo.number1}, ${combo.color2}:${combo.number2})`}</p>
          );
        })
        .reverse()}
    </div>
  );
}

export default App;
