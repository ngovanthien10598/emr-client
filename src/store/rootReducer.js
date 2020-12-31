import { combineReducers } from 'redux';
import authReducer from './reducers/auth.reducer';
import diseaseCategoryReducer from './reducers/disease-category.reducer';
import diseaseReducer from './reducers/disease.reducer';
import drugCategoryReducer from './reducers/drug-category.reducer';
import userReducer from './reducers/user.reducer';

const rootReducer = combineReducers({
  userState: userReducer,
  authState: authReducer,
  drugCategoryState: drugCategoryReducer,
  diseaseCategoryState: diseaseCategoryReducer,
  diseaseState: diseaseReducer
})

export default rootReducer;