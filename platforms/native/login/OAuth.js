// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { prop } from 'ramda';
import { loginSuccess } from '@esk/core/auth/reducer';

export class OAuth extends PureComponent {
  static navigationOptions = {
    headerVisible: false,
  };

  render() {
    return null;
  }
}

export default OAuth;
