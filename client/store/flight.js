import axios from "axios";

//ACTION TYPES
const ADD_FLIGHT = 'ADD_FLIGHTS';

//ACTION CREATORS
const _addFlight = (flight) => ({type: ADD_FLIGHT, flight})

//THUNK CREATORS

//REDUCER
const initialState = {}

const flightReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default flightReducer;
