/* eslint-disable fp/no-unused-expression,better/explicit-return,fp/no-nil */
import config from '../';
import reducer from '../reducer';

describe('config', () => {
  it('imports config from env', () => {
    expect(config.appName).toBeTruthy();
    expect(config.apiUrl).toBeTruthy();
  })
});

describe('config reducer', () => {
  // The env vars get passed as initialState from configureStore
  // so this test doesn't accomplish much.
  it('has an initial state', () => {
    expect(reducer(undefined, { type: '@@INIT'})).toMatchSnapshot()
  });
});
