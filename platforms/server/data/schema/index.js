// @flow
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers/index';
import { Core } from './core.graphqls';

const typeDefs = [Core];

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
