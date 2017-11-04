//@flow
import type {
  Action,
  AppState,
  AppStartedAction,
  AppOnlineAction,
  AppErrorAction,
  Deps,
} from '../types';
import { assoc, merge } from 'ramda';

const APP_ERROR = 'esk/app/ERROR';
const APP_ONLINE = 'esk/app/ONLINE';
const APP_STARTED = 'esk/app/STARTED';

export const initialState: AppState = {
  error: null,
  online: false,
  started: false,
};

const reducer = (state: AppState = initialState, action: Action): AppState => {
  // Map all app errors into state.app.error.
  // In React Native, we show errors in one nicely animated unobtrusive alert.
  // In the browser, we prefer local error messages rendering.
  // action.error is FSA's.
  if (action.error === true && action.payload) {
    state = assoc('error', action.payload, state);
  }

  switch (action.type) {
    case APP_ERROR: {
      return assoc('error', action.payload, state);
    }
    case APP_ONLINE: {
      return merge(state, { error: null, online: action.payload.online });
    }
    case APP_STARTED: {
      return assoc('started', true, state);
    }
    default:
      return state;
  }
};

export const appStarted = (): AppStartedAction => ({
  type: APP_STARTED,
});

export const appError = (error: Error): AppErrorAction => ({
  type: APP_ERROR,
  payload: error,
  error: true,
});

export const appOnline = (online: boolean): AppOnlineAction => ({
  type: APP_ONLINE,
  payload: { online },
});

const appStartedEpic = (action$: any, deps: Deps) => {
  // TODO
};

export const epics = [
  /* TODO: appStartedEpic */
];
export default reducer;
