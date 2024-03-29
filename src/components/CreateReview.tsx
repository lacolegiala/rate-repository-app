import { useNavigate } from "react-router-native"
import useCreateReview from "../hooks/useCreateReview"
import CreateReviewContainer from "./CreateReviewContainer"


type CreateReviewFormValues = {
  repositoryOwner: string,
  repositoryName: string,
  rating: number,
  review: string
}

const CreateReview = () => {
  const [createReview] = useCreateReview()

  const initialValues: CreateReviewFormValues = {
    repositoryOwner: '',
    repositoryName: '',
    rating: undefined,
    review: ''
  }

  let navigate = useNavigate();

  const onSubmit = async (values: CreateReviewFormValues) => {
    const { repositoryOwner, repositoryName, rating, review } = values;

    try {
      const { data } = await createReview({ 
        repositoryOwner: repositoryOwner, repositoryName: repositoryName, rating: Number(rating), text: review
      })
      if (data) {
        navigate(`../${data.createReview.repositoryId}`, {replace: true})
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <CreateReviewContainer onSubmit={onSubmit} initialValues={initialValues} />
  )
}

export default CreateReview