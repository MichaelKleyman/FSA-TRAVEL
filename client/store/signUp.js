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
    try {
      const { data: created } = await axios.post("/auth/signUp", user);
      dispatch(_createUser(created));
    } catch (e) {
      console.error("My Error: ", e);
    }
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
