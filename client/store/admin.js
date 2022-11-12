import axios from 'axios';

//ACTION TYPE
const GET_ALL_USERS = 'GET_ALL_USERS';

//ACTION CREATOR
const _getAllUsers = (users) => ({ type: GET_ALL_USERS, users });

//THUNK
export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/users');
      dispatch(_getAllUsers(data));
    } catch (e) {
      console.error(e);
    }
  };
};

//REDUCER
const initialState = [];

function admin(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users;
    default:
      return state;
  }
}

export default admin;
