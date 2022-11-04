import React from 'react';
import useSignIn from '../hooks/useSignIn';
import SignInContainer from './SignInContainer';

const SignIn = () => {

  return (
    <SignInContainer signIn={useSignIn()} />
  );
};

export default SignIn;