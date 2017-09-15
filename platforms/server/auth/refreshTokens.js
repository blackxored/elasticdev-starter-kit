// @flow
import jwt from 'jsonwebtoken';
import axios from 'axios';

// TODO: use from env
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;

function refresh(refreshToken: string) {
  return axios
    .get(`${AUTH_SERVICE_URL}/refresh/${refreshToken}`)
    .then(({ data }) => [data.authorization_token, data.refresh_token]);
}

export default (async function refreshTokens(
  token,
  refreshToken,
  models,
  secret,
) {
  let userId = null;

  try {
    const { id } = jwt.decode(token);
    userId = id;
  } catch (err) {
    return {};
  }

  if (!userId) {
    return {};
  }

  const user = await models.User.findById(userId);

  if (!user) {
    return {};
  }

  const [newToken, newRefreshToken] = await refresh(refreshToken);

  return {
    user,
    token: newToken,
    refreshToken: newRefreshToken,
  };
});


// monorepo javascript universal server-side-rendering serverless react react-native graphql apollo-client redux redux-observable glamorous webpack2
