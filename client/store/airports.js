import axios from "axios";

//ACTION TYPES
const GET_AIRPORT = 'GET_AIRPORT';

//ACTION CREATORS
const _getAirport = (airport) => ({type: GET_AIRPORT, airport})

//THUNK CREATORS

//REDUCER
const initialState = {}

const airportsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default airportsReducer;
