// @flow
import React from 'react';
import { View } from 'react-native';

type Props = {
  children: React.Element<*>,
};

export const Screen = ({ children }: Props) => {
  return <View style={{ flex: 1, backgroundColor: '#eee' }}>{children}</View>;
};

export default Screen;
