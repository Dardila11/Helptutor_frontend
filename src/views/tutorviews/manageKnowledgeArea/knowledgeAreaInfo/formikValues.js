import * as Yup from 'yup'

let initialValues = {
  tags: '',
  description: '',
  knowledge_area: -1,
  speciality: -1
}

const getValues = (values) => {
  return {
    tags: values.tags,
    description: values.description,
    knowledge_area: values.speciality
  }
}

const validation = Yup.object().shape({
  knowledge_area: Yup.number().positive('Área de conocimiento requerida'),
  speciality: Yup.number().positive('Especialidad requerida'),
  description: Yup.string().max(255).required('La descripción es requerida'),
  tags: Yup.string().max(255).required('Las etiquetas son requeridas')
})

const logConst = {
  initialValues,
  getValues,
  validation
}

export default logConst
