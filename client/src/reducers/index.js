import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import article from './article';
import learning from './learning';

export default combineReducers({
  alert,
  auth,
  profile,
  article,
  learning,
});
