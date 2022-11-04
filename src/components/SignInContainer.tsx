import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native'
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik'
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";

import Text from './Text'
import AuthStorage from '../utils/authStorage';
import { AuthenticateInput } from '../types';

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
})

const styles = StyleSheet.create({
  formCard: {
    backgroundColor: 'white'
  },
  submitButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#2A64CC',
    marginVertical: 12,
    marginHorizontal: 10
  },
})

type SignInFormValues = {
  username: string,
  password: string
}

type SignInProps = {
  signIn: (({ username, password }: AuthenticateInput) => Promise<{
    data: {
        authenticate: {
            accessToken: string;
        };
    };
}>)[]
}

const SignInContainer = (props: SignInProps) => {
  const [signIn] = props.signIn
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
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.formCard}>
          <FormikTextInput secure={false} name='username' placeholder='Username' />
          <FormikTextInput secure={true} name='password' placeholder='Password' />
          <Pressable style={styles.submitButton} onPress={() => handleSubmit()}>
            <Text fontSize='regular' color='appBarText' fontWeight='bold'>Sign in</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignInContainer;