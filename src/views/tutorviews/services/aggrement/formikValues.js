import * as Yup from 'yup'

let initialValues = {
  is_accepted_tutor: 0,
  price: 0.0,
  description: ''
}

const getValues = (values) => {
  return {
    is_accepted_tutor: values.is_accepted_tutor
  }
}

const validation = Yup.object().shape({})

const logConst = {
  initialValues,
  getValues,
  validation
}

export default logConst
