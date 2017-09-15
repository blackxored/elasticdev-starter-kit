// @flow
import R from 'ramda';
import type { connectionArgs } from 'graphql-relay';
import {
  connectionFromArray,
  connectionFromPromisedArray,
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
  toGlobalId,
} from 'graphql-relay';

export type GraphQLContext = {
  token: string,
  models: Object, // TODO
  user: ?mixed,
  connectors: {
    faunadb: typeof faunadb,
  },
};

export type ConnectionArguments = connectionArgs;

export const mutationWithClientMutationId = (mutateAndGetPayload: Function) => (
  _,
  { input },
  ctx,
  info,
) =>
  Promise.resolve(mutateAndGetPayload(input, ctx, info)).then(payload => {
    payload.clientMutationId = input.clientMutationId; // eslint-disable-line no-param-reassign
    return payload;
  });

const {
  nodeField,
} = nodeDefinitions((globalId, { token, connectors: { firebase } }) => {
  const { type, id } = fromGlobalId(globalId);
  switch (type) {
    // TODO
    default: {
      return null;
    }
  }
});

export const nodeFieldResolver = nodeField.resolve;

export const prop = (propName: string) =>
  R.curry(obj => R.propOr(null, propName, obj));

export const transform = (
  propName: string,
  transformFn: string => any,
) => (obj: any) => {
  const value = prop(propName)(obj);

  return value ? transformFn(value) : null;
};

export const connectionFromPromisedArrayWithCount = (promise: Promise<*>, args: ConnectionArguments) =>
  promise.then(data => {
    const count = R.pathOr(data.length, ['meta', 'total'], data);
    const connection = connectionFromArray(data.data ? data.data : data, args);

    return R.assocPath(['count'], count, connection);
  });

export const getPaginationArguments = (args: ConnectionArguments) => {
  const { after, before, first, last } = args;
  const paginationArguments = {};

  if (first && last) {
    throw new Error(
      'Connection arguments first and last cannot be used together',
    );
  }

  if (typeof first === 'number') {
    if (first < 0) {
      throw new Error('Argument "first" must be a non-negative integer');
    }

    paginationArguments.first = first;
  }

  if (typeof last === 'number') {
    if (last < 0) {
      throw new Error('Argument "last" must be a non-negative integer');
    }

    paginationArguments.last = last;
  }

  if (typeof after !== 'undefined') {
    paginationArguments.after = after;
  }

  if (typeof before !== 'undefined') {
    paginationArguments.before = before;
  }

  return paginationArguments;
};

export const toDate = R.constructN(1, Date);
export const toTimestamp = R.invoker(0, 'getTime');
export const sortByTimestamp = R.sortBy(R.prop('createdAt'));

export {
  fromGlobalId,
  globalIdField,
  toGlobalId,
  connectionFromPromisedArray,
  connectionFromArray,
};
