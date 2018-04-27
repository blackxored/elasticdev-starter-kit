// @flow
const getProps = () => {
  const usernameField = {};
  const passwordField = {};
  const rememberMeField = {};
  const submitProps = {};

  return {
    usernameField,
    passwordField,
    rememberMeField,
    submitProps,
  };
};

const Login = ({ children }) => {
  return children(getProps());
};

export default Login;
