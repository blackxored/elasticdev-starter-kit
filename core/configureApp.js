// @flow
import { pipe, tap } from 'ramda';
import { persistStore } from 'redux-persist';
import config from './config';
import { appStarted, epics as appEpics } from './app/reducer';
import configureStore from './configureStore';
import configureStorage from './configureStorage';
import configureReporting from './configureReporting';
import { configureApollo } from './configureData';

type AppOptions = {
  platformReducers?: any,
  platformDeps: any,
  platformMiddleware?: any,
  platformEpics?: any,
};

export const configureApp = (options: AppOptions) => {
  const {
    platformDeps: { Raven, storage, ...platformDeps },
    platformReducers = {},
    platformMiddleware = [],
    platformEpics = [],
  } = options;

  return pipe(
    () =>
      configureReporting({
        sentryUrl: config.sentryUrl,
        appVersion: config.appVersion,
        Raven,
      }),
    reportingMiddleware =>
      configureStore({
        initialState: {
          config,
        },
        platformDeps,
        platformReducers,
        platformMiddleware: [reportingMiddleware, ...platformMiddleware],
        platformEpics: [...appEpics, ...platformEpics],
      }),
    tap(store =>
      persistStore(
        store,
        {
          ...configureStorage(config.appName),
          storage,
        },
        () => store.dispatch(appStarted()),
      ),
    ),
    store => ({ store, apollo: configureApollo() }),
  )();
};

export default configureApp;
