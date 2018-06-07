import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { connect, Provider } from 'react-redux'
import { history, stepNumber, xIsNext } from './reducers'
import { mapDispatchToProps, mapStateToProps, Game } from "./containers";
import './index.css';

// root reducer
const gameAppRootReducer = combineReducers({ history, stepNumber, xIsNext });
// create store
let store = createStore(gameAppRootReducer);
const App = connect(mapStateToProps, mapDispatchToProps)(Game);
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
