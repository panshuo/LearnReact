// Action Types
export const TOGGLE_XISNEXT = 'TOGGLE_XISNEXT';
export const RECORD_STEP_NUMBER = 'RECORD_STEP_NUMBER';
export const ADD_HISTORY = 'ADD_HISTORY';
//export const JUMP_TO = 'JUMP_TO';

export const recordStepNumber = (step) => {
    return { type: RECORD_STEP_NUMBER, step }
};

export const toggleXIsNext = (value) => {
    return { type: TOGGLE_XISNEXT, value }
};
