import axios from 'axios';

//ACTION TYPE
const ADD_FLIGHT = 'ADD_FLIGHT';

//ACTION CREATOR
const _addFlight = (flight) => {
  return {
    type: ADD_FLIGHT,
    flight,
  };
};

//THUNK
export const addFlight = (flight) => {
  try {
    return async (dispatch) => {
      //console.log('STORE >>>', flight);
      const { data } = await axios.post('/api/flights', flight);
      console.log('ADD FLIGHT>>>', data);
      dispatch(_addFlight(data));
    };
  } catch (err) {
    throw new Error(err);
  }
};

const initialState = [];

//REDUCER
const addFlightReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FLIGHT:
      return [...state, action.flight];
    default:
      return state;
  }
};

export default addFlightReducer;
