import * as Yup from 'yup'

const getValues = (values) => {
  return {
    title: values.title,
    description: values.description,
    student: values.student
  }
}

const validation = Yup.object().shape({
  title: Yup.string().max(255),
  description: Yup.string().max(255)
})

const logConst = {
  getValues,
  validation
}

export default logConst
