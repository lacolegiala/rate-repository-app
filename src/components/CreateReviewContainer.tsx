import { Formik } from "formik"
import { View, StyleSheet, Pressable, TextInput } from "react-native"
import FormikTextInput from "./FormikTextInput"
import Text from './Text'
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  repositoryOwner: yup.string().required('Repository owner is a required field'),
  repositoryName: yup.string().required('Repository name is a required field'),
  rating: yup
    .number()
    .required('Rating is a required field')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating must be at most 100'),
  review: yup.string().notRequired()
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

const CreateReviewContainer = ({ onSubmit, initialValues }) => {
  return (
    <Formik 
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.formCard}>
          <FormikTextInput name="repositoryOwner" placeholder="Repository owner" secure={false} />
          <FormikTextInput name="repositoryName" placeholder="Repository name" secure={false} />
          <FormikTextInput name="rating" placeholder="Rating between 0 and 100" secure={false} />
          <FormikTextInput name="review" placeholder="Review" multiline={true} secure={false} />
          <Pressable style={styles.submitButton} onPress={() => handleSubmit()}>
            <Text fontSize='regular' color='appBarText' fontWeight='bold'>Create a review</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  )
}

export default CreateReviewContainer