import React from 'react';

const Square = ({ value, history, stepNumber, xIsNext, handleClick, i }) =>
    <button className="square" onClick={() => {handleClick(history, stepNumber, xIsNext, i)}}>{value}</button>;

export const Board = ({ squares, handleClick, history, stepNumber, xIsNext }) => {
    const squareProps = {
        history,
        stepNumber,
        xIsNext,
        handleClick,
    };

    return (
        <div>
            {Array(3).fill(null).map((currentValue, index) =>
                <div className="board-row">
                    {Array(3).fill(null).map((sub_currentValue, sub_index) => {
                            const i = index * 3 + sub_index;
                            return <Square i={i} {...squareProps} value={squares[i]} />
                        }
                    )}
                </div>
            )}
        </div>
    );
};