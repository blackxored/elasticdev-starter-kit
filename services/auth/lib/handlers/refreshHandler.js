'use strict';

// Config
const slsAuth = require('serverless-authentication');

const config = slsAuth.config;
const utils = slsAuth.utils;

// Common
const cache = require('../storage/cacheStorage');
const helpers = require('../helpers');

const createResponseData = helpers.createResponseData;

/**
 * Refresh Handler
 * @param event
 * @param callback
 */
function refreshHandler(event, callback) {
  const refreshToken = event.refresh_token;
  // user refresh token to get userid & provider from cache table
  cache
    .revokeRefreshToken(refreshToken)
    .then(results => {
      const providerConfig = config({ provider: '', stage: event.stage });
      const id = results.id;
      const data = Object.assign(createResponseData(id, providerConfig), {
        refreshToken: results.token,
      });
      if (typeof results.payload === 'object') {
        data.authorizationToken.payload = Object.assign(
          data.authorizationToken.payload,
          results.payload,
        );
      }
      const authorization_token = utils.createToken(
        data.authorizationToken.payload,
        providerConfig.token_secret,
        data.authorizationToken.options,
      );
      callback(null, {
        authorization_token,
        refresh_token: data.refreshToken,
        id,
      });
    })
    .catch(error => callback(JSON.stringify(error)));
}

exports = module.exports = refreshHandler;
