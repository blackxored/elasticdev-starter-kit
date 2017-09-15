'use strict';

const logger = require('log4js').getLogger();

const createResponseData = id => {
  // sets 15 seconds expiration time as an example
  const authorizationToken = {
    payload: {
      id,
    },
    options: {
      expiresIn: 15,
    },
  };

  return { authorizationToken };
};

const redirectProxyCallback = (context, data) => {
  context.succeed({
    statusCode: 302,
    headers: {
      Location: data.url,
    },
  });
};

const log = message => {
  logger.debug(message);
};

exports = module.exports = {
  createResponseData,
  redirectProxyCallback,
  log,
};
