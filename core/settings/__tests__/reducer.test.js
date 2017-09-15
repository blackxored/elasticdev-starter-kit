import reducer, { initialState, setSettingsValue } from '../reducer';

describe('settings reducer', () => {
  it('has an initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toMatchSnapshot();
  });

  it('handles SETTINGS_SET_VALUE', () => {
    expect(
      reducer(initialState, setSettingsValue(['notifications'], true)),
    ).toMatchSnapshot();
  });
});
