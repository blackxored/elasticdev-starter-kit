// @flow
import type { Deps, State } from './types';
import { configureApollo } from './configureData';

const apollo = configureApollo();

const configureDeps = (initialState: State, platformDeps: Deps) => ({
  apollo,
  now: () => Date.now(),
  // TODO: uuid,
  ...platformDeps,
});

export default configureDeps;
