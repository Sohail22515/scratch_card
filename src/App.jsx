import React from "react";
import ScratchCard from "./ScratchCard";

function App() {
  return (
    <div className="App">
      <h1>Scratch Card Game</h1>
      <ScratchCard width={400} height={200} revealMessage="Congratulations, you won!" />
    </div>
  );
}

export default App;
