// Reducers
import {ADD_HISTORY, RECORD_STEP_NUMBER, TOGGLE_XISNEXT} from "./actions";

export const history = (state=[], action) => {
    switch (action.type) {
        case ADD_HISTORY:
            return Object.assign({}, state, {
                history: [...state.history,
                    {currentLocation: action.currentLocation, squares: action.squares}
                ]
            });
        default:
            return state;
    }
};

export const stepNumber = (state=0, action) => {
    switch (action.type) {
        case RECORD_STEP_NUMBER:
            return action.step;
        default:
            return state;
    }
};

export const xIsNext = (state=true, action) => {
    switch (action.type) {
        case TOGGLE_XISNEXT:
            return action.value;
        default:
            return state;
    }
};