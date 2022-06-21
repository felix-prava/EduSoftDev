import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import article from './article';

export default combineReducers({
  alert,
  auth,
  profile,
  article,
});
