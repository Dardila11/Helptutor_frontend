import * as Yup from 'yup'

const getValues = (values) => {
  return {
    title: values.title,
    description: values.description,
    knowledge_area_student: values.knowledge_area_student
  }
}

const validation = Yup.object().shape({
  knowledge_area_student: Yup.string().required(
    'Campo categoria es obligatorio'
  ),
  title: Yup.string()
    .min(20, 'Titulo debe tener por lo menos 20 caracteres')
    .max(255, 'Titulo debe tener un maximo de 255 caracteres')
    .required('Titulo es obligatorio'),
  description: Yup.string()
    .min(20, 'Descripción debe tener por lo menos 20 caracteres')
    .max(255, 'Descripción debe tener un maximo de 255 caracteres')
    .required('Descripción es obligatorio')
})

const logConst = {
  getValues,
  validation
}

export default logConst
