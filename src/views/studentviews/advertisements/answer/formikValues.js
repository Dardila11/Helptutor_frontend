import * as Yup from 'yup'

const getValues = (values) => {
  return {
    description: values.description,
    advertisement: values.advertisement,
    student: values.student
  }
}

const validation = Yup.object().shape({
  description: Yup.string().max(255)
})

const logConst = {
  getValues,
  validation
}

export default logConst
