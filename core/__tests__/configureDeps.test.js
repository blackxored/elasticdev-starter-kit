import configureDeps from '../configureDeps';
import ApolloClient from 'apollo-client';

describe('configureDeps', () => {
  const now = 1482363367071;
  Date.now = jest.fn(() => now);

  const deps = configureDeps({}, {
    somePlatformDependency: true,
  });

  it('adds platform-specific dependencies', () => {
    expect(deps).toHaveProperty('somePlatformDependency');
  });

  it('adds apollo', () => {
    expect(deps).toHaveProperty('apollo');
    expect(deps.apollo).toBeInstanceOf(ApolloClient);
  });

  it('adds now timestamp', () => {
    expect(deps).toHaveProperty('now');
    expect(deps.now()).toEqual(now);
  });

  it.skip('adds UUID generator', () => {
    expect(deps).toHaveProperty('uuid');
  });
});
