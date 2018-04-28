// @flow
type Props = {
  children: React.Node,
};

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

const Login = ({ children }: Props) => {
  return children(getProps());
};

export default Login;
