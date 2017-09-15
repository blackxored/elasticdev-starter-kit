'use strict';

// Common
const config = { secret: process.env.FAUNADB_SECRET };

const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client(config);

const crypto = require('crypto');
const Promise = require('bluebird');

const log = require('../../helpers').log;

function hash() {
  return crypto.randomBytes(48).toString('hex');
}

/**
 * Creates OAuth State
 */
const createState = () => {
  const state = hash();
  return client
    .query(
      q.Create(q.Class('auth_cache'), {
        data: { token: state, type: 'STATE', expired: false },
      }),
    )
    .then(() => state);
};

/**
 * Revokes OAuth State
 * @param state
 */
const revokeState = state =>
  client
    .query(
      q.Let(
        { matched: q.Get(q.Match(q.Index('auth_cache'), state)) },
        q.If(
          q.And(
            q.Equals(q.Select(['data', 'expired'], q.Var('matched')), false),
            q.Equals(q.Select(['data', 'type'], q.Var('matched')), 'STATE'),
          ),
          q.Update(q.Select('ref', q.Var('matched')), {
            data: { expired: true },
          }),
          'expired',
        ),
      ),
    )
    .then(result => {
      log('revokeState', result);
      return state;
    });

/**
 * Creates and saves refresh token
 * @param user
 */
const saveRefreshToken = (user, payload) => {
  const token = hash();
  return client
    .query(
      q.Create(q.Class('auth_cache'), {
        data: {
          token,
          type: 'REFRESH',
          expired: false,
          userId: user,
          payload: payload || {},
        },
      }),
    )
    .then(() => token);
};

/**
 * Revokes old refresh token and creates new
 * @param oldToken
 */
const revokeRefreshToken = oldToken => {
  if (!oldToken.match(/[A-Fa-f0-9]{64}/)) {
    return Promise.reject('Invalid token');
  }
  const token = hash();
  return client
    .query(
      q.Let(
        { matched: q.Get(q.Match(q.Index('auth_cache'), oldToken)) },
        q.If(
          q.And(
            q.Equals(q.Select(['data', 'expired'], q.Var('matched')), false),
            q.Equals(q.Select(['data', 'type'], q.Var('matched')), 'REFRESH'),
          ),
          q.Update(q.Select('ref', q.Var('matched')), { data: { token } }),
          'expired',
        ),
      ),
    )
    .then(result => {
      log('revokeRefreshToken', result);
      return { id: result.data.userId, token, payload: result.data.payload };
    });
};

exports = module.exports = {
  createState,
  revokeState,
  saveRefreshToken,
  revokeRefreshToken,
};
