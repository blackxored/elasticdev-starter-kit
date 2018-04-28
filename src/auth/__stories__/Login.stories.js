import React from 'react';
import { storiesOf } from '@storybook/react';
import { Auth, Button, TextInput, CheckBox } from '../../index';

storiesOf('Auth / Login', module).add('default', () => (
  <Auth.Login>
    {loginProps => (
      <>
        <TextInput placeholder="username" {...loginProps.usernameField} />
        <TextInput placeholder="password" {...loginProps.passwordField} />

        <CheckBox label="Remember me" />

        <Button {...loginProps.submitProps} />
      </>
    )}
  </Auth.Login>
));
