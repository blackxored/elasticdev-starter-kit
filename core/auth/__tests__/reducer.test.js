/* eslint-disable fp/no-unused-expression,fp/no-nil,better/no-new,better/explicit-return */
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import reducer, {
  authTokensChanged,
  epics,
  initialState,
  loginFailure,
  loginRequest,
  loginSuccess,
  logout,
} from '../reducer';

const createMockStoreWithEpic = (epic) => {
  const epicMiddleware = createEpicMiddleware(epic);
  const mockStore = configureMockStore([epicMiddleware]);
  return mockStore();
};

describe('auth reducer', () => {
  it('has an initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toMatchSnapshot();
  });

  it('handles LOGIN_REQUEST', () => {
    expect(reducer(initialState, loginRequest('facebook'))).toMatchSnapshot();
  });

  it('handles LOGIN_SUCCESS', () => {
    expect(
      reducer(
        initialState,
        loginSuccess({
          authProvider: 'facebook',
          authorizationToken: 'AUTH_TOKEN',
          refreshToken: 'REFRESH_TOKEN',
        }),
      ),
    ).toMatchSnapshot();
  });

  it('handles LOGIN_FAILURE', () => {
    expect(
      reducer(initialState, loginFailure(new Error('some error'))),
    ).toMatchSnapshot();
  });

  it('handles LOGOUT', () => {
    expect(reducer(initialState, logout())).toMatchSnapshot();
  });

  it('handles AUTH_TOKENS_REFRESHED', () => {
    expect(
      reducer(initialState, authTokensChanged('AUTH_TOKEN', 'REFRESH_TOKEN')),
    ).toMatchSnapshot();
  });
});

describe('auth epics', () => {
  describe('logoutEpic', () => {
    it('resets navigation to login on logout', () => {
      const store = createMockStoreWithEpic(epics[0]);
      store.dispatch(logout());
      expect(store.getActions()).toEqual([
        {
          type: 'esk/auth/LOGOUT',
        },
        {
          type: 'esk/navigation/RESET',
          payload: {
            routeName: 'login',
            index: 0,
          },
        },
      ]);
    });
  });
});

