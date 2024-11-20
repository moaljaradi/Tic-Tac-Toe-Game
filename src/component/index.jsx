import { useEffect, useState } from "react";
import styles from"./style.module.css";

const Square = ({ value, onClick }) => {
  return (
    <button onClick={onClick} className={styles.square}>
      {value}
    </button>
  );
};

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);
  const [state, setState] = useState("");

  const getWinner = (squares) => {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
    ];
    for (let i = 0; i < winningPatterns.length; i++) {
      const [x, y, z] = winningPatterns[i];

      if (
        squares[x] &&
        squares[x] === squares[y] &&
        squares[x] === squares[z]
      ) {
        return squares[x];
      }
    }

    return null;
  };

  const handleOnClick = (getCurrentSquare) => {
    let cypSqaures = [...squares];
    if (getWinner(cypSqaures) || cypSqaures[getCurrentSquare]) return;
    cypSqaures[getCurrentSquare] = isXTurn ? "X" : "O";
    setIsXTurn(!isXTurn);
    setSquares(cypSqaures);
  };
  const handleRestart = () => {
    setIsXTurn(true);
    setSquares(Array(9).fill(''))

  }
  useEffect(() => {
    if (getWinner(squares) && squares.every((item) => item !== "")) {
      setState("This is a drew :) restart the game ");
    } else if (getWinner(squares)) {
      setState(`Winner is ${getWinner(squares)}`);
    } else {
      setState(`Next player is ${isXTurn ? "X" : "O"}`);
    }
  }, [squares, isXTurn]);
  return (
    <div className={styles.tictactoecontainer}>
      <div className="row">
        <Square value={squares[0]} onClick={() => handleOnClick(0)} />
        <Square value={squares[1]} onClick={() => handleOnClick(1)} />
        <Square value={squares[2]} onClick={() => handleOnClick(2)} />
      </div>
      <div className="row">
        <Square value={squares[3]} onClick={() => handleOnClick(3)} />
        <Square value={squares[4]} onClick={() => handleOnClick(4)} />
        <Square value={squares[5]} onClick={() => handleOnClick(5)} />
      </div>
      <div className="row">
        <Square value={squares[6]} onClick={() => handleOnClick(6)} />
        <Square value={squares[7]} onClick={() => handleOnClick(7)} />
        <Square value={squares[8]} onClick={() => handleOnClick(8)} />
      </div>
      <h2>{state}</h2>
      <button onClick={handleRestart}>Restart the Game</button>
    </div>
  );
};

export default TicTacToe;
