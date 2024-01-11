import React from 'react';
import { useNavigate } from 'react-router-native';
import SignUpContainer from './SignUpContainer';
import useSignUp from '../hooks/useSignUp';
import AuthStorage from '../utils/authStorage';
import useSignIn from '../hooks/useSignIn';

type SignUpFormValues = {
  username: string,
  password: string,
  passwordConfirmation: string
}

const SignUp = () => {
  const [signUp] = useSignUp()
  const [signIn] = useSignIn()

  const initialValues: SignUpFormValues = {
    username: '',
    password: '',
    passwordConfirmation: ''
  }

  let navigate = useNavigate();

  const onSubmit = async (values: SignUpFormValues) => {
    const { username, password } = values;

    try {
      const { data } = await signUp({ username: username, password: password });
      const storage = new AuthStorage()
      if (data) {
        const { data } = await signIn({ username: username, password: password })
        await storage.setAccessToken(data.authenticate.accessToken)
        navigate("../", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SignUpContainer onSubmit={onSubmit} initialValues={initialValues} />
  );
};

export default SignUp;