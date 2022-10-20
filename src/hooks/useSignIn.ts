import { useApolloClient, useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import { AuthenticateInput } from "../types";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate] = useMutation<{ authenticate: { accessToken: string } }>(AUTHENTICATE);
  const apolloClient = useApolloClient()

  const signIn = async ({ username, password }: AuthenticateInput) => {
    const { data } = await mutate({variables: {credentials: {username: username, password: password}}})
    await authStorage.setAccessToken(data.authenticate.accessToken)
    apolloClient.resetStore()
    return {data}
  };

  return [signIn];
};

export default useSignIn;