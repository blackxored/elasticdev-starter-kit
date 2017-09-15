import reducer, { initialState } from '../reducer';

describe('viewer reducer', () => {
  it('has an initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toMatchSnapshot();
  });

  it('stores the user if APOLLO_QUERY_RESULT contains it', () => {
    expect(
      reducer(initialState, {
        type: 'APOLLO_QUERY_RESULT',
        result: {
          data: {
            viewer: {
              user: {
                id: 'some',
              },
            },
          },
        },
      }),
    ).toMatchSnapshot();
  });

  it('ignores APOLLO_QUERY_RESULT if we did not query for user', () => {
    expect(
      reducer(initialState, {
        type: 'APOLLO_QUERY_RESULT',
        result: {
          data: {
            viewer: {
              somethingElse: true,
            },
          },
        },
      }),
    ).toEqual(initialState);
  });

  it('returns null after logout', () => {
    expect(reducer({ id: 'some' }, { type: 'LOGOUT' })).toEqual(null);
  });
});
