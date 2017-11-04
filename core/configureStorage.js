// @flow
import { pick } from 'ramda';
import { createTransform } from 'redux-persist';

const defaultPaths = [
  ['auth'],
  ['apollo', ['data']],
  ['device'],
  ['settings'],
  ['viewer'],
];

const makeTransformsAndWhiteLists = (
  userDefinedPaths: Array<Array<string>>,
) => {
  const paths = [...defaultPaths, ...userDefinedPaths];
  const whitelist = [];
  const transforms = [];

  paths.forEach(([feature, props]) => {
    whitelist.push(feature);

    if (!props) {
      return;
    }

    const inOut = state => pick(props, state);
    transforms.push(createTransform(inOut, inOut, { whitelist: [feature] }));
  });

  return { whitelist, transforms };
};

const configureStorage = (
  appName: string,
  paths: Array<Array<string>> = [],
) => ({
  debounce: 100,
  keyPrefix: `${appName}:`,
  ...makeTransformsAndWhiteLists(paths),
});

export default configureStorage;
