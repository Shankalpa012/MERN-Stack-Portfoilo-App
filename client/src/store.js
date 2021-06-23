//this is for creating a global store foe  redux
import {  createStore, applyMiddleware  } from "redux";

//this is for the redux dev tools
import {  composeWithDevTools  } from "redux-devtools-extension";
//thunk helps to perform asynchornos actions fom the reducers
import thunk from "redux-thunk";
//this is creating a root reducers becouse we can have multiples reducers and we have too copine all then to single reducer to store
import rootReducer from "./reducer"


//initilizating the initial state 
const initialState = {}

//creatng our middler ware

const middlerware = [thunk]

//creating global store

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middlerware)))


export default store;

