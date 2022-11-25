import React from 'react';
import { useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';
import AuthStorage from '../utils/authStorage';
import SignInContainer from './SignInContainer';

type SignInFormValues = {
  username: string,
  password: string
}


const SignIn = () => {
  const [signIn] = useSignIn()

  const initialValues: SignInFormValues = {
    username: '',
    password: ''
  }

  let navigate = useNavigate();

  const onSubmit = async (values: SignInFormValues) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username: username, password: password });
      const storage = new AuthStorage()
      if (data) {
        await storage.setAccessToken(data.authenticate.accessToken)
        navigate("../", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SignInContainer onSubmit={onSubmit} initialValues={initialValues} />
  );
};

export default SignIn;