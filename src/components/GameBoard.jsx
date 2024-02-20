// let board = [
//     [null,null,null],
//     [null,null,null],
//     [null,null,null]
// ]
export default function GameBoard({ onSelect, board }) {
    // let gameBoard = board;
    // for (const turn of turns) {
    //     const {square,player} = turn;
    //     const { row, col } = square;
    //     gameBoard[row][col] = player;
    // }

    // let [gameBoard, setGameBoard] = useState(board);
    // function handleGameBoard(rowIndex,colIndex){
    //     setGameBoard((prevGameBoard) => {
    //         const updateGameBoard = [...prevGameBoard.map((initialArray) => [...initialArray])];
    //         updateGameBoard[rowIndex][colIndex] = activeUser;
    //         return updateGameBoard;
    //     })
    //     onSelect()
    // }
    return (
        <ol id='game-board'>
            {
                board.map((row, rowIndex) => (
                    <li key={rowIndex}>
                        <ol>{row.map((col, colIndex) =>
                            <li key={colIndex}>
                                <button onClick={()=>onSelect(rowIndex,colIndex)} disabled={col ?? false}>{col}</button>
                            </li>)}
                        </ol>
                    </li>
                ))
            }
        </ol>    
    )
}