// @flow
import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text, Linking } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'ramda';
import { Screen } from '../components';

type Props = {
  authServiceUrl: string,
};
export class LoginScreen extends PureComponent {
  props: Props;

  static navigationOptions = {
    headerVisible: false,
  };

  handleOAuth = () => {
    Linking.openURL(`${this.props.authServiceUrl}/signin/facebook`);
  };

  render() {
    return (
      <Screen>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <TouchableOpacity onPress={this.handleOAuth}>
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  }
}

export default compose(
  connect((state: State) => ({
    authServiceUrl: state.config.authServiceUrl,
  })),
)(LoginScreen);
