/* eslint-disable fp/no-unused-expression,better/explicit-return,fp/no-nil */
/*
 * @jest-environment node
 */
import isReactNative from '../isReactNative';

describe('isReactNative', () => {
  it.skip('detects RN based on Promise prototype', () => {
    expect(typeof Promise.prototype.finally).toBe('undefined');
    expect(isReactNative).toBe(false);
  });
});
