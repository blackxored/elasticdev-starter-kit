// @flow
import React from 'react';
import { AsyncStorage } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import Raven from 'raven-js';
import RavenReactNativePlugin from 'raven-js/plugins/react-native';
import { configureApp } from '@esk/core';
import navigation, { epics as navigationEpics } from './navigation/reducer';
import { epics as authEpics } from './auth/actions';
import device, { epics as deviceEpics } from './device/reducer';
import Root from './root';

const { store, apollo } = configureApp({
  platformDeps: {
    Raven: Raven.addPlugin(RavenReactNativePlugin),
    storage: AsyncStorage,
  },
  platformReducers: {
    navigation,
    device,
  },
  platformEpics: [...authEpics, ...navigationEpics, ...deviceEpics],
});

export const Main = () => (
  <ApolloProvider store={store} client={apollo}>
    <Root />
  </ApolloProvider>
);

export default Main;
