'use strict';

const table = process.env.USERS_DB_NAME;

// Common
const AWS = require('aws-sdk');

const config = {
  region: AWS.config.region || process.env.REGION || 'eu-west-1',
};

if (process.env.LOCAL_DDB_ENDPOINT) {
  Object.assign(config, { endpoint: process.env.LOCAL_DDB_ENDPOINT });
}

const dynamodb = new AWS.DynamoDB.DocumentClient(config);

const saveUser = profile => {
  const params = {
    TableName: table,
    Item: profile,
  };
  return dynamodb.put(params).promise();
};

module.exports = {
  saveUser,
};
