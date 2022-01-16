import { applyMiddleware, combineReducers, createStore } from "redux"
import todoReducer from "../reducer/post-reducer"
import thunkMiddleware from 'redux-thunk'

let reducers = combineReducers({
    todos: todoReducer,
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

window.store = store;

export default store;