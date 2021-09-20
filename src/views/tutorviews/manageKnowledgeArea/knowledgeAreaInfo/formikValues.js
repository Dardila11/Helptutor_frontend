import * as Yup from 'yup'

let initialValues = {
    tags:"",
    description: "",
    knowledge_area: -1,
    user: 0,
    speciality: -1
}

const putValues = (values) => {
    initialValues.tags = values.tags
    initialValues.description = values.description
    initialValues.knowledge_area = values.knowledge_area.id
    initialValues.user = values.user
}

const getValues = (values) => {
  return {
    tags: values.tags,
    description: values.description,
    knowledge_area: values.speciality,
    user: values.user
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
  validation,
  putValues
}

export default logConst
