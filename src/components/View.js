// @flow
import 'react-primitives';
import glamorous from 'glamorous-primitives';

import {
  width,
  space,
  color,
  fontSize,
  flex,
  flexDirection,
  flexWrap,
  alignItems,
  justifyContent,
  alignSelf,
  borderRadius,
  borderColor,
  borderWidth,
  letterSpacing,
  fontWeight,
  textAlign,
} from 'styled-system';

const View = glamorous.view(
  width,
  space,
  color,
  fontSize,
  flex,
  flexDirection,
  flexWrap,
  alignItems,
  justifyContent,
  alignSelf,
  borderRadius,
  borderColor,
  borderWidth,
  letterSpacing,
  fontWeight,
  textAlign,
);

// eslint-disable-next-line fp/no-mutation
View.displayName = 'View';

export default View;
