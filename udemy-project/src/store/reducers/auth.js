import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utility';
import { auth } from '../actions';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
};

const authStart = (state, action) => {
  return updatedObject(state, { error: null, loading: true });
};

// in a success case, you want to set auth/token everything
const authSuccess = (state, action) => {
  return updatedObject( state, { 
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false
  });
};

const authFail = (state, action) => {
  return updatedObject(state, {
    error: action.error,
    loading: false
  });
}

const authLogout = (state, action) => {
  return updatedObject(state, { token: null, userId: null});
}

const setAuthRedirectPath = (state, action ) => {
  return updatedObject(state, { authRedirectPath: action.path });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:  authStart(state, action);

    case actionTypes.AUTH_SUCCESS: authSuccess(state, action);

    case actionTypes.AUTH_FAIL: authFail(state, action);

    case actionTypes.AUTH_LOGOUT: authLogout(state, action);

    case actionTypes.SET_AUTH_REDIRECT_PATH: setAuthRedirectPath(state, action);
    
    default: 
      return state;
  }
}

export default reducer;