// Reducers
const initialHistory = [{currentLocation: null, squares: Array(9).fill(null), }, ];

export const history = (state=initialHistory, action) => {
    switch (action.type) {
        case 'ADD_HISTORY':
            return action.history;
        default:
            return state;
    }
};

export const stepNumber = (state=0, action) => {
    switch (action.type) {
        case 'CHANGE_STEP_NUMBER':
            return action.step;
        default:
            return state;
    }
};

export const xIsNext = (state=true, action) => {
    switch (action.type) {
        case 'TOGGLE_XISNEXT':
            return action.value;
        default:
            return state;
    }
};
