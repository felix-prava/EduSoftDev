import { combineReducers } from 'redux';
import alert from './alert';
import article from './article';
import auth from './auth';
import learning from './learning';
import profile from './profile';
import solution from './solution';

export default combineReducers({
  alert,
  article,
  auth,
  learning,
  profile,
  solution,
});
