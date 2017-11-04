// @flow
import type {
  Action,
  Deps,
  DeviceState,
  MobileDeviceState,
} from '@esk/core/types';
import { merge } from 'ramda';
import { Observable } from 'rxjs';
import DeviceInfo from 'react-native-device-info';
import { deviceInfoResponse } from '@esk/core/device/reducer';

const DEVICE_INFO_RESPONSE = 'esk/device/INFO_RESPONSE';

const initialState: MobileDeviceState = {
  host: null,
  isReactNative: true,
  deviceModel: null,
  deviceId: null,
  deviceOS: null,
  appVersion: null,
  systemVersion: null,
  bundleId: null,
  locale: null,
};

const reducer = (
  state: MobileDeviceState = initialState,
  action: Action,
): DeviceState => {
  switch (action.type) {
    case DEVICE_INFO_RESPONSE: {
      return merge(state, action.payload);
    }
    default: {
      return state;
    }
  }
};

const DAY = 86400000;

const deviceInfoEpic = (action$: any, deps: Deps) =>
  action$.ofType('esk/app/STARTED').switchMap(() => {
    const lastTimestamp = deps.getState().device.timestamp;

    if (!lastTimestamp || deps.now() - lastTimestamp > DAY) {
      return Observable.of(
        deviceInfoResponse({
          timestamp: deps.now(),
          host: DeviceInfo.getUniqueId(),
          deviceModel: DeviceInfo.getModel(),
          deviceId: DeviceInfo.getDeviceId(),
          deviceOS: DeviceInfo.getSystemName(),
          appVersion: DeviceInfo.getReadableVersion(),
          systemVersion: DeviceInfo.getSystemVersion(),
          bundleId: DeviceInfo.getBundleId(),
          locale: DeviceInfo.getDeviceLocale(),
        }),
      );
    }

    return Observable.of();
  });

export const epics = [deviceInfoEpic];

export default reducer;
