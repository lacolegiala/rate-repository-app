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
    rating: 0,
    review: ''
  }

  let navigate = useNavigate();

  const onSubmit = async (values: CreateReviewFormValues) => {
    const { repositoryOwner, repositoryName, rating, review } = values;

    const ratingAsNumber = Number(rating)

    console.log('nah', typeof ratingAsNumber)

    try {
      const { data } = await createReview({ 
        repositoryOwner: repositoryOwner, repositoryName: repositoryName, rating: Number(rating), text: review
      })
      if (data) {
        const repositoryId = data.createReview.id
        navigate(`../${repositoryId}`, {replace: true})
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