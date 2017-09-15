// @flow
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { compose } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { logout } from '@esk/core/auth/reducer';

type Props = {
  firstName: string,
  lastName: string,
  email: string,
  avatar?: Avatar,
};

export const Profile = ({
  firstName,
  lastName,
  email,
  avatar,
  logout,
}: Props) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default compose(
  connect(null, {
    logout,
  }),
  graphql(
    gql`
      query Profile {
        viewer {
          user {
            id
            firstName
            lastName
            email
            avatar {
              url
            }
          }
        }
      }
    `,
    {
      options: {
        fetchPolicy: 'network-only',
      },
    },
  ),
)(Profile);
