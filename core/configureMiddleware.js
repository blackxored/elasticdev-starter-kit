// @flow
import type { Deps } from './types';
import { createLogger } from 'redux-logger';
import isClient from './device/isClient';
import configureDeps from './configureDeps';
import configureEpics from './configureEpics';
import { createEpicMiddleware } from 'redux-observable';
import isReactNative from './device/isReactNative';
import { configureApollo } from './configureData';

// Like redux-thunk, but with just one argument for dependencies.
export const injectMiddleware = (deps: Deps) => ({
  dispatch,
  getState,
}: any) => (next: any) => (action: any) =>
  next(
    typeof action === 'function'
      ? action({ ...deps, dispatch, getState })
      : action,
  );

const configureMiddleware = (
  initialState: any,
  platformDeps: any,
  platformMiddleware: any,
  platformEpics: any,
) => {
  const deps = configureDeps(initialState, platformDeps);
  const rootEpic = configureEpics(deps, platformEpics);
  const epicMiddleware = createEpicMiddleware(rootEpic);
  const apolloMiddleware = configureApollo().middleware();

  const middleware = [
    injectMiddleware(deps),
    epicMiddleware,
    apolloMiddleware,
    ...platformMiddleware,
  ];

  const enableLogger = process.env.NODE_ENV !== 'production' && isClient;

  // Logger must be the last middleware in chain.
  if (enableLogger) {
    const logger = createLogger({
      collapsed: true,
      predicate: (getState, action) => {
        return action.type !== 'NAVIGATION_RESET';
      },
    });
    middleware.push(logger);
  }
  /* eslint-disable no-shadow */
  if (module.hot && typeof module.hot.accept === 'function') {
    if (isReactNative) {
      module.hot.accept(() => {
        const configureEpics = require('./configureEpics').default;

        epicMiddleware.replaceEpic(configureEpics(deps, platformEpics));
      });
    } else {
      module.hot.accept('./configureEpics', () => {
        const configureEpics = require('./configureEpics').default;

        epicMiddleware.replaceEpic(configureEpics(deps, platformEpics));
      });
    }
  }
  /* eslint-enable no-shadow */

  return middleware;
};

export default configureMiddleware;
