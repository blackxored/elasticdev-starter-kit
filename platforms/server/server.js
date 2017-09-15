// @flow
/* eslint-disable fp/no-unused-expression */
import { omit } from 'ramda';
import express from 'express';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import schema from './data/schema';
import makeModels from './data/models';
import connectors from './data/connectors';
import refreshTokens from './auth/refreshTokens';

const app = express();
const SECRET = 'token-secret-123'; // TODO: get from serverless env
const models = makeModels(connectors);

const withUser = async (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET);
      req.user = user;
    } catch (error) {
      const refreshToken = req.headers['x-refresh-token'];
      const newTokens = await refreshTokens(
        token,
        refreshToken,
        models,
        SECRET,
      );

      if (newTokens.token && newTokens.refreshToken) {
        if (__DEV__) {
          const writeTokens = require('./writeTokens').default;

          writeTokens(newTokens.token, newTokens.refreshToken);
        }
        res.set(
          'Access-Control-Expose-Headers',
          'authorization, x-refresh-token',
        );
        res.set('authorization', newTokens.token);
        res.set('x-refresh-token', newTokens.refreshToken);
      }

      req.user = omit(['_raw'], newTokens.user);
    }
  }

  next();
};

app.use(cors('*'));
app.use(withUser);

app.options('/graphql', cors());
app.use(
  '/graphql',
  bodyParser.json(),
  cors(),
  graphqlExpress(req => ({
    schema,
    context: {
      connectors,
      models,
      user: req.user,
    },
  })),
);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  }),
);

export default app;
