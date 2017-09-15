// @flow
const NAVIGATION_RESET = 'esk/navigation/RESET';

export const resetNavigation = (routeName: string, index?: number = 0) => {
  return {
    type: NAVIGATION_RESET,
    payload: { routeName, index },
  };
};
