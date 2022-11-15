import axios from 'axios';

//ACTION TYPE
const GET_ALL_USERS = 'GET_ALL_USERS';
const DELETE_USER = 'DELETE_USER';

//ACTION CREATOR
const _getAllUsers = (users) => ({ type: GET_ALL_USERS, users });
const _deleteUser = (user) => ({ type: DELETE_USER, user });

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

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/users/${id}`);
      dispatch(_deleteUser(data));
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
    case DELETE_USER:
      return action.user;
    default:
      return state;
  }
}

export default admin;
