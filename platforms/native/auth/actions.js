// @flow
import { prop } from 'ramda';
import {
  authTokensChanged,
  loginFailure,
  loginSuccess,
} from '@esk/core/auth/reducer';
import { resetNavigation } from '../navigation/reducer';

const onOAuthEpic = (action$: any, deps: Deps) => {
  return action$
    .filter(action => {
      return (
        action.type === 'Navigation/NAVIGATE' && action.routeName === 'oauth'
      );
    })
    .switchMap(action => {
      const params = action.params;

      const authorizationToken = prop('authorization_token', params);
      const refreshToken = prop('refresh_token', params);

      return !authorizationToken
        ? [loginFailure(new Error('OAuth error')), resetNavigation('login')]
        : [
            authTokensChanged(authorizationToken, refreshToken),
            loginSuccess({ authorizationToken, refreshToken }),
            resetNavigation('home'),
          ];
    });
};

export const epics = [onOAuthEpic];
