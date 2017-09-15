// @flow
import type { Action, Deps } from './types';
import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { epics as appEpics } from './app/reducer';
import { epics as authEpics } from './auth/reducer';

type Epic = (action$: any, deps: Deps) => Observable<Action>;

const commonEpics = [...appEpics, ...authEpics];

const configureEpics = (deps: Object, platformEpics: Array<Epic>) => (
  action$: any,
  { getState }: any,
) => {
  const epics = [...commonEpics, ...platformEpics];

  return combineEpics(...epics)(action$, { ...deps, getState });
};

export default configureEpics;
