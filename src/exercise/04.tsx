// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.tsx

import * as React from "react";

type Value = "X" | "O"

function Board() {
  const initialState = Array(9).fill(null);
  const [squares, setSquares] = React.useState(initialState);
  const [nextValue, setNextValue] = React.useState<Value>(calculateNextValue(squares));
  const [winner, setWinner] = React.useState<Value | null>();
  const [status, setStatus] = React.useState(calculateStatus(winner, squares, nextValue));
  // 💰 I've written the calculations for you! So you can use my utilities
  // below to create these variables

  // This is the function your square click handler will call. `square` should
  // be an index. So if they click the center square, this will be `4`.
  function selectSquare(square: number) {
    if(square < 0 || square > 8) {
      return;
    }
    if(squares[square] !== null) {
      return;
    }
    if(winner) {
      return;
    }

    const squaresCopy = [...squares];
    squaresCopy[square] = nextValue;
    setSquares(squaresCopy);
  }

  function restart() {
    setSquares(initialState);
  }

  function renderSquare(i: any) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  }

  React.useEffect(() => {
    setWinner(calculateWinner(squares));
    if(!winner) {
      setNextValue(calculateNextValue(squares));
    }
  }, [squares, winner]);

  React.useEffect(() => {
    setStatus(calculateStatus(winner, squares, nextValue));
  }, [winner, squares, nextValue]);

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner: any, squares: any, nextValue: any): string {
  return winner
         ? `Winner: ${winner}`
         : squares.every(Boolean)
           ? `Scratch: Cat's game`
           : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares: any): Value {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares: any): Value | null {
  const lines: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for(let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;
