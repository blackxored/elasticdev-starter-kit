// @flow
import type { State } from '@esk/core/types';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { compose } from 'ramda';
import { NavigationActions } from 'react-navigation';

const loadingImage = { uri: 'LaunchImage' };

type Props = {
  appOnline: boolean,
  appStarted: boolean,
  navigation: any,
  isAuthenticated: boolean,
  loadingMessage: ?string,
  author: ?string,
  baby: ?Baby,
  babies: ?Array<BabyEdge>,
};

class SplashScreen extends Component {
  props: Props;

  static navigationOptions = {
    headerVisible: false,
  };

  shouldComponentUpdate(nextProps) {
    if (
      typeof this.props.loadingMessage === 'undefined' &&
      nextProps.loadingMessage
    ) {
      return true;
    }

    return nextProps.appStarted !== this.props.appStarted;
  }

  componentDidUpdate() {
    setTimeout(this.handleNextScreen, 2000);
  }

  handleNextScreen = () => {
    const { appStarted, isAuthenticated } = this.props;

    if (!appStarted) {
      return;
    }

    if (isAuthenticated) {
      this.navigateTo('home');
    } else {
      this.navigateTo('login');
    }
  };

  navigateTo = (routeName: string) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })],
      meta: {
        splash: true,
      },
    });

    return this.props.navigation.dispatch(resetAction);
  };

  renderLoadingMessage() {
    if (!this.props.appStarted) {
      return <View style={styles.loadingMessageContainer} />;
    }

    const loadingMessage = 'Loading...';

    return (
      <View style={styles.loadingMessageContainer}>
        <Animatable.Text style={styles.loadingMessage} animation="fadeIn">
          <Text>{loadingMessage} </Text>
        </Animatable.Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={loadingImage}
          resizeMode="stretch"
          style={styles.textContainer}
        >
          {this.renderLoadingMessage()}
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: theme.colors.primary,
    flex: 1,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingMessageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 40,
  },
  loadingMessage: {
    width: 274, // TODO: I don't like this
    marginVertical: 20,
    marginHorizontal: 5,
    color: '#F8F9FC',
    textAlign: 'center',
    fontSize: 17,
    lineHeight: 22,
  },
  quoteDimensions: {
    width: 7,
    height: 11.45,
    zIndex: 999,
  },
});

export default compose(
  connect((state: State) => ({
    appOnline: state.app.online,
    appStarted: state.app.started,
    isAuthenticated: state.auth.isAuthenticated,
  })),
)(SplashScreen);
