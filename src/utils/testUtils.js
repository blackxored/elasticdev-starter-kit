// @flow
// eslint-disable-next-line import/no-extraneous-dependencies
import testRenderer from 'react-test-renderer';

export const createTestRenderer = () => (Component: any) => {
  const component = testRenderer.create(Component);

  return component.toJSON();
};

export const createExpectRender = () => {
  const render = createTestRenderer();
  return (Component: any) => {
    expect(render(Component)).toMatchSnapshot();
  };
};

export const expectRender = createExpectRender();
