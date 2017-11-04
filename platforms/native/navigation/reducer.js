// @flow
import type { Action, Deps, State } from '@esk/core/types';
import { Observable } from 'rxjs';
import { NavigationActions } from 'react-navigation';
import AppNavigator from './AppNavigator';

type ResetNavigationAction = {
  routeName: string,
  index?: number,
};

const reducer = (state: State, action: Action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};

export const resetNavigation = (routeName: string, index?: number = 0) =>
  NavigationActions.reset({
    index,
    actions: [NavigationActions.navigate({ routeName })],
  });

export const navigate = (routeName: string, params: Object = {}) =>
  NavigationActions.navigate({
    routeName,
    params,
    action: NavigationActions.navigate({ routeName, params }),
  });

const resetNavigationEpic = (
  action$: Observable<ResetNavigationAction>,
  deps: Deps,
) => {
  return action$
    .ofType('esk/navigation/RESET')
    .mergeMap(action =>
      Observable.of(
        resetNavigation(action.payload.routeName, action.payload.index),
      ),
    );
};

export const epics = [resetNavigationEpic];

export default reducer;
