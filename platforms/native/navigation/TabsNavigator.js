// @flow
import type { NavigationOptions } from '@esk/core/types';
import React from 'react';
import type { TabBarConfig } from 'react-navigation';
import { TabNavigator } from 'react-navigation';
import { upperFirst } from 'lodash';
import ProfileScreen from '../profile/ProfileScreen';

const navigationOptions: NavigationOptions = ({
  navigation,
  navigationOptions: childOptions,
}) => ({
  title: upperFirst(navigation.state.key),
  headerMode: 'screen',
  headerVisible: true,
  headerStyle: {
    //backgroundColor: theme.colors.white,
    shadowOpacity: 0.1,
    ...childOptions.headerStyle,
  },
  //headerLeft: getTabHeaders(navigation.navigate).left,
  //headerRight: getTabHeaders(navigation.navigate).right,
  //tabBarIcon: ({ tintColor }: *) =>
  //  <NubabiIcon name={navigation.state.key} size={18} color={tintColor} />,
  tabBarLabel: upperFirst(navigation.state.routeName),
});

const TabsNavigator = TabNavigator(
  {
    profile: { screen: ProfileScreen },
  },
  {
    initialRouteName: 'profile',
    order: ['profile'],
    tabBarOptions: {
      style: {
        backgroundColor: '#fff',
        borderTopColor: '#e6e9f0',
        borderTopWidth: 1,
      },
      //activeTintColor: theme.colors.primary,
      //inactiveTintColor: theme.colors.gray,
    },
    navigationOptions,
  },
);

export default TabsNavigator;
