import React from 'react';
import { TextInput as NativeTextInput, StyleSheet, TextStyle, StyleProp } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  textInput: {
    fontSize: 16,
    borderWidth: 0.8,
    borderColor: '#B7BAB7',
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginTop: 12,
    borderRadius: 4,
    padding: 12
  },
  error: {
    borderColor: theme.colors.error
  }
});

type Props = {
  style?: StyleProp<TextStyle>,
  error?: string | false,
  secure: boolean,
  onChangeText: (value: string) => void,
  onBlur: () => void,
  value: string
}

const TextInput = (props: Props) => {
  const textInputStyle = [props.style, styles.textInput];

  return (
    <NativeTextInput 
      autoCapitalize='none'
      style={props.error ? [textInputStyle, styles.error] : textInputStyle} 
      secureTextEntry={props.secure} 
      {...props}
    />
  )
};

export default TextInput;