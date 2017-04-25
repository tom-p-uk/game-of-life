import * as types from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_BOARD_ARRAY:
      return { ...state,  boardArr: action.payload };

    default:
      return state;
  }
};
