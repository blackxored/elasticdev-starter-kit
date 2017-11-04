import configureStorage from '../configureStorage';

describe('configureStorage', () => {
  it('setups redux-persist', () => {
    expect(
      configureStorage('testapp', [['additional_store_path_to_serialize']]),
    ).toMatchSnapshot();
  });
});
