// Action creators

export const recordStepNumber = (step) => {
    return { type: 'CHANGE_STEP_NUMBER', step }
};

export const toggleXIsNext = (value) => {
    return { type: 'TOGGLE_XISNEXT', value }
};

export const addHistory = (history) => {
    return { type: 'ADD_HISTORY', history }
};
