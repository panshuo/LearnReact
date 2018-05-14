import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { history, stepNumber, xIsNext } from './reducers'
import { recordStepNumber, toggleXIsNext } from './actions'
import './index.css';

// store initial state
// const initialState = { history: [], stepNumber: 0, xIsNext: true, };
// const initialHistory = [{currentLocation: null, squares: Array(9).fill(null), }, ];
const gameApp = combineReducers({ history, stepNumber, xIsNext });
let store = createStore(gameApp);

console.log(store.getState());
const unsubscribe = store.subscribe(() => console.log(store.getState()));
store.dispatch(recordStepNumber(1));
store.dispatch(toggleXIsNext(false));

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
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { return squares[a] }
    }
    return null;
};

const Square = (props) => <button className="square" onClick={props.onClick}>{props.value}</button>;

const Board = (props) => {
    const renderSquare = i => {
        return <Square
            value={props.squares[i]}
            onClick={() => props.onClick(i)}
        />;
    };

    return (
        <div>
            {Array(3).fill(null).map((currentValue, index) =>
                <div className="board-row">
                    {Array(3).fill(null).map((sub_currentValue, sub_index) =>
                        renderSquare(index * 3 + sub_index)
                    )}
                </div>
            )}
        </div>
    );
};

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                currentLocation: null,
            }],
            xIsNext: true,
            stepNumber: 0,
        };
    }

    jumpTo(step) { this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) { return }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                currentLocation: [(Math.floor(i / 3) + 1), (i % 3 + 1)],
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
        });
    };

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const location = this.state.history[move].currentLocation;
            const desc = move && location ?
                `回到第${move}步，位置为第${location[0]}行第${location[1]}列。` :
                '回到开始';
            return (<li key={move}><button onClick={() => this.jumpTo(move)}>{desc}</button></li>)
        });

        let status;
        winner ? status = '胜利者是: ' + winner : status = '下一个玩家: ' + (this.state.xIsNext ? 'X' : 'O');

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Game />, document.getElementById('root'));