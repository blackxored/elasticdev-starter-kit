'use strict';

const AWS = require('aws-sdk');

const log = require('../../helpers').log;

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

const getUserAttributes = profile => {
  const attributes = [
    'address',
    'birthdate',
    'email',
    'family_name',
    'gender',
    'given_name',
    'locale',
    'middle_name',
    'name',
    'nickname',
    'phone_number',
    'picture',
    'preferred_username',
    'profile',
    'timezone',
    'website',
  ];

  return attributes.reduce((result, key) => {
    if (Object.prototype.hasOwnProperty.call(profile, key)) {
      result.push({ Name: key, Value: profile[key] });
    }
    return result;
  }, []);
};

const saveUser = profile => {
  log('save user', profile.id);
  const params = {
    UserPoolId: process.env.USER_POOL_ID,
    Username: profile.userId,
    DesiredDeliveryMediums: ['EMAIL'],
    ForceAliasCreation: false,
    MessageAction: 'SUPPRESS',
    TemporaryPassword: 'tempPassword1!',
    UserAttributes: getUserAttributes(profile),
  };

  return cognitoIdentityServiceProvider.adminCreateUser(params).promise();
};

const updateUser = profile => {
  log('update user', profile.id);
  const params = {
    UserAttributes: getUserAttributes(profile),
    UserPoolId: process.env.USER_POOL_ID,
    Username: profile.userId,
  };

  return cognitoIdentityServiceProvider
    .adminUpdateUserAttributes(params)
    .promise();
};

const saveOrUpdateUser = profile => {
  const params = {
    UserPoolId: process.env.USER_POOL_ID,
    Username: profile.userId,
  };

  return cognitoIdentityServiceProvider
    .adminGetUser(params)
    .promise()
    .then(() => updateUser(profile))
    .catch(error => {
      if (error.code === 'UserNotFoundException') {
        return saveUser(profile);
      }
      throw error;
    });
};

module.exports = {
  saveOrUpdateUser,
  saveUser,
  updateUser,
};
