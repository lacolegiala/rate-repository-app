import { useMutation } from "@apollo/client"
import { CREATE_REVIEW } from "../graphql/mutations"
import { CreatedReview } from "../types"

const useCreateReview = () => {
  const [mutate] = useMutation<{ createReview: { id: string, userId: string, repositoryId: string }}>(CREATE_REVIEW)

  const createReview = async ({ repositoryOwner, repositoryName, rating, text }: CreatedReview) => {
    console.log('rating', rating)
    const { data } = await mutate({
      variables: {review: {repositoryName: repositoryName, ownerName: repositoryOwner, rating: rating, text: text}}
    })
    return {data}
  }

  return [createReview]
}

export default useCreateReview