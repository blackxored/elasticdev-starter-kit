/* eslint-disable fp/no-unused-expression,fp/no-nil,better/no-new,better/explicit-return */
import reducer, { initialState } from '../reducer';
import { appError, appOnline } from '../reducer';

describe('app', () => {
  describe('action creators', () => {
    it('creates APP_ONLINE action', () => {
      expect(appOnline(true)).toMatchSnapshot();
    });

    it('creates APP_ERROR action', () => {
      expect(appError(new Error('foo'))).toMatchSnapshot();
    });
  });

  describe('reducer', () => {
    it('has an initial state', () => {
      expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
    });

    it('maps all actions ending with FAILURE to APP_ERROR', () => {
      expect(
        reducer(initialState, appError(new Error('foo'))),
      ).toMatchSnapshot();
    });

    it('handles APP_ERROR', () => {
      expect(
        reducer(initialState, appError(new Error('bar'))),
      ).toMatchSnapshot();
    });

    it('handles APP_ONLINE', () => {
      expect(reducer(initialState, appOnline(true))).toMatchSnapshot();
    });

    it('handles APP_STARTED (dispatched after rehydrate)', () => {
      expect(reducer(initialState, { type: 'APP_STARTED' })).toMatchSnapshot();
    });
  });
});
