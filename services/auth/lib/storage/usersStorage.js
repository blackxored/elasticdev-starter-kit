'use strict';

// Common
const Promise = require('bluebird');

//const cognitoUser = require('./cognito/cognitoUser');
//const dynamoUser = require('./dynamo/dynamoUser');
const faunaUser = require('./fauna/faunaUser');

const saveUser = profile => {
  if (!profile) {
    return Promise.reject('Invalid profile');
  }
  // Here you can save the profile to DynamoDB,
  // FaunaDB, AWS Cognito or where ever you wish,
  // just remove or replace unnecessary code
  // profile class: https://github.com/laardee/serverless-authentication/blob/master/src/profile.js

  // to enable FaunaDB as a user database enable
  return faunaUser.saveUser(profile);

  // to use dynamo as user database enable
  // return dynamoUser.saveUser(profile);

  // to use cognito user pool as user database enable
  // return cognitoUser.saveOrUpdateUser(profile);

  // return Promise.resolve(true);
};

exports = module.exports = {
  saveUser,
};
