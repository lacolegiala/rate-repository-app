import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";
import { CreatedUser } from "../types";

const useSignUp = () => {
  const [mutate] = useMutation<{ createUser: { id: string, username: string, password: string }}>(CREATE_USER)

  const createUser = async ({ username, password }: CreatedUser) => {
    const { data } = await mutate({
      variables: {user: {username: username, password: password}}
    })
    return {data}
  }
  return [createUser]
};

export default useSignUp;