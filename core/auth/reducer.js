// @flow
import type {
  Action,
  AuthState,
  AuthProviderName,
  Deps,
  LoginRequestAction,
  LoginFailureAction,
  LoginSuccessAction,
  LogoutAction,
} from '../types';
import { merge } from 'ramda';
import { Observable } from 'rxjs';
import { resetNavigation } from '../navigation/actions';

const LOGIN_REQUEST = 'esk/auth/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'esk/auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'esk/auth/LOGIN_FAILURE';
const AUTH_TOKENS_CHANGED = 'esk/auth/TOKENS_CHANGED';
const LOGOUT = 'esk/auth/LOGOUT';

export const initialState = {
  isAuthenticated: false,
  authorizationToken: null,
  refreshToken: null,
  errorMessage: '',
  authProvider: null,
  isFetching: false,
};

const reducer = (
  state: AuthState = initialState,
  action: Action,
): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return merge(state, {
        isFetching: true,
        authProvider: action.payload.provider,
      });
    }
    case LOGIN_SUCCESS: {
      return merge(state, {
        isAuthenticated: true,
        isFetching: false,
        authorizationToken: action.payload.authorizationToken,
        refreshToken: action.payload.refreshToken,
      });
    }
    case LOGIN_FAILURE: {
      return merge(state, {
        isAuthenticated: false,
        isFetching: false,
        errorMessage: action.payload.message,
        authorizationToken: null,
        refreshToken: null,
      });
    }
    case AUTH_TOKENS_CHANGED: {
      return merge(state, {
        authorizationToken: action.payload.authorizationToken,
        refreshToken: action.payload.refreshToken,
      });
    }
    case LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export function loginRequest(provider: AuthProviderName, providerData: mixed = {}): LoginRequestAction {
  return {
    type: LOGIN_REQUEST,
    payload: {
      provider,
      providerData,
    },
  };
}

type LoginSuccessParams = {
  authorizationToken: string,
  refreshToken: string,
  authProvider: AuthProviderName,
}

export function loginSuccess({
  authorizationToken,
  refreshToken,
  authProvider,
}: LoginSuccessParams): LoginSuccessAction {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      authorizationToken,
      refreshToken,
    },
    meta: {
      authProvider,
    },
  };
}

export function authTokensChanged(
  authorizationToken: ?string,
  refreshToken: ?string,
) {
  return {
    type: AUTH_TOKENS_CHANGED,
    payload: {
      authorizationToken,
      refreshToken,
    },
  };
}


export function loginFailure(err: Error): LoginFailureAction {
  return {
    type: LOGIN_FAILURE,
    payload: err,
    error: true,
  };
}

export function logout(): LogoutAction {
  return {
    type: LOGOUT,
  };
}

const logoutEpic = (action$: any) => action$
  .filter((action: Action) => action.type === LOGOUT)
  .mapTo(resetNavigation('login'));

export const epics = [logoutEpic];

export default reducer;
