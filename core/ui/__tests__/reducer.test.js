import reducer, {
  initialState,
  toggleNetworkActivityIndicator,
} from '../reducer';

describe('ui reducer', () => {
  it('has an initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toMatchSnapshot();
  });

  it('handles TOGGLE_NETWORK_ACTIVITY_INDICATOR', () => {
    const showingState = reducer(
      initialState,
      toggleNetworkActivityIndicator(true),
    );
    expect(showingState).toMatchSnapshot();
    expect(
      reducer(showingState, toggleNetworkActivityIndicator(false)),
    ).toMatchSnapshot();
  });
});
