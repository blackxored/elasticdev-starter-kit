// @flow
import React, { PureComponent } from 'react';
import { Screen } from '../components';
import Profile from './Profile';

const ProfileScreen = () => (
  <Screen>
    <Profile />
  </Screen>
);

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

export default ProfileScreen;
