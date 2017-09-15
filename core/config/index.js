// @flow
const config = {
  appName: process.env.APP_NAME || 'app',
  appVersion: process.env.APP_VERSION,
  apiUrl: process.env.API_URL,
  authServiceUrl: process.env.AUTH_SERVICE_URL,
  facebookAppId: process.env.FACEBOOK_APP_ID,
  sentryUrl: process.env.SENTRY_URL,
};

export default config;
