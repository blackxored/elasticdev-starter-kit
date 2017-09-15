// @flow
/* eslint-disable fp/no-nil,fp/no-let,better/no-ifs,better/no-new,fp/no-mutation,fp/no-unused-expression */
import type { Action, State } from './types';
import type { Store } from 'redux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import config from './config';
import { authTokensChanged } from './auth/reducer';

let client = null; // singleton
const networkInterface = createNetworkInterface({
  uri: config.apiUrl,
});

export const configureApollo = () => {
  if (!client) {
    client = new ApolloClient({
      networkInterface,
      dataIdFromObject: obj => obj.id,
      /* TODO
      fragmentMatcher: new IntrospectionFragmentMatcher({
        introspectionQueryResultData: require('../server/graphql/introspection.json')
          .data,
      }),
      */
    });
  }

  return client;
};

export const configureApolloAuth = (store: Store<Action, State>) => {
  networkInterface.use([
    {
      applyMiddleware(req, next) {
        if (!req.options.headers) {
          req.options.headers = {};
        }

        const { auth: { authorizationToken, refreshToken } } = store.getState();
        req.options.headers.authorization = authorizationToken || null;
        req.options.headers['x-refresh-token'] = refreshToken || null;
        next();
      },
    },
  ]);

  networkInterface.useAfter([
    {
      applyAfterware({ response: { headers } }, next) {
        const token = headers.get('authorization') || null;
        const refreshToken = headers.get('x-refresh-token') || null;
        store.dispatch(authTokensChanged(token, refreshToken));
        next();
      },
    },
  ]);
};
