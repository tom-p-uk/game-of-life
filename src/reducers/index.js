import { combineReducers } from 'redux';

import boardReducer from './board_reducer';

const rootReducer = combineReducers({
  board: boardReducer
});

export default rootReducer;
