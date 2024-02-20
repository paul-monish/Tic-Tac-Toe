import GameOver from "./components/GameOver";
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import Players from "./components/Players"
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combination";

const INITIAL_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]
const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
}

function derivedActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}
function derivedWinner(gameBoard, player) {
  let winner;
  WINNING_COMBINATIONS.forEach(combination => {
    const firstSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSymbol && firstSymbol === secondSymbol
      && firstSymbol === thirdSymbol
    ) {
      winner = player[firstSymbol];
    }

  })
  return winner;
}

function derivedGameBoard(gameTurns) {
  /*
 *add to get access board and send board to GameBoard *component instead of sending gameTurns state,
 *change it for getting winning and drawn condition
 */
  let gameBoard = [...INITIAL_BOARD.map((initialArray) => [...initialArray])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  //
  return gameBoard;
}
function App() {
  // const [activeUser, setActiveUser] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);
  const [player, setPlayer] = useState(PLAYERS);
  const activePlayer = derivedActivePlayer(gameTurns);
  const gameBoard = derivedGameBoard(gameTurns);

  const winner = derivedWinner(gameBoard, player);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleActiveUser(rowIndex, colIndex) {
    // setActiveUser((activeUser) => activeUser == 'X' ? 'O' : 'X');

    setGameTurns((prevTurns) => {
      // let currentPlayer = 'X';
      // if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
      //   currentPlayer = 'O';
      // }
      let currentPlayer = derivedActivePlayer(prevTurns);

      const updateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updateTurns;
    });
  }

  function handleResetGame() {
    setGameTurns([]);
    setPlayer(PLAYERS);
  }
  function handleChangeName(symbol, name) {
    setPlayer(prevPlayer => {
      return {
        ...prevPlayer,
        [symbol]: name,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Players name={player.X} key={player.X} symbol='X' isActive={activePlayer === 'X'} onChangeName={handleChangeName} />
          <Players name={player.O} key={player.O} symbol='O' isActive={activePlayer === 'O'}
            onChangeName={handleChangeName} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onSelectRematch={handleResetGame} />}
        <GameBoard onSelect={handleActiveUser} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
