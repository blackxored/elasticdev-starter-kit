// @flow
import { map, memoize } from 'ramda';
import User from './user';

const models = {
  User: User,
};

const makeModels = memoize(connectors => {
  return map(value => new value(connectors.faunadb), models);
});

export default makeModels;
