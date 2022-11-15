import axios from 'axios';

//ACTION TYPES
const SET_CART = 'SET_CART';
const REMOVE_CART = 'REMOVE_CART';
const UPDATE_QTY = 'UPDATE_QTY';
const ADD_CART = 'ADD_CART';

//ACTION CREATORs
export const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};

export const _removeCart = (item) => {
  return {
    type: REMOVE_CART,
    item,
  };
};

export const _updateQuantity = (item) => {
  return {
    type: UPDATE_QTY,
    item,
  };
};

export const _addCart = (item) => {
  return {
    type: ADD_CART,
    item,
  };
};

//THUNK CREATORS
export const fetchCart = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/carts/${id}`);
      console.log('FETCH >>>>>', data);
      dispatch(setCart(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const removeCart = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete('/api/carts');
      console.log('REMOVE >>>>>', data);
      dispatch(_removeCart(data));
    } catch (err) {
      throw new Error(err);
    }
  };
};

export const updateQuantity = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put('/api/carts');
      console.log('UPDATE >>>>>', data);
      dispatch(_updateQuantity(data));
    } catch (err) {
      throw new Error(err);
    }
  };
};

export const addCart = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/carts');
      console.log('ADD >>>>>', data);
      dispatch(_addCart(data));
    } catch (err) {
      throw new Error(err);
    }
  };
};

const initialState = [];

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
const addCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      console.log('ACTION >>>>', action.cart);
      return action.cart;
    case REMOVE_CART:
      return state.filter((item) => item.id !== action.item.id);
    case UPDATE_QTY:
      return action.cart;
    case ADD_CART:
      return [...state, action.cart];
    default:
      return state;
  }
};

export default addCartReducer;
