// @flow
// TODO: very big refactor needed
import React, { PureComponent } from 'react';
import { BackHandler, Linking, Platform } from 'react-native';
import {
  createNavigationContainer,
  createNavigator,
  NavigationActions,
  StackRouter,
} from 'react-navigation';
import NavigatorTypes from 'react-navigation/src/navigators/NavigatorTypes';
import CardStackTransitioner from 'react-navigation/src/views/CardStackTransitioner';

import type { NavigationRouteConfigMap } from 'react-navigation/src/TypeDefinition'; // $FlowFixMe
import { merge } from 'lodash';
import sharedElements from './transitioners/MaterialSharedElementTransitioner';
import crossFade from './transitioners/CrossFadeTransitioner';
import android from './transitioners/AndroidDefaultTransitioner';
import chooseBaby from './transitioners/ChooseBabyTransitioner';
import TabsNavigator from './TabsNavigator';

import SplashScreen from './SplashScreen';
import LoginScreen from '../login/LoginScreen';
import OauthScreen from '../login/OAuth';

export type TransitionName =
  | 'cardStack'
  | 'materialSharedElement'
  | 'crossFade'
  | 'androidDefault'
  | 'chooseBaby';

type State = {
  transition: TransitionName,
  duration: number,
};

// on Android, the URI prefix typically contains a host in addition to scheme
const uriPrefix = Platform.OS === 'android' ? 'esk://esk/' : 'esk://';

const routes = {};

class TransitionerSwitcher extends PureComponent {
  state: State;

  // For simplicity, we use context to pass these functions to children
  // We will be moving to having this managed on Redux
  static childContextTypes = {
    setActiveTransition: React.PropTypes.func,
    getActiveTransition: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      transition: 'cardStack',
      duration: 300,
    };
  }

  getChildContext() {
    const self = this;

    return {
      setActiveTransition(transition: TransitionName, callback) {
        return self.setState({ transition }, callback);
      },
      getActiveTransition(): TransitionName {
        return self.state.transition;
      },
    };
  }

  render() {
    const transitionMap = {
      cardStack: CardStackTransitioner,
      materialSharedElement: sharedElements,
      crossFade,
      androidDefault: android,
      chooseBaby,
    };

    const Transitioner = transitionMap[this.state.transition || 'cardStack'];

    return <Transitioner {...this.props} />;
  }
}

const createCustomNavigator = (
  routeConfigMap: NavigationRouteConfigMap,
  config,
) => {
  const {
    containerOptions,
    initialRouteName,
    initialRouteParams,
    paths,
    headerComponent,
    headerMode,
    mode,
    cardStyle,
    onTransitionStart,
    onTransitionEnd,
    navigationOptions,
  } = config;

  const routerConfig = {
    initialRouteName,
    initialRouteParams,
    paths,
    navigationOptions,
  };

  const router = StackRouter(routeConfigMap, routerConfig);
  const view = props => {
    return (
      <TransitionerSwitcher
        {...props}
        router={router}
        headerComponent={headerComponent}
        headerMode={headerMode}
        mode={mode}
        cardStyle={cardStyle}
        onTransitionStart={onTransitionStart}
        onTransitionEnd={onTransitionEnd}
      />
    );
  };

  view.displayName = 'AppNavigator';

  const navigator = createNavigator(
    router,
    routeConfigMap,
    config,
    NavigatorTypes.STACK,
  )(view);

  const container = createNavigationContainer(navigator, containerOptions);
  container.router = router;
  return container;
};

const AppNavigator = createCustomNavigator(
  {
    splash: { screen: SplashScreen },
    home: { screen: TabsNavigator },
    login: { screen: LoginScreen },
    oauth: { screen: OauthScreen, path: 'oauth' },
    ...routes,
  },
  {
    headerMode: 'float',
    // TODO: ensure child options get preserved
    navigationOptions: ({ navigationOptions }) => {
      return {
        headerBackTitle: 'Back',
        //headerTintColor: theme.colors.black,
        headerStyle: {
          //backgroundColor: theme.colors.white,
          ...navigationOptions.headerStyle,
        },
      };
    },
  },
);

// So that we can handle deep linking
// See: https://github.com/react-community/react-navigation/issues/1189
class AppNavigatorWithLinking extends AppNavigator {
  componentDidMount() {
    this.subs = BackHandler.addEventListener('hardwareBackPress', () =>
      this.dispatch(NavigationActions.back()),
    );

    Linking.addEventListener('url', ({ url }: { url: string }) => {
      this._handleOpenURL(url);
    });

    Linking.getInitialURL().then(
      (url: string) => url && this._handleOpenURL(url),
    );
  }

  _urlToPathAndParams(url: string) {
    const params = {};
    const delimiter = uriPrefix || '://';
    let path = url.split(delimiter)[1];
    if (!path) {
      path = url;
    }
    return {
      path,
      params,
    };
  }

  _handleOpenURL = (url: string) => {
    const parsedUrl = this._urlToPathAndParams(url);
    if (parsedUrl) {
      const { path, params } = parsedUrl;
      // Use router static set above
      const action = AppNavigator.router.getActionForPathAndParams(
        path,
        params,
      );
      const state = AppNavigator.router.getStateForAction(action);
      // TODO: handle case when opened URI is the current URI
      if (action) {
        // Use navigation from props
        this.props.navigation.dispatch(action);
      }
    }
  };
}

export default AppNavigatorWithLinking;
