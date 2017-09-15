// @flow
/* eslint-disable fp/no-mutation,fp/no-unused-expression,better/no-ifs,fp/no-let,better/explicit-return,fp/no-nil */
import 'source-map-support/register';
import http from 'http';
import app from './server';
import debugLib from 'debug';

const debug = debugLib('esk:graphql-server');

const server = http.createServer(app);

const PORT = 3000;

let currentApp = app;

server.listen(PORT, () => {
  debug('GraphQL server listening on port', PORT);
});

if (module.hot) {
  module.hot.accept(['./server', './data/schema/index.js'], () => {
    server.removeListener('request', currentApp);
    server.on('request', app);
    currentApp = app;
  });
}
