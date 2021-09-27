import * as Yup from 'yup'

const getValues = (values) => {
  return {
    description: values.description,
    advertisement: values.advertisement,
  }
}

const validation = Yup.object().shape({
  description: Yup.string().max(255).min(1)
})

const logConst = {
  getValues,
  validation
}

export default logConst
