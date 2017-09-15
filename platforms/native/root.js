// @flow
import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import AppNavigator from './navigation/AppNavigator';

const Root = ({ dispatch, navigation }: Props) => {
  const nav = addNavigationHelpers({
    dispatch,
    state: navigation,
  });

  return <AppNavigator navigation={nav} />;
};

export default connect(state => ({
  navigation: state.navigation,
  isAuthenticated: state.auth.isAuthenticated,
  appStarted: state.app.started,
  appOnline: state.app.online,
}))(Root);
