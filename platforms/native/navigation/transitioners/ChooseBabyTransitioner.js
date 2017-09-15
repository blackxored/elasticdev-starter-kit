// @flow
import React from 'react';
import CardStackTransitioner from 'react-navigation/src/views/CardStackTransitioner';
import type {
  NavigationSceneRendererProps,
  NavigationProp,
  NavigationRouter,
} from 'react-navigation/src/TypeDefinition';

type Props = {
  navigation: NavigationProp<*, *>,
  router: NavigationRouter<*, *, *>,
};
const ChooseBabyTransitioner = (props: Props) => {
  const transitionConfig = () => ({
    screenInterpolator: (sceneProps: NavigationSceneRendererProps) => {
      const { position, scene } = sceneProps;
      const { index } = scene;

      const inputRange = [index - 1, index, index + 1];

      const opacity = position.interpolate({
        inputRange,
        outputRange: [0.5, 0.9, 1],
      });

      return {
        opacity,
      };
    },
  });

  return (
    <CardStackTransitioner
      {...props}
      mode="card"
      headerMode="none"
      transitionConfig={transitionConfig}
    />
  );
};

export default ChooseBabyTransitioner;
