// @flow
import type { DeviceInfoResponseAction, DeviceState } from '../types';
import { merge } from 'ramda';

type Action = DeviceInfoResponseAction;

const DEVICE_INFO_RESPONSE = 'esk/device/INFO_RESPONSE';

const initialState: DeviceState = {
  host: '',
};

const reducer = (
  state: DeviceState = initialState,
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

export const deviceInfoResponse = (
  payload: mixed,
): DeviceInfoResponseAction => ({
  type: DEVICE_INFO_RESPONSE,
  payload,
});

export default reducer;
