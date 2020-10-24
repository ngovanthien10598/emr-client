import { combineReducers } from 'redux';
import userReducer from './reducers/user.reducer';

const rootReducer = combineReducers({
  userState: userReducer
})

export default rootReducer;