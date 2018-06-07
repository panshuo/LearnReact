import React from 'react';
import { recordStepNumber, toggleXIsNext, addHistory } from "./actions";
import { Board } from "./components"

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let line of lines) {
        const [a, b, c] = line;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null;
};

export const mapStateToProps = state => state;

export const mapDispatchToProps = dispatch => {
    return {
        jumpTo: step => {
            dispatch(recordStepNumber(step));
            dispatch(toggleXIsNext((step % 2) === 0));
        },

        handleClick: (history, stepNumber, xIsNext, i) => {
            const current = history[history.length - 1];
            const squares = current.squares.slice();
            if (calculateWinner(squares) || squares[i]) { return }
            squares[i] = xIsNext ? 'X' : 'O';
            dispatch(addHistory(history.slice().concat([{
                    squares: squares,
                    currentLocation: [(Math.floor(i / 3) + 1), (i % 3 + 1)],
                }])
            ));
            dispatch(toggleXIsNext(!xIsNext));
            dispatch(recordStepNumber(history.length));

        },
    }
};

export const Game = ({ history, stepNumber, xIsNext, jumpTo, handleClick }) => {
    let winner, status;
    const current = history[stepNumber];
    current ? winner = calculateWinner(current.squares) : winner = null;
    winner ? status = '胜利者是: ' + winner : status = '下一个玩家: ' + (xIsNext ? 'X' : 'O');

    const moves = history.map((step, move) => {
        const location = history[move].currentLocation;
        const desc = move && location ?
            `回到第${move}步，位置为第${location[0]}行第${location[1]}列。` :
            '回到开始';
        return (<li key={move}><button onClick={() => jumpTo(move)}>{desc}</button></li>)
    });

    const boardProps = {
        history,
        stepNumber,
        xIsNext,
        handleClick,
    };
    return (
        <div className="game">
            <div className="game-board">
                <Board {...boardProps} squares={current.squares} />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
};
