import { configureApollo, configureApolloAuth } from '../configureData';
import { ApolloClient } from 'apollo-client';
import { compose, dissocPath, head, last } from 'ramda';
import configureMockStore from 'redux-mock-store';

const result = configureApollo();

describe('configureData', () => {
  it('returns an ApolloClient instance', () => {
    expect(result).toBeInstanceOf(ApolloClient);
  });

  it('memoizes the result', () => {
    expect(configureApollo()).toBe(result);
  });
});

describe('configureApolloAuth', () => {
  const store = configureMockStore([])({
    auth: {
      authorizationToken: 'AUTH_TOKEN',
      refreshToken: 'REFRESH_TOKEN',
    },
  });

  configureApolloAuth(store);

  it('setups middleware to add authorization and refresh tokens', () => {
    expect(result.networkInterface._middlewares.length).toEqual(1);
    expect(result.networkInterface._afterwares.length).toEqual(1);
  });

  it('adds authorization refresh tokens to every request', () => {
    const next = jest.fn();
    const middleware = result.networkInterface._middlewares[0].applyMiddleware;
    const request = { options: {} };

    middleware(request, next);

    expect(next).toHaveBeenCalled();
    expect(request.options.headers).toEqual({
      authorization: 'AUTH_TOKEN',
      'x-refresh-token': 'REFRESH_TOKEN',
    });
  });

  it('updates tokens if new ones are received in a response and dispatches AUTH_TOKENS_CHANGED', () => {
    const next = jest.fn();
    const afterware = result.networkInterface._afterwares[0].applyAfterware;
    const response = {
      headers: {
        authorization: 'NEW_AUTHORIZATION',
        'x-refresh-token': 'NEW_REFRESH_TOKEN',
        get(name) {
          return this[name];
        },
      },
    };

    afterware({ response }, next);

    const dispatchedAction = store.getActions()[0];

    expect(head(store.getActions())).toEqual({
      type: 'esk/auth/TOKENS_CHANGED',
      payload: {
        authorizationToken: 'NEW_AUTHORIZATION',
        refreshToken: 'NEW_REFRESH_TOKEN',
      },
    });

    afterware(
      {
        response: compose(
          dissocPath(['headers', 'x-refresh-token']),
          dissocPath(['headers', 'authorization']),
        )(response),
      },
      next,
    );

    expect(last(store.getActions())).toEqual({
      type: 'esk/auth/TOKENS_CHANGED',
      payload: {
        authorizationToken: null,
        refreshToken: null,
      },
    });
  });
});
