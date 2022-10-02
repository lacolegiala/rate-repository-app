import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import { AuthenticateInput } from "../types";
import createApolloClient from "../utils/apolloClient";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate] = useMutation<{ authenticate: { accessToken: string } }>(AUTHENTICATE);

  const signIn = async ({ username, password }: AuthenticateInput) => {
    const { data } = await mutate({variables: {credentials: {username: username, password: password}}})
    console.log('data', data)
    await authStorage.setAccessToken(data.authenticate.accessToken)
    const apolloClient = createApolloClient(authStorage);
    apolloClient.resetStore()
    return {data}
  };

  return [signIn];
};

export default useSignIn;