import React from 'react';
import { storiesOf } from '@storybook/react';
import { Auth, Button, TextInput } from 'esk';

storiesOf('Auth / Register', module).add('default', () => (
  <Auth.Register>
    {registerProps => (
      <>
        <TextInput placeholder="Username" {...registerProps.usernameField} />
        <TextInput placeholder="Password" {...registerProps.passwordField} />
        <TextInput placeholder="Confirm Password" {...registerProps.passwordConfirmationField} />

        <Button {...registerProps.submitProps}>Register</Button>
      </>
    )}
  </Auth.Register>
));
