'use strict';

const userClassName = process.env.USERS_CLASS_NAME || 'users'; // should be shared with content app
const config = { secret: process.env.FAUNADB_SECRET };

const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client(config);

const saveUser = profile => {
  // profile class: https://github.com/laardee/serverless-authentication/blob/master/src/profile.js
  if (!(profile && profile.userId)) {
    return Promise.reject('Invalid profile');
  }
  return client
    .query(
      q.Let(
        { matchRef: q.Match(q.Index('auth_userId'), profile.userId) },
        q.If(
          q.Exists(q.Var('matchRef')),
          q.Update(q.Select('ref', q.Get(q.Var('matchRef'))), {
            data: profile,
          }),
          q.Create(q.Class(userClassName), { data: profile }),
        ),
      ),
    )
    .then(result =>
      client
        .query(q.Create(q.Ref('tokens'), { instance: result.ref }))
        .then(key => ({ faunadb: key.secret })),
    );
};

// call this with `serverless invoke -f schema` before anything else
const setupSchema = () =>
  client
    .query(q.CreateClass({ name: 'auth_cache' }))
    .then(() =>
      client.query(
        q.Create(q.Ref('indexes'), {
          name: 'auth_cache',
          source: q.Class('auth_cache'),
          terms: [{ field: ['data', 'token'] }],
          unique: true,
        }),
      ),
    )
    .then(() => client.query(q.CreateClass({ name: userClassName })))
    .then(() =>
      client.query(
        q.Create(q.Ref('indexes'), {
          name: 'auth_userId',
          source: q.Class(userClassName),
          terms: [{ field: ['data', 'userId'] }],
          unique: true,
        }),
      ),
    )
    .then(() =>
      client.query(
        q.Create(q.Ref('indexes'), {
          // this index is optional but useful in development for browsing users
          name: `all_${userClassName}`,
          source: q.Class(userClassName),
        }),
      ),
    );

const setupSchemaHandler = (event, callback) =>
  setupSchema()
    .then(result => callback(null, result))
    .catch(error => callback(new Error(JSON.stringify(error))));

module.exports = {
  saveUser,
  setupSchemaHandler,
};
