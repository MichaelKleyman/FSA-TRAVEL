import axios from "axios";

//ACTION TYPES
const CREATE_USER = "CREATE_USER";

//ACTION CREATORS
const _createUser = (user) => {
  return {
    type: CREATE_USER,
    user,
  };
};

//THUNK CREATORS
export const createUser = (user) => {
  return async (dispatch) => {
    const { data: created } = await axios.post('/auth/signup', user);
    dispatch(_createUser(created));
  };
};

const initialState = [];

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      return [...state, action.campus];
    default:
      return state;
  }
};

export default userReducer;
