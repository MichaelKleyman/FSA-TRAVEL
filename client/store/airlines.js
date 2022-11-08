import axios from "axios";

//ACTION TYPES
const GET_AIRLINE = 'GET_AIRLINE';

//ACTION CREATORS
const _getAirline = (airline) => ({type: GET_AIRLINE, airline})

//THUNK CREATORS

//REDUCER
const initialState = {}

const airlinesReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default airlinesReducer;
