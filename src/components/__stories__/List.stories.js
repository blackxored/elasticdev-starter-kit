import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
// eslint-disable-next-line import/extensions,import/no-unresolved
import { gql, List, Text } from '../../index';

const friendsQuery = gql`
  query FriendsQuery($cursor: String) {
    viewer {
      friends(after: $cursor) {
        count
        edges {
          node {
            firstName
          }
        }
      }
    }
  }
`;

const I = x => x;

storiesOf('Components / List', module)
  .add('default', () => (
    <List items={['React', 'GraphQL']} keyExtractor={I}>
      {item => <Text>{item} rocks!</Text>}
    </List>
  ))
  .add('with query', () => (
    <List
      query={friendsQuery}
      connection="viewer.friends"
      header={({ count }) => <Text>You have {count} friends</Text>}
    >
      {friend => <Text>{friend.firstName}</Text>}
    </List>
  ));
