import * as Yup from 'yup'

const getValues = (values) => {
  return {
    description: values.description,
    advertisement: values.advertisement
  }
}

const validation = Yup.object().shape({
  description: Yup.string()
    .max(255)
    .min(5)
    .test(
      'empty characters',
      'No puede estar vacio',
      (description) => !description || description.trim() !== ""
    ).required('Campo comentario es obligatorio')
}) 

const logConst = {
  getValues,
  validation
}

export default logConst
