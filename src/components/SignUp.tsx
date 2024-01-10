import React from 'react';
import { useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';
import AuthStorage from '../utils/authStorage';
import SignInContainer from './SignInContainer';
import SignUpContainer from './SignUpContainer';

type SignUpFormValues = {
  username: string,
  password: string,
  passwordConfirmation: string
}

const SignUp = () => {
  const [signIn] = useSignIn()

  const initialValues: SignUpFormValues = {
    username: '',
    password: '',
    passwordConfirmation: ''
  }

  let navigate = useNavigate();

  const onSubmit = async (values: SignUpFormValues) => {
    const { username, password, passwordConfirmation } = values;

  //   try {
  //     const { data } = await signIn({ username: username, password: password });
  //     const storage = new AuthStorage()
  //     if (data) {
  //       await storage.setAccessToken(data.authenticate.accessToken)
  //       navigate("../", { replace: true });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  };
  return (
    <SignUpContainer onSubmit={onSubmit} initialValues={initialValues} />
  );
};

export default SignUp;