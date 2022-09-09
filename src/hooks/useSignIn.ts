import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import { AuthenticateInput } from "../types";

const useSignIn = () => {
  const [mutate] = useMutation<{ authenticate: { accessToken: string } }>(AUTHENTICATE);

  const signIn = async ({ username, password }: AuthenticateInput) => {
    const signInMutation = await mutate({variables: {credentials: {username: username, password: password}}})
    return signInMutation
  };

  return [signIn];
};

export default useSignIn;