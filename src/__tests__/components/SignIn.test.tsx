import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignInContainer from '../../components/SignInContainer';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn()
      const { getByPlaceholderText, getByText } = render(<SignInContainer onSubmit={onSubmit} initialValues={{
        username: '',
        password: ''
      }} />)

      fireEvent.changeText(getByPlaceholderText('Username'), 'kalle')
      fireEvent.changeText(getByPlaceholderText('Password'), 'password')
      fireEvent.press(getByText('Sign in'))

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        });
      });
    });
  });
});