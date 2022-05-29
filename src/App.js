import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

const getCombos = () => {
  const combos = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      combos.push({
        color1: "black",
        number1: i + 1,
        color2: "black",
        number2: j + 1,
        id: combos.length + 1,
      });
    }
  }
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      combos.push({
        color1: "black",
        number1: i + 1,
        color2: "red",
        number2: j + 1,
        id: combos.length + 1,
      });
    }
  }
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      combos.push({
        color1: "red",
        number1: i + 1,
        color2: "black",
        number2: j + 1,
        id: combos.length + 1,
      });
    }
  }
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      combos.push({
        color1: "red",
        number1: i + 1,
        color2: "red",
        number2: j + 1,
        id: combos.length + 1,
      });
    }
  }
  return combos;
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const combos = getCombos();

function App() {
  const [comboHistory, setComboHistory] = useState([]);

  const getCombo = () => {
    setComboHistory([...comboHistory, combos[getRandomInt(0, 255)]]);
  };

  return (
    <div className="App">
      <button onClick={getCombo}>Random Combo</button>

      {comboHistory
        ?.map((combo) => {
          return (
            <p>{`${combo.id} - ${combo.color1}:${combo.number1} - ${combo.color2}:${combo.number2}`}</p>
          );
        })
        .reverse()}
    </div>
  );
}

export default App;
