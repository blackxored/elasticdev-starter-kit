// @flow
import type { SettingsSetValueAction, SettingsState } from '../types';
import { assocPath } from 'ramda';

type Action = SettingsSetValueAction;

const SET_VALUE = 'esk/settings/SET_VALUE';

export const initialState: SettingsState = {
  notifications: false,
};

const reducer = (state: SettingsState = initialState, action: Action) => {
  switch (action.type) {
    case SET_VALUE: {
      return assocPath(action.payload.path, action.payload.value, state);
    }
    default: {
      return state;
    }
  }
};

export const setSettingsValue = (path: Array<string>, value: any) => ({
  type: SET_VALUE,
  payload: { path, value },
});

export default reducer;
