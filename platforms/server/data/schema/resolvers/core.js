// @flow
import { memoize } from 'ramda';
import { GraphQLDate, GraphQLDateTime, GraphQLTime } from 'graphql-iso-date';
import { nodeFieldResolver, globalIdField } from './common';

const firstName = memoize(({ name }) => name.split(' ')[0]);
const lastName = memoize(({ name }) => name.split(' ')[1]);

export default {
  DateTime: GraphQLDateTime,
  Date: GraphQLDate,
  Time: GraphQLTime,
  Query: {
    viewer: () => ({}),
    node: nodeFieldResolver,
  },
  Viewer: {
    user: (_, __, { models: { User }, user }) => {
      if (!user) {
        return null;
      }

      return User.findById(user.userId);
    },
  },
  User: {
    id: globalIdField('User', user => user.userId),
    firstName,
    lastName,
    avatar: ({ picture }) => {
      if (picture) {
        return {
          url: picture,
          contentType: 'image/jpeg',
        };
      }
    },
  },
};
