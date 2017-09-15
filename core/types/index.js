// @flow

/*
 ******************************************************************************
 * Models                                                                     *
 ******************************************************************************
 */
import { ApolloClient } from 'apollo-client';

// TODO: remove once we setup modelTypes
export type User = {
  id: string,
  email: string,
};

export type Viewer = User;

/*
 ******************************************************************************
 * Deps                                                                       *
 ******************************************************************************
 */

export type Deps = {
  getState: () => Object,
  now: () => number,
  apollo: typeof ApolloClient,
};

/*
 ******************************************************************************
 * State                                                                      *
 ******************************************************************************
 */

export type AppState = {
  +error: ?Error,
  +online: boolean,
  +started: boolean,
};

export type ConfigState = {
  +appName: string,
  +appVersion: string,
  +apiUrl: string,
  +sentryUrl: ?string,
  +authServiceUrl: string,
  +facebookAppId?: string,
};

export type AuthProviderName = 'email' | 'facebook';

export type AuthState = {
  +isAuthenticated: boolean,
  +isFetching: boolean,
  +errorMessage: ?string,
  +authorizationToken: ?string,
  +refreshToken: ?string,
  +authProvider: ?AuthProviderName,
};

export type ViewerState = {
  +viewer: ?Viewer,
};

export type SettingsState = {
  +notifications: boolean,
};

export type UIState = {
  +showNetworkIndicator: boolean,
};

export type GenericDeviceState = {
  +host: string,
};

export type MobileDeviceState = {
  +isReactNative: true,
  +host: ?string,
  +deviceModel: ?string,
  +deviceId: ?string,
  +deviceOS: ?string,
  +appVersion: ?string,
  +systemVersion: ?string,
  +bundleId: ?string,
  +locale: ?string,
};

export type WebDeviceState = {};

export type DeviceState =
  | GenericDeviceState
  | MobileDeviceState
  | WebDeviceState;

export type NavigationState = any;

export type State = {
  +app: AppState,
  +auth: AuthState,
  +config: ConfigState,
  +device: DeviceState,
  +navigation: NavigationState,
  +settings: SettingsState,
  +ui: UIState,
  +viewer: ViewerState,
};

/*
 ******************************************************************************
 * Actions                                                                    *
 ******************************************************************************
 */

export type AppStartedAction = { type: 'esk/app/STARTED' };

export type AppOnlineAction = {
  type: 'esk/app/ONLINE',
  payload: { online: boolean },
};

export type AppErrorAction = { type: 'esk/app/ERROR', payload: Error | Object };

export type LoginRequestAction = {
  type: 'esk/auth/LOGIN_REQUEST',
  payload: {
    provider: AuthProviderName,
    providerData: mixed,
  },
};

export type LoginSuccessAction = {
  type: 'esk/auth/LOGIN_SUCCESS',
  payload: {
    authorizationToken: string,
    refreshToken: string,
  },
  meta: {
    authProvider: AuthProviderName,
  },
};

export type LoginFailureAction = {
  type: 'esk/auth/LOGIN_FAILURE',
  payload: Error,
  error: true,
};

export type AuthTokensChangedAction = {
  type: 'esk/auth/TOKENS_CHANGED',
  payload: {
    authorizationToken: string,
    refreshToken: string,
  }
};

export type LogoutAction = { type: 'esk/auth/LOGOUT' };

export type DeviceInfoResponseAction = {
  type: 'esk/device/INFO_RESPONSE',
  payload: mixed,
};

export type SettingsSetValueAction = {
  type: 'esk/settings/SET_VALUE',
  payload: {
    path: Array<string>,
    value: any,
  },
};

export type ToggleNetworkIndicatorAction = {
  type: 'esk/ui/TOGGLE_NETWORK_ACTIVITY_INDICATOR',
  payload: boolean,
};

export type Action =
  | AppStartedAction
  | AppOnlineAction
  | AppErrorAction
  | AuthTokensChangedAction
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction
  | DeviceInfoResponseAction
  | SettingsSetValueAction
  | ToggleNetworkIndicatorAction;
