/* eslint-disable fp/no-mutation,better/no-ifs,import/no-commonjs,fp/no-unused-expression */
// prettier-ignore
// Used from transform-define

const configMap = {};
const envVars = [
  'APP_NAME',
  'APP_VERSION',
  'API_URL',
  'AUTH_SERVICE_URL',
  'FACEBOOK_APP_ID',
];

envVars.forEach(key => {
  configMap[`process.env.${key}`] = process.env[key];
});

if (!configMap.APP_VERSION) {
  configMap['process.env.ESK_APP_VERSION'] = '0.1.0-HEAD';
}

module.exports = configMap;
