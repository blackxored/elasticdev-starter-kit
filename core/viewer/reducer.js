// @flow
import type { Action, ViewerState } from '../types';
import { path } from 'ramda';

export const initialState = null;

const reducer = (state: ?ViewerState = initialState, action: Action) => {
  const user = path(['result', 'data', 'viewer', 'user'], action);

  switch (action.type) {
    case 'APOLLO_QUERY_RESULT': {
      return user || state;
    }
    case 'LOGOUT': {
      return null;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
