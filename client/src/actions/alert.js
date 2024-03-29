import { SET_ALERT, REMOVE_ALERT } from './types';
import { v4 as uuid } from 'uuid';

export const setAlert =
  (msg, alertType, timeout = 8500, scrollUp = true, alwaysVisible = false) =>
  (dispatch) => {
    const id = uuid();
    let path = window.location.pathname;
    if (alwaysVisible) {
      path = 'alwaysVisible';
    }
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id, path },
    });
    if (scrollUp) {
      window.scrollTo(0, 0);
    }

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

export const removeAlert = (id) => (dispatch) => {
  dispatch({ type: REMOVE_ALERT, payload: id });
};
