import { useState } from "react";

export default function Board() {
  //create an array to hold the 9 values
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState(true);
  const endMessage = calWinner(squares);
  let status;
  if (endMessage) {
    status = endMessage;
  } else {
    status = "Next Player: " + (player ? "X" : "O");
  }

  function handleClick(i) {
    const nextSquares = squares.slice();
    if (nextSquares[i] || calWinner(squares)) {
      return;
    }
    nextSquares[i] = player ? "X" : "O";
    setPlayer(!player);
    setSquares(nextSquares);
  }
  // creates a component. its standard namin convention to use on
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calWinner(squares) {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let comboID = 0; comboID < winningCombos.length; comboID++) {
    const [a, b, c] = winningCombos[comboID];
    //if combo has all the same player markers then that player wins
    if (
      squares[a] != null &&
      squares[a] == squares[b] &&
      squares[a] == squares[c]
    ) {
      return "Winner is: CONGRATS PLAYER " + squares[a] + "!";
    }
    //if no spots avaible the its a tie
    if (
      squares[0] &&
      squares[1] &&
      squares[2] &&
      squares[3] &&
      squares[4] &&
      squares[5] &&
      squares[6] &&
      squares[7] &&
      squares[8]
    ) {
      return "ITS A TIE!";
    }
  }
  return null;
}
