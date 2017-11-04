/* eslint-disable fp/no-unused-expression */
import { injectMiddleware } from '../configureMiddleware';

describe('injectMiddleware', () => {
  it.skip('injects dependencies into a redux-thunk like middleware', () => {
    const dependency = jest.fn();

    const plainAction = {
      type: 'PLAIN_ACTION',
      payload: true,
    };

    const middleware = injectMiddleware({ dependency }); /*?*/
  });
});
