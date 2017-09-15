import reducer, { initialState } from '../reducer';

describe('device reducer', () => {
  it('has an initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toMatchSnapshot();
  });

  it('handles DEVICE_INFO_RESPONSE', () => {
    const action = {
      type: 'DEVICE_INFO_RESPONSE',
      payload: {
        host: 'esk.io',
      },
    };
    expect(reducer(initialState, action)).toMatchSnapshot();
  });
});
