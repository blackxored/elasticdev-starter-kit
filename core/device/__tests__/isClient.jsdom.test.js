/* eslint-disable fp/no-unused-expression,better/explicit-return,fp/no-nil */
import isClient from '../isClient';

describe('isClient', () => {
  it.skip('returns true if we are rendering on the browser or RN', () => {
    expect(isClient).toBe(true);
  });
});
