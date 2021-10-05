import * as Yup from 'yup'

const getValues = (values) => {
  return {
    title: values.title,
    description: values.description,
  }
}

const validation = 
Yup.object().shape({
  title: Yup.string()
    .min(10, 'Titulo debe tener por lo menos 10 caracteres')
    .max(255, 'Titulo debe tener un maximo de 255 caracteres')
    .required('Titulo es obligatorio'),
  description: Yup.string()
    .min(10, 'Descripción debe tener por lo menos 10 caracteres')
    .max(255, 'Descripción debe tener un maximo de 255 caracteres')
    .required('Descripción es obligatorio')
})

const logConst = {
  getValues,
  validation
}

export default logConst
