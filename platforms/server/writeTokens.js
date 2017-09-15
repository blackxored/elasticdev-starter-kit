// @flow
import fs from 'fs';
import path from 'path';
import debugLib from 'debug';

const debug = debugLib('esk:graphql-server');

export default function writeTokens(authorizationToken: string, refreshToken: string) {
  const graphqlConfig = path.resolve(__dirname + '../../graphql.config.json');
  // $FlowFixMe$
  const file = JSON.parse(fs.readFileSync(graphqlConfig, 'utf-8'));

  file.endpoints[0].options.headers.authorization = authorizationToken;
  file.endpoints[0].options.headers['x-refresh-token'] = refreshToken;
  fs.writeFileSync(graphqlConfig, JSON.stringify(file, null, 2), 'utf-8');
  debug(`Wrote new tokens to ${graphqlConfig}`);
}
