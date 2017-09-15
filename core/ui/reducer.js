// @flow
import type { ToggleNetworkIndicatorAction, UIState } from '../types';
import { assoc } from 'ramda';

type Action = ToggleNetworkIndicatorAction;

const TOGGLE_NETWORK_ACTIVITY_INDICATOR = 'esk/ui/TOGGLE_NETWORK_ACTIVITY_INDICATOR';

export const initialState = {
  showNetworkIndicator: false,
};

export const toggleNetworkActivityIndicator = (shouldShow: boolean): ToggleNetworkIndicatorAction => ({
  type: TOGGLE_NETWORK_ACTIVITY_INDICATOR,
  payload: shouldShow,
});

const reducer = (state: UIState = initialState, action: Action): UIState => {
  switch (action.type) {
    case TOGGLE_NETWORK_ACTIVITY_INDICATOR: {
      return assoc('showNetworkIndicator', action.payload, state);
    }
    default: {
      return state;
    }
  }
};

export default reducer;
